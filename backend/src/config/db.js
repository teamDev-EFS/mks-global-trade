import mongoose from 'mongoose';
import { env } from './env.js';

const g = globalThis;

/**
 * Reuse MongoDB connection across warm serverless invocations (Vercel) and avoid duplicate connects.
 * Includes timeouts to fail fast instead of hanging on cold starts.
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
    g.__mskMongoConnectPromise = mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 10000,
      maxPoolSize: 5,
      minPoolSize: 0,
    });
  }

  try {
    await g.__mskMongoConnectPromise;
  } catch (err) {
    g.__mskMongoConnectPromise = null;
    throw err;
  }

  return mongoose.connection;
}
