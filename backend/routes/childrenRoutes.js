import express from 'express';
import { getAllChildren, getChildById  } from '../controllers/childrenController.js';

const router = express.Router();

router.get('/', getAllChildren);
router.get('/:id', getChildById); // ✅ add this line

export default router;
