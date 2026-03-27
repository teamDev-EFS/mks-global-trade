import rateLimit from 'express-rate-limit';

/** Limit brute-force attempts on admin login (per IP). */
export const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Try again later.' },
});
