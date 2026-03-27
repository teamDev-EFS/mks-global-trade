/**
 * Vercel serverless entry — wraps Express for /api and /api/admin routes.
 * Set Root Directory to `backend` in the Vercel project settings.
 */
import serverless from 'serverless-http';
import app from '../src/app.js';
import { connectDb } from '../src/config/db.js';
import { assertProductionConfig } from '../src/config/env.js';

let cachedHandler;

async function getHandler() {
  if (cachedHandler) return cachedHandler;
  assertProductionConfig();
  await connectDb();
  cachedHandler = serverless(app, {
    binary: false,
  });
  return cachedHandler;
}

export default async function handler(req, res) {
  const h = await getHandler();
  return h(req, res);
}
