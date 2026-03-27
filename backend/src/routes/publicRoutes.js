import { Router } from 'express';
import mongoose from 'mongoose';
import { createEnquiry } from '../controllers/publicEnquiryController.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    ok: true,
    db: mongoose.connection.readyState === 1,
    readyState: mongoose.connection.readyState,
  });
});

router.post('/enquiries', createEnquiry);

export default router;
