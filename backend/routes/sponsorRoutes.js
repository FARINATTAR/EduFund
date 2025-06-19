import express from 'express';
import { registerSponsor, getSponsorDonations } from '../controllers/sponsorController.js';
import { downloadSponsorCSV } from '../controllers/sponsorController.js';
import { findSponsorByEmail } from '../controllers/sponsorController.js';
import { getSponsorById } from '../controllers/sponsorController.js';


const router = express.Router();

router.post('/', registerSponsor);
router.get('/:id/donations', getSponsorDonations); // ✅ New route
router.get('/:id/donations/export', downloadSponsorCSV);
router.post('/login', findSponsorByEmail);
router.get('/:id', getSponsorById);

export default router;
