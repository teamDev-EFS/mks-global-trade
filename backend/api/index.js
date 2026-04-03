/**
 * Vercel serverless entry — wraps Express for /api and /api/admin routes.
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

/** Race a promise against a timeout — returns whichever settles first. */
function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`Timed out after ${ms}ms`)),
      ms
    );
    promise.then(
      (v) => { clearTimeout(timer); resolve(v); },
      (e) => { clearTimeout(timer); reject(e); }
    );
  });
}

export default async function handler(req, res) {
  // CORS preflight — no DB needed
  if (req.method === 'OPTIONS') {
    const origins = (process.env.FRONTEND_URL || '').split(',').map(s => s.trim()).filter(Boolean);
    const origin = req.headers.origin || '';
    const allowed = !origin || origins.includes(origin);
    res.setHeader('Access-Control-Allow-Origin', allowed ? (origin || '*') : '');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '86400');
    res.statusCode = 204;
    return res.end();
  }

  // Diagnostic endpoint — works without DB
  if (req.url === '/api/ping' || req.url === '/ping') {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    return res.end(JSON.stringify({
      ok: true,
      mongoUriSet: !!process.env.MONGODB_URI,
      mongoHost: (process.env.MONGODB_URI || 'NOT SET').replace(/\/\/.*@/, '//***@').split('?')[0],
      nodeEnv: process.env.NODE_ENV || 'not set',
      jwtSet: !!process.env.JWT_SECRET,
      frontendUrl: process.env.FRONTEND_URL || 'not set',
      timestamp: new Date().toISOString(),
    }));
  }

  try {
    // 7s timeout — fail before Vercel's 10s kill
    const h = await withTimeout(getHandler(), 7000);
    return h(req, res);
  } catch (err) {
    console.error('[handler error]', err.message);
    cachedHandler = null;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.statusCode = 503;
    return res.end(JSON.stringify({
      error: 'Service unavailable',
      detail: err.message,
      mongoUriSet: !!process.env.MONGODB_URI,
      mongoHost: (process.env.MONGODB_URI || 'NOT SET').replace(/\/\/.*@/, '//***@').split('?')[0],
      nodeEnv: process.env.NODE_ENV || 'not set',
    }));
  }
}
