import mongoose from 'mongoose';
import dns from 'dns';
import { env } from './env.js';

// Force Node to prefer IPv4 — some serverless platforms have flaky IPv6 DNS
dns.setDefaultResultOrder('ipv4first');

const g = globalThis;

/**
 * Reuse MongoDB connection across warm serverless invocations (Vercel).
 */
export async function connectDb() {
  mongoose.set('strictQuery', true);

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // Clear stale promise if previous connection attempt failed
  if (mongoose.connection.readyState === 0 && g.__mskMongoConnectPromise) {
    g.__mskMongoConnectPromise = null;
  }

  if (!g.__mskMongoConnectPromise) {
    console.log('[db] Connecting to MongoDB…');
    g.__mskMongoConnectPromise = mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 4000,
      connectTimeoutMS: 4000,
      socketTimeoutMS: 8000,
      maxPoolSize: 3,
      minPoolSize: 0,
      // Faster DNS resolution for SRV records
      family: 4,
    });
  }

  try {
    await g.__mskMongoConnectPromise;
    console.log('[db] Connected successfully');
  } catch (err) {
    console.error('[db] Connection failed:', err.message);
    g.__mskMongoConnectPromise = null;
    throw err;
  }

  return mongoose.connection;
}
