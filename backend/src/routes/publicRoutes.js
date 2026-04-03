import { Router } from 'express';
import mongoose from 'mongoose';
import { createEnquiry } from '../controllers/publicEnquiryController.js';

const router = Router();

router.get('/health', (_req, res) => {
  const dbState = mongoose.connection.readyState;
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const dbReady = dbState === 1;
  res.status(dbReady ? 200 : 503).json({
    ok: dbReady,
    db: dbReady,
    dbState,
    env: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

router.post('/enquiries', createEnquiry);

export default router;
