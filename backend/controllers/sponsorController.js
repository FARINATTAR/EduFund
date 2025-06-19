import db from '../db/db.js';
import { Parser } from 'json2csv'; 


export const registerSponsor = async (req, res) => {
  console.log("🔵 [registerSponsor] Entry");
  console.log("📥 [registerSponsor] Received registration data:", req.body);

  const {
    name,
    email,
    password,
    phone,
    gender,
    dateOfBirth,
    street,
    area,
    pincode,
    role
  } = req.body;



  if (!name || !email || !password) {
    console.log("🟠 [registerSponsor] Missing required fields");
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    console.log("🔵 [registerSponsor] Checking if sponsor exists...");
    const [existing] = await db.execute(
      'SELECT * FROM sponsors WHERE email = ?',
      [email]
    );
    console.log("🟢 [registerSponsor] Sponsor existence check result:", existing);

    if (existing.length > 0) {
      console.log("🟠 [registerSponsor] Sponsor already exists");
      return res.status(200).json({
        message: 'Sponsor already exists',
        sponsor_id: existing[0].sponsor_id,
      });
    }

    console.log("🔵 [registerSponsor] Inserting new sponsor...");
    const [result] = await db.execute(
      `INSERT INTO sponsors 
      (name, email, password, phone, gender, dateOfBirth, street, area, pincode, role) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        email,
        password,
        phone || null,
        gender || null,
        dateOfBirth || null,
        street || null,
        area || null,
        pincode || null,
        role || 'sponsor'
      ]
    );
    console.log("🟢 [registerSponsor] Sponsor inserted, result:", result);

    res.status(201).json({
      message: 'Sponsor registered successfully',
      sponsor_id: result.insertId,
    });
    console.log("🟢 [registerSponsor] Registration response sent");
  } catch (err) {
    console.error("❌ [registerSponsor] Catch Block Error:", err);
    res.status(500).json({ error: 'Registration failed' });
  }
};


export const getSponsorDonations = async (req, res) => {
  console.log("🔵 [getSponsorDonations] Entry");
  const sponsorId = req.params.id;
  console.log("📥 [getSponsorDonations] sponsorId:", sponsorId);

  try {
    console.log("🔵 [getSponsorDonations] Fetching sponsor data...");
    const [sponsorData] = await db.execute(
      'SELECT * FROM sponsors WHERE sponsor_id = ?',
      [sponsorId]
    );
    console.log("🟢 [getSponsorDonations] Sponsor data:", sponsorData);

    if (sponsorData.length === 0) {
      console.log("🟠 [getSponsorDonations] Sponsor not found");
      return res.status(404).json({ error: 'Sponsor not found' });
    }

    console.log("🔵 [getSponsorDonations] Fetching donations...");
    const [donations] = await db.execute(
      `SELECT d.amount, d.donation_date, d.child_id, c.name AS child_name
       FROM donations d
       JOIN children c ON d.child_id = c.child_id
       WHERE d.sponsor_id = ?
       ORDER BY d.donation_date DESC`,
      [sponsorId]
    );
    console.log("🟢 [getSponsorDonations] Donations fetched:", donations);

    res.status(200).json({
      sponsor: sponsorData[0],
      donations: donations
    });
    console.log("🟢 [getSponsorDonations] Response sent");
  } catch (err) {
    console.error("❌ [getSponsorDonations] Error:", err);
    res.status(500).json({ error: 'Failed to fetch donation history' });
  }
};

export const findSponsorByEmail = async (req, res) => {
  console.log("🔵 [findSponsorByEmail] Entry");
  const { email } = req.body;
  console.log("📥 [findSponsorByEmail] Email:", email);

  try {
    console.log("🔵 [findSponsorByEmail] Querying sponsor by email...");
    const [result] = await db.execute(
      'SELECT * FROM sponsors WHERE email = ?',
      [email]
    );
    console.log("🟢 [findSponsorByEmail] Query result:", result);

    if (result.length === 0) {
      console.log("🟠 [findSponsorByEmail] No sponsor found");
      return res.status(404).json({ error: 'No sponsor found with this email' });
    }

    res.status(200).json({ sponsor: result[0] });
    console.log("🟢 [findSponsorByEmail] Response sent");
  } catch (err) {
    console.error("❌ [findSponsorByEmail] Error:", err);
    res.status(500).json({ error: 'Server error' });
  }
};


export const downloadSponsorCSV = async (req, res) => {
  console.log("🔵 [downloadSponsorCSV] Entry");
  const sponsorId = req.params.id;
  console.log("📥 [downloadSponsorCSV] sponsorId:", sponsorId);

  try {
    console.log("🔵 [downloadSponsorCSV] Fetching donations for CSV...");
    const [donations] = await db.execute(
      `SELECT d.donation_date, c.name AS child_name, d.amount
       FROM donations d
       JOIN children c ON d.child_id = c.child_id
       WHERE d.sponsor_id = ?
       ORDER BY d.donation_date DESC`,
      [sponsorId]
    );
    console.log("🟢 [downloadSponsorCSV] Donations fetched:", donations);

    if (donations.length === 0) {
      console.log("🟠 [downloadSponsorCSV] No donations found");
      return res.status(404).json({ error: 'No donations found' });
    }

    const formatted = donations.map(d => ({
      donation_date: new Date(d.donation_date).toLocaleDateString(),
      child_name: d.child_name,
      amount: d.amount
    }));
    console.log("🟢 [downloadSponsorCSV] Formatted data for CSV:", formatted);

    const csv = new Parser({ fields: ['donation_date', 'child_name', 'amount'] }).parse(formatted);

    res.header('Content-Type', 'text/csv');
    res.attachment(`sponsor_${sponsorId}_donations.csv`);
    res.send(csv);
    console.log("🟢 [downloadSponsorCSV] CSV sent");
  } catch (err) {
    console.error("❌ [downloadSponsorCSV] Error:", err);
    res.status(500).json({ error: 'CSV export failed' });
  }
};

export const getSponsorById = async (req, res) => {
  console.log("🔵 [getSponsorById] Entry");
  const sponsorId = req.params.id;
  console.log("📥 [getSponsorById] sponsorId:", sponsorId);

  try {
    console.log("🔵 [getSponsorById] Querying sponsor by ID...");
    const [rows] = await db.execute(
      'SELECT * FROM sponsors WHERE sponsor_id = ?',
      [sponsorId]
    );
    console.log("🟢 [getSponsorById] Query result:", rows);

    if (rows.length === 0) {
      console.log("🟠 [getSponsorById] Sponsor not found");
      return res.status(404).json({ error: 'Sponsor not found' });
    }

    res.status(200).json(rows[0]);
    console.log("🟢 [getSponsorById] Response sent");
  } catch (err) {
    console.error("❌ [getSponsorById] Error:", err);
    res.status(500).json({ error: 'Server error' });
  }
};
