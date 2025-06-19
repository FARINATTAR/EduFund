import db from '../db/db.js';
import { Parser } from 'json2csv'; 


export const registerSponsor = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const [existing] = await db.execute(
      'SELECT * FROM sponsors WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      return res.status(200).json({
        message: 'Sponsor already exists',
        sponsor_id: existing[0].sponsor_id,
      });
    }

    const [result] = await db.execute(
      'INSERT INTO sponsors (name, email) VALUES (?, ?)',
      [name, email]
    );

    res.status(201).json({
      message: 'Sponsor registered successfully',
      sponsor_id: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const getSponsorDonations = async (req, res) => {
  const sponsorId = req.params.id;

  try {
    const [sponsorData] = await db.execute(
      'SELECT * FROM sponsors WHERE sponsor_id = ?',
      [sponsorId]
    );

    if (sponsorData.length === 0) {
      return res.status(404).json({ error: 'Sponsor not found' });
    }

    const [donations] = await db.execute(
      `SELECT d.amount, d.donation_date, c.name AS child_name
       FROM donations d
       JOIN children c ON d.child_id = c.child_id
       WHERE d.sponsor_id = ?
       ORDER BY d.donation_date DESC`,
      [sponsorId]
    );

    res.status(200).json({
      sponsor: sponsorData[0],
      donations: donations
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch donation history' });
  }
};

export const findSponsorByEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const [result] = await db.execute(
      'SELECT * FROM sponsors WHERE email = ?',
      [email]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: 'No sponsor found with this email' });
    }

    res.status(200).json({ sponsor: result[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


export const downloadSponsorCSV = async (req, res) => {
  const sponsorId = req.params.id;

  try {
    const [donations] = await db.execute(
      `SELECT d.donation_date, c.name AS child_name, d.amount
       FROM donations d
       JOIN children c ON d.child_id = c.child_id
       WHERE d.sponsor_id = ?
       ORDER BY d.donation_date DESC`,
      [sponsorId]
    );

    if (donations.length === 0) {
      return res.status(404).json({ error: 'No donations found' });
    }

    const formatted = donations.map(d => ({
      donation_date: new Date(d.donation_date).toLocaleDateString(),
      child_name: d.child_name,
      amount: d.amount
    }));

    const csv = new Parser({ fields: ['donation_date', 'child_name', 'amount'] }).parse(formatted);

    res.header('Content-Type', 'text/csv');
    res.attachment(`sponsor_${sponsorId}_donations.csv`);
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'CSV export failed' });
  }
};

export const getSponsorById = async (req, res) => {
  const sponsorId = req.params.id;

  try {
    const [rows] = await db.execute(
      'SELECT * FROM sponsors WHERE sponsor_id = ?',
      [sponsorId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Sponsor not found' });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
