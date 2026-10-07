import { testNeonConnection, isNeonConfigured } from '../server/db.js';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (!isNeonConfigured()) {
    return res.status(200).json({
      connected: false,
      database: 'Neon Serverless Postgres',
      status: 'Safe Offline / Local Mode (DATABASE_URL not configured)'
    });
  }

  const ping = await testNeonConnection();
  return res.status(200).json({
    connected: ping.ok,
    database: 'Neon Serverless Postgres',
    latencyMs: ping.latencyMs,
    dbName: ping.database,
    status: ping.ok ? `Online (${ping.latencyMs}ms latency)` : `Connection Error: ${ping.error}`
  });
}
