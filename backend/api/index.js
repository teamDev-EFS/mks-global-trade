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
  // Handle CORS preflight immediately — no DB needed
  if (req.method === 'OPTIONS') {
    const allowedOrigins = (process.env.FRONTEND_URL || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const origin = req.headers.origin || '';
    const isAllowed = !origin || allowedOrigins.includes(origin);

    res.setHeader('Access-Control-Allow-Origin', isAllowed ? (origin || '*') : '');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '86400');
    res.statusCode = 204;
    res.end();
    return;
  }

  try {
    const h = await getHandler();
    return h(req, res);
  } catch (err) {
    console.error('[Serverless cold-start failure]', err);
    cachedHandler = null;
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.end(
      JSON.stringify({
        error: 'Service temporarily unavailable',
        reason:
          process.env.NODE_ENV === 'production'
            ? 'Backend initialization failed. Check Vercel logs.'
            : err.message,
      })
    );
  }
}
