import db from '../db/db.js';

export const createDonation = async (req, res) => {
  const { sponsor_id, child_id, amount } = req.body;

  console.log('📥 Incoming donation:', { sponsor_id, child_id, amount });

  if (!sponsor_id || !child_id || !amount) {
    console.log('❌ Missing fields');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const [donationResult] = await db.execute(
      'INSERT INTO donations (sponsor_id, child_id, amount) VALUES (?, ?, ?)',
      [sponsor_id, child_id, amount]
    );

    console.log('✅ Donation inserted:', donationResult);

    const [updateResult] = await db.execute(
      'UPDATE sponsors SET total_donated = total_donated + ? WHERE sponsor_id = ?',
      [amount, sponsor_id]
    );

    console.log('🔁 Sponsor updated:', updateResult);

    res.status(201).json({ message: 'Donation successful' });
  } catch (err) {
    console.error('🔥 Donation error:', err.message);
    res.status(500).json({ error: 'Donation failed' });
  }
};

