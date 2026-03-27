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
 */
export function assertProductionConfig() {
  if (env.nodeEnv !== 'production') return;

  const weakJwt = new Set([DEV_JWT_FALLBACK, EXAMPLE_JWT_FROM_FILE, '']);
  if (!env.jwtSecret || env.jwtSecret.length < 32 || weakJwt.has(env.jwtSecret)) {
    throw new Error(
      'Set JWT_SECRET to a strong random value (32+ characters) in production.'
    );
  }
  if (env.mongoUri === DEFAULT_MONGO) {
    throw new Error(
      'Set MONGODB_URI to your production MongoDB connection string.'
    );
  }
}
