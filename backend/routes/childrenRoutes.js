import express from 'express';
import { getAllChildren } from '../controllers/childrenController.js';

const router = express.Router();

router.get('/', getAllChildren);

export default router;
