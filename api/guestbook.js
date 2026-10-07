import { fetchSignals, saveSignal, isNeonConfigured } from '../server/db.js';

const FALLBACK_SIGNALS = [
  {
    id: 1,
    author: 'Alex (Staff Eng)',
    message: 'Insane attention to detail on the 8-bit meadow and polaroid tilt!',
    location: 'San Francisco, CA',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 2,
    author: 'Elena R. (Colorist)',
    message: 'The DaVinci S-Log3 to Kodak 500T wiper is butter smooth.',
    location: 'London, UK',
    created_at: new Date(Date.now() - 3600000 * 14).toISOString()
  },
  {
    id: 3,
    author: 'DevRecruiter',
    message: 'Love the government financial tracking metrics. Clear engineering value.',
    location: 'Bangalore, IN',
    created_at: new Date(Date.now() - 3600000 * 28).toISOString()
  }
];

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET') {
    if (isNeonConfigured()) {
      const dbSignals = await fetchSignals(15);
      if (dbSignals && dbSignals.length > 0) {
        return res.status(200).json({ success: true, signals: dbSignals, source: 'neon' });
      }
    }
    return res.status(200).json({ success: true, signals: FALLBACK_SIGNALS, source: 'cached' });
  }

  if (req.method === 'POST') {
    const { author, message } = req.body || {};
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Message cannot be empty' });
    }

    const cleanAuthor = (author && author.trim()) ? author.trim().slice(0, 50) : 'Anonymous Engineer';
    const cleanMessage = message.trim().slice(0, 280);

    let savedData = null;
    let persistedToNeon = false;

    if (isNeonConfigured()) {
      const result = await saveSignal({
        author: cleanAuthor,
        message: cleanMessage,
        location: req.headers['x-vercel-ip-country-region'] || 'Vercel Edge Node'
      });
      if (result.ok) {
        savedData = result.data;
        persistedToNeon = true;
      }
    }

    if (!savedData) {
      savedData = {
        id: Date.now(),
        author: cleanAuthor,
        message: cleanMessage,
        location: 'Edge Node (Local / Offline Mode)',
        created_at: new Date().toISOString()
      };
    }

    return res.status(200).json({
      success: true,
      signal: savedData,
      persistedToNeon
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
