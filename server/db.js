import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config();

export function getConnectionString() {
  return process.env.DATABASE_URL?.trim() || '';
}

export function isNeonConfigured() {
  const conn = getConnectionString();
  return Boolean(
    conn &&
    conn.startsWith('postgres') &&
    !conn.includes('YOUR_PASSWORD') &&
    !conn.includes('ep-your-database')
  );
}

export function getSql() {
  if (!isNeonConfigured()) return null;
  return neon(getConnectionString());
}

// Export sql getter for backward compatibility
export const sql = (strings, ...values) => {
  const client = getSql();
  if (!client) throw new Error('Neon database is not configured. Set DATABASE_URL in .env.');
  return client(strings, ...values);
};

/**
 * Pings the Neon database to check connectivity
 */
export async function testNeonConnection(customUrl = null) {
  try {
    const url = customUrl?.trim() || getConnectionString();
    if (!url || !url.startsWith('postgres')) {
      return { ok: false, error: 'Invalid or missing PostgreSQL connection string.' };
    }
    const client = neon(url);
    const start = Date.now();
    const result = await client`SELECT 1 as connected, current_database() as db_name, version() as version;`;
    const latency = Date.now() - start;
    return {
      ok: true,
      latencyMs: latency,
      database: result[0]?.db_name,
      version: result[0]?.version
    };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

/**
 * Initializes database schema on Neon
 */
export async function initDatabase() {
  if (!isNeonConfigured()) {
    return { ok: false, message: 'DATABASE_URL not configured' };
  }

  try {
    // 1. Projects table
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        discipline VARCHAR(20) NOT NULL, -- 'dev' or 'film'
        title TEXT NOT NULL,
        category TEXT,
        description TEXT,
        long_description TEXT,
        image TEXT,
        preview_video TEXT,
        embed_url TEXT,
        aspect_ratio TEXT,
        duration TEXT,
        role TEXT,
        client_name TEXT,
        year TEXT,
        tags JSONB,
        architecture_notes TEXT,
        github_url TEXT,
        demo_url TEXT,
        awards TEXT,
        gear TEXT,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // 2. Contact Inquiries table
    await sql`
      CREATE TABLE IF NOT EXISTS contact_inquiries (
        id SERIAL PRIMARY KEY,
        discipline VARCHAR(50),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        scope TEXT,
        brief TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // 3. Site profile metadata table
    await sql`
      CREATE TABLE IF NOT EXISTS site_profile (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        title_dev TEXT,
        title_film TEXT,
        tagline_dev TEXT,
        tagline_film TEXT,
        bio_dev TEXT,
        bio_film TEXT,
        location TEXT,
        email TEXT,
        socials JSONB,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    return { ok: true, message: 'Neon schema initialized successfully' };
  } catch (error) {
    console.error('Error initializing Neon database:', error);
    return { ok: false, error: error.message };
  }
}

/**
 * Saves a new contact submission directly into Neon
 */
export async function saveContactInquiry(inquiry) {
  if (!isNeonConfigured()) {
    return { ok: false, message: 'Database not connected (inquiry received in offline mode)' };
  }

  try {
    const client = getSql();
    const result = await client`
      INSERT INTO contact_inquiries (discipline, name, email, scope, brief)
      VALUES (
        ${inquiry.discipline || 'General'},
        ${inquiry.name},
        ${inquiry.email},
        ${inquiry.scope || 'Not specified'},
        ${inquiry.brief}
      )
      RETURNING id, created_at;
    `;
    return { ok: true, data: result[0] };
  } catch (error) {
    console.error('Failed to save inquiry to Neon:', error);
    return { ok: false, error: error.message };
  }
}

/**
 * Fetches all portfolio items from Neon
 */
export async function fetchNeonPortfolioData() {
  if (!isNeonConfigured()) {
    return null;
  }

  try {
    const client = getSql();
    const rows = await client`
      SELECT * FROM projects ORDER BY sort_order ASC, created_at DESC;
    `;

    const devProjects = rows
      .filter(r => r.discipline === 'dev')
      .map(r => ({
        id: r.id,
        title: r.title,
        category: r.category,
        description: r.description,
        longDescription: r.long_description,
        image: r.image,
        tags: r.tags || [],
        architectureNotes: r.architecture_notes,
        githubUrl: r.github_url,
        demoUrl: r.demo_url,
        year: r.year
      }));

    const filmProjects = rows
      .filter(r => r.discipline === 'film')
      .map(r => ({
        id: r.id,
        title: r.title,
        category: r.category,
        description: r.description,
        longDescription: r.long_description,
        posterImage: r.image,
        previewVideo: r.preview_video,
        embedUrl: r.embed_url,
        aspectRatio: r.aspect_ratio,
        duration: r.duration,
        role: r.role,
        client: r.client_name,
        year: r.year,
        awards: r.awards,
        gear: r.gear
      }));

    return { devProjects, filmProjects };
  } catch (error) {
    console.error('Error querying Neon portfolio:', error);
    return null;
  }
}
