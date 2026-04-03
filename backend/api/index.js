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
  cachedHandler = serverless(app, { binary: false });
  return cachedHandler;
}

export default async function handler(req, res) {
  try {
    const h = await getHandler();
    return h(req, res);
  } catch (err) {
    console.error('[Serverless cold-start failure]', err);
    // Clear cached handler so next invocation retries
    cachedHandler = null;
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        error: 'Service temporarily unavailable',
        reason:
          process.env.NODE_ENV === 'production'
            ? 'Backend initialization failed. Check logs.'
            : err.message,
      })
    );
  }
}
