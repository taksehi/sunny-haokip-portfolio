import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { isNeonConfigured, testNeonConnection, fetchNeonPortfolioData, saveContactInquiry } from './db.js';
import { seedDatabase } from './seed.js';
import { portfolioData } from '../src/data/portfolioData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env');

export function createApiMiddleware() {
  const { devProjects, filmProjects, personal, devSkills, filmGear, showreel } = portfolioData;

  return async (req, res, next) => {
    const url = req.url?.split('?')[0];

    // Helper for JSON response
    const sendJson = (statusCode, data) => {
      res.statusCode = statusCode;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    };

    // Helper to read body
    const readBody = () => new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          resolve(JSON.parse(body || '{}'));
        } catch (e) {
          reject(e);
        }
      });
      req.on('error', reject);
    });

    // 1. GET /api/status
    if (url === '/api/status' && req.method === 'GET') {
      const configured = isNeonConfigured();
      if (!configured) {
        return sendJson(200, {
          connected: false,
          database: 'Neon Serverless Postgres',
          status: 'Running in Safe Offline / Local Mode (DATABASE_URL not configured in .env)'
        });
      }

      const ping = await testNeonConnection();
      return sendJson(200, {
        connected: ping.ok,
        database: 'Neon Serverless Postgres',
        latencyMs: ping.latencyMs,
        dbName: ping.database,
        status: ping.ok ? `Online (${ping.latencyMs}ms latency)` : `Connection Error: ${ping.error}`
      });
    }

    // 2. POST /api/connect (Accepts connection string, writes to .env, tests, initializes schema & seeds)
    if (url === '/api/connect' && req.method === 'POST') {
      try {
        const body = await readBody();
        const { connectionString } = body;

        if (!connectionString || !connectionString.startsWith('postgres')) {
          return sendJson(400, {
            ok: false,
            error: 'Invalid connection string. Must start with postgresql:// or postgres://'
          });
        }

        // Test connection first
        const testRes = await testNeonConnection(connectionString);
        if (!testRes.ok) {
          return sendJson(400, {
            ok: false,
            error: `Failed to connect to Neon: ${testRes.error}`
          });
        }

        // Update runtime env
        process.env.DATABASE_URL = connectionString.trim();

        // Write to .env file
        const envContent = `# Neon Serverless Postgres Database Connection String\nDATABASE_URL=${connectionString.trim()}\n`;
        fs.writeFileSync(envPath, envContent, 'utf-8');

        // Run schema initialization and seed
        const seedRes = await seedDatabase();

        return sendJson(200, {
          ok: true,
          message: 'Successfully connected to Neon! Schema created and all portfolio data seeded.',
          database: testRes.database,
          latencyMs: testRes.latencyMs,
          seedStatus: seedRes
        });
      } catch (err) {
        return sendJson(500, { ok: false, error: err.message });
      }
    }

    // 3. POST /api/seed (Manually re-run database seed)
    if (url === '/api/seed' && req.method === 'POST') {
      try {
        const result = await seedDatabase();
        return sendJson(result.ok ? 200 : 500, result);
      } catch (err) {
        return sendJson(500, { ok: false, error: err.message });
      }
    }

    // 4. GET /api/portfolio
    if (url === '/api/portfolio' && req.method === 'GET') {
      if (isNeonConfigured()) {
        try {
          const dbData = await fetchNeonPortfolioData();
          if (dbData && dbData.devProjects && dbData.devProjects.length > 0) {
            return sendJson(200, {
              source: 'neon',
              devProjects: dbData.devProjects,
              filmProjects: dbData.filmProjects,
              personal,
              devSkills,
              filmGear,
              showreel
            });
          }
        } catch (err) {
          console.warn('Neon query error, falling back to static data:', err.message);
        }
      }

      // Fallback to static structured data
      return sendJson(200, {
        source: 'static',
        devProjects,
        filmProjects,
        personal,
        devSkills,
        filmGear,
        showreel
      });
    }

    // 5. POST /api/contact
    if (url === '/api/contact' && req.method === 'POST') {
      try {
        const data = await readBody();
        if (!data.name || !data.email || !data.brief) {
          return sendJson(400, { error: 'Name, email, and brief are required.' });
        }

        if (isNeonConfigured()) {
          const saveResult = await saveContactInquiry(data);
          return sendJson(200, {
            success: true,
            persistedToNeon: true,
            message: 'Inquiry saved successfully to Neon database.',
            inquiryId: saveResult.data?.id
          });
        }

        // Safe Fallback response if Neon not configured yet
        return sendJson(200, {
          success: true,
          persistedToNeon: false,
          message: 'Inquiry received in safe offline mode (configure DATABASE_URL in .env to persist to Neon).'
        });
      } catch (err) {
        return sendJson(500, { error: err.message });
      }
    }

    next();
  };
}
