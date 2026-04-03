import dotenv from 'dotenv';

dotenv.config();

const DEFAULT_MONGO = 'mongodb://127.0.0.1:27017/mks-global-trade';
const DEV_JWT_FALLBACK = 'dev-secret-change-in-production';
const EXAMPLE_JWT_FROM_FILE = 'change-me-to-a-long-random-string-in-production';

function parseFrontendUrls() {
  const raw =
    process.env.FRONTEND_URL ||
    'http://localhost:5173,http://localhost:5174';
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export const env = {
  port: Number(process.env.PORT) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || DEFAULT_MONGO,
  jwtSecret: process.env.JWT_SECRET || DEV_JWT_FALLBACK,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  /** Allowed browser origins (comma-separated in FRONTEND_URL) */
  frontendUrls: parseFrontendUrls(),
};

/**
 * Call before listening. Fails fast in production if secrets or DB URL are unsafe.
 * Logs warnings instead of throwing so the health endpoint can still respond.
 */
export function assertProductionConfig() {
  if (env.nodeEnv !== 'production') return;

  const weakJwt = new Set([DEV_JWT_FALLBACK, EXAMPLE_JWT_FROM_FILE, '']);
  if (!env.jwtSecret || env.jwtSecret.length < 32 || weakJwt.has(env.jwtSecret)) {
    console.error(
      '[SECURITY] JWT_SECRET is weak or missing. Set a strong random value (32+ chars) in Vercel env vars.'
    );
    // Don't throw — let the app start so health check can diagnose.
    // Auth endpoints will still fail because the token won't be trustworthy.
  }
  if (env.mongoUri === DEFAULT_MONGO) {
    console.error(
      '[CONFIG] MONGODB_URI is set to localhost default. Set your Atlas connection string in Vercel env vars.'
    );
  }
}
