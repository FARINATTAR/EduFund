import express from 'express';
import bcrypt from 'bcrypt';
import db from '../db/db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const {
    name, email, password, phone, gender,
    dateOfBirth, address, role
  } = req.body;

  console.log("📥 Received registration data:", req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Password hashed successfully");

    const insertSponsorSQL = `
      INSERT INTO sponsors 
      (name, email, password, phone, gender, dateOfBirth, street, area, pincode, role, isVerified) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, true)
    `;

    db.query(insertSponsorSQL, [
      name,
      email,
      hashedPassword,
      phone,
      gender,
      dateOfBirth,
      address.street,
      address.area,
      address.pincode,
      role || "sponsor"
    ], (err, result) => {
      if (err) {
        console.error("❌ DB Insertion Error:", err.sqlMessage || err);
        return res.status(400).json({ success: false, message: 'Sponsor already exists or data error.' });
      }

      console.log("✅ Sponsor inserted into DB");
      res.status(200).json({
        success: true,
        isVerified: true,
        message: 'Signup successful!'
      });
    });

  } catch (error) {
    console.error("❌ Catch Block Error:", error.message || error);
    res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
});

export default router;
