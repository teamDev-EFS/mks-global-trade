import mongoose from 'mongoose';
import { env } from './env.js';

const g = globalThis;

/**
 * Reuse MongoDB connection across warm serverless invocations (Vercel) and avoid duplicate connects.
 */
export async function connectDb() {
  mongoose.set('strictQuery', true);

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!g.__mskMongoConnectPromise) {
    g.__mskMongoConnectPromise = mongoose.connect(env.mongoUri);
  }

  await g.__mskMongoConnectPromise;
  return mongoose.connection;
}
