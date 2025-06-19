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

export const getChildById = async (req, res) => {
  const childId = req.params.id;

  try {
    const [rows] = await db.execute(
      'SELECT * FROM children WHERE child_id = ?',
      [childId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Child not found' });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error fetching child:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
