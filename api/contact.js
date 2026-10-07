import { isNeonConfigured, saveContactInquiry } from '../server/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    if (!data.name || !data.email || !data.brief) {
      return res.status(400).json({ error: 'Name, email, and brief are required.' });
    }

    if (isNeonConfigured()) {
      const saveResult = await saveContactInquiry(data);
      return res.status(200).json({
        success: true,
        persistedToNeon: true,
        message: 'Inquiry saved successfully to Neon database.',
        inquiryId: saveResult.data?.id
      });
    }

    return res.status(200).json({
      success: true,
      persistedToNeon: false,
      message: 'Inquiry received in safe offline mode (configure DATABASE_URL in environment variables to persist to Neon).'
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
