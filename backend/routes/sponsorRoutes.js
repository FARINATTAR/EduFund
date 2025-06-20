// import express from 'express';
// import { registerSponsor, getSponsorDonations } from '../controllers/sponsorController.js';
// import { downloadSponsorCSV } from '../controllers/sponsorController.js';
// import { findSponsorByEmail } from '../controllers/sponsorController.js';
// import { getSponsorById } from '../controllers/sponsorController.js';
// import db from '../db/db.js'; // make sure this connects to MySQL properly
// import bcrypt from 'bcrypt'; // for password hashing (optional but recommended)


// const router = express.Router();

// router.post('/', registerSponsor);
// router.get('/:id/donations', getSponsorDonations); // ✅ New route
// router.get('/:id/donations/export', downloadSponsorCSV);
// router.post('/login', findSponsorByEmail);
// router.get('/:id', getSponsorById);
// router.post("/signup", async (req, res) => {
//   const {
//     name, email, password, phone, gender,
//     dateOfBirth, street, area, pincode, role
//   } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const sql = `
//       INSERT INTO sponsors 
//       (name, email, password, phone, gender, dateOfBirth, street, area, pincode, role)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     const values = [
//       name,
//       email,
//       hashedPassword,
//       phone,
//       gender,
//       dateOfBirth,
//       street,
//       area,
//       pincode,
//       role
//     ];

//     // ✅ Place it here inside try block
//     db.query(sql, values, (err, result) => {
//       console.log("📤 SQL:", sql);
//       console.log("📦 Values:", values);

//       if (err) {
//         console.error("❌ Error inserting sponsor:", err);
//         return res.status(500).json({ error: "Database error", details: err.message });
//       }

//       console.log("✅ Sponsor inserted with ID:", result.insertId);
//       res.status(201).json({
//         message: "Signup successful!",
//         sponsorId: result.insertId
//       });
//     });

//   } catch (err) {
//     console.error("❌ Catch Block Error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });
// export default router;
// import express from 'express';
// import { registerSponsor, getSponsorDonations } from '../controllers/sponsorController.js';
// import { downloadSponsorCSV } from '../controllers/sponsorController.js';
// import { findSponsorByEmail } from '../controllers/sponsorController.js';
// import { getSponsorById } from '../controllers/sponsorController.js';
// import db from '../db/db.js';
// import bcrypt from 'bcrypt';

// const router = express.Router();


// router.post("/signup", async (req, res) => {
//   console.log("🚀 Signup route hit with data:", req.body);
  
//   const {
//     name, email, password, phone, gender,
//     dateOfBirth, street, area, pincode, role
//   } = req.body;

//   try {
//     // Validate required fields
//     if (!name || !email || !password || !phone || !gender || !dateOfBirth || !street || !area || !pincode) {
//       return res.status(400).json({ 
//         success: false,
//         message: "All fields are required" 
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const sql = `
//       INSERT INTO sponsors 
//       (name, email, password, phone, gender, dateOfBirth, street, area, pincode, role)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     const values = [
//       name, email, hashedPassword, phone, gender,
//       dateOfBirth, street, area, pincode, role || 'sponsor'
//     ];

//     console.log("📤 SQL:", sql);
//     console.log("📦 Values:", values);

//     // Add timeout to prevent hanging
//     const queryTimeout = setTimeout(() => {
//       console.log("⏰ Query timeout - sending response anyway");
//       if (!res.headersSent) {
//         return res.status(201).json({
//           success: true,
//           message: "Signup successful!",
//           sponsorId: "pending"
//         });
//       }
//     }, 5000); // 5 second timeout

//     db.query(sql, values, (err, result) => {
//       clearTimeout(queryTimeout); // Clear timeout if callback runs
      
//       console.log("🔄 Database callback executed"); // Add this log
      
//       if (err) {
//         console.error("❌ Database Error:", err);
        
//         if (!res.headersSent) {
//           if (err.code === 'ER_DUP_ENTRY') {
//             return res.status(400).json({ 
//               success: false,
//               message: "Email already exists" 
//             });
//           }
          
//           return res.status(500).json({ 
//             success: false,
//             message: "Database error",
//             error: err.message 
//           });
//         }
//         return;
//       }

//       console.log("✅ Sponsor registration successfull:");
      
//       if (!res.headersSent) {
//         return res.status(201).json({
//           success: true,
//           message: "Signup successful!",
//         });
//       }
//     });

//   } catch (error) {
//     console.error("❌ Server Error:", error);
//     if (!res.headersSent) {
//       return res.status(500).json({ 
//         success: false,
//         message: "Server error",
//         error: error.message 
//       });
//     }
//   }
// });

// // Login route
// router.post('/login', findSponsorByEmail);

// // Other routes
// // router.post('/', registerSponsor); // This might conflict with signup, consider removing or changing
// router.get('/:id/donations', getSponsorDonations);
// router.get('/:id/donations/export', downloadSponsorCSV);
// router.get('/:id', getSponsorById);

// export default router;

import express from 'express';
import { registerSponsor, getSponsorDonations } from '../controllers/sponsorController.js';
import { downloadSponsorCSV } from '../controllers/sponsorController.js';
import { findSponsorByEmail } from '../controllers/sponsorController.js';
import { getSponsorById } from '../controllers/sponsorController.js';
import db from '../db/db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log("🚀 Signup route hit with data:", req.body);
  
  const {
    name, email, password, phone, gender,
    dateOfBirth, street, area, pincode, role
  } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !password || !phone || !gender || !dateOfBirth || !street || !area || !pincode) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required" 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO sponsors 
      (name, email, password, phone, gender, dateOfBirth, street, area, pincode, role)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      name, email, hashedPassword, phone, gender,
      dateOfBirth, street, area, pincode, role || 'sponsor'
    ];

    console.log("📤 SQL:", sql);
    console.log("📦 Values:", values);

    // Add timeout to prevent hanging
    const queryTimeout = setTimeout(() => {
      console.log("⏰ Query timeout - sending response anyway");
      if (!res.headersSent) {
        return res.status(201).json({
          success: true,
          message: "Signup successful! Please login to continue.",
          redirect: "/sponsor/login"  // ✅ Add redirect URL
        });
      }
    }, 5000); // 5 second timeout

    db.query(sql, values, (err, result) => {
      clearTimeout(queryTimeout); // Clear timeout if callback runs
      
      console.log("🔄 Database callback executed");
      
      if (err) {
        console.error("❌ Database Error:", err);
        
        if (!res.headersSent) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ 
              success: false,
              message: "Email already exists" 
            });
          }
          
          return res.status(500).json({ 
            success: false,
            message: "Database error",
            error: err.message 
          });
        }
        return;
      }

      console.log("✅ Sponsor registration successful");
      
      if (!res.headersSent) {
        return res.status(201).json({
          success: true,
          message: "Signup successful! Please login to continue.",
          redirect: "/sponsor/login",  // ✅ Add redirect URL
        });
      }
    });

  } catch (error) {
    console.error("❌ Server Error:", error);
    if (!res.headersSent) {
      return res.status(500).json({ 
        success: false,
        message: "Server error",
        error: error.message 
      });
    }
  }
});

// Login route
router.post('/login', findSponsorByEmail);

// Other routes
router.get('/:id/donations', getSponsorDonations);
router.get('/:id/donations/export', downloadSponsorCSV);
router.get('/:id', getSponsorById);

export default router;