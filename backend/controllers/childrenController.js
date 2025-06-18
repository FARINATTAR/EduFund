import db from '../db/db.js';

export const getAllChildren = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM children');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch children' });
  }
};
