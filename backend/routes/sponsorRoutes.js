import express from 'express';
import { registerSponsor, getSponsorDonations } from '../controllers/sponsorController.js';
import { downloadSponsorCSV } from '../controllers/sponsorController.js';
import { findSponsorByEmail } from '../controllers/sponsorController.js';
import { getSponsorById } from '../controllers/sponsorController.js';
import db from '../db/db.js'; // make sure this connects to MySQL properly
import bcrypt from 'bcrypt'; // for password hashing (optional but recommended)


const router = express.Router();

router.post('/', registerSponsor);
router.get('/:id/donations', getSponsorDonations); // ✅ New route
router.get('/:id/donations/export', downloadSponsorCSV);
router.post('/login', findSponsorByEmail);
router.get('/:id', getSponsorById);
router.post("/signup", async (req, res) => {
  const {
    name, email, password, phone, gender,
    dateOfBirth, street, area, pincode, role
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO sponsors 
      (name, email, password, phone, gender, dateOfBirth, street, area, pincode, role)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      name,
      email,
      hashedPassword,
      phone,
      gender,
      dateOfBirth,
      street,
      area,
      pincode,
      role
    ];

    // ✅ Place it here inside try block
    db.query(sql, values, (err, result) => {
      console.log("📤 SQL:", sql);
      console.log("📦 Values:", values);

      if (err) {
        console.error("❌ Error inserting sponsor:", err);
        return res.status(500).json({ error: "Database error", details: err.message });
      }

      console.log("✅ Sponsor inserted with ID:", result.insertId);
      res.status(201).json({
        message: "Signup successful!",
        sponsorId: result.insertId
      });
    });

  } catch (err) {
    console.error("❌ Catch Block Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});
export default router;
