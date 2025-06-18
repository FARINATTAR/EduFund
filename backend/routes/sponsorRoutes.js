import express from 'express';
import { registerSponsor, getSponsorDonations } from '../controllers/sponsorController.js';

const router = express.Router();

router.post('/', registerSponsor);
router.get('/:id/donations', getSponsorDonations); // ✅ New route

export default router;
