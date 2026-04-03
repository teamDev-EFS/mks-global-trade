/**
 * Creates or updates a single admin user (does not delete enquiries/notifications).
 * Optional env: ADMIN_EMAIL, ADMIN_PASSWORD (otherwise defaults + random password).
 */
import crypto from 'crypto';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { env } from '../config/env.js';
import Admin from '../models/Admin.js';
import { hashPassword } from '../utils/password.js';

dotenv.config();

const email = (process.env.ADMIN_EMAIL || process.env.ADMIN_DEFAULT_EMAIL || 'operations@mskglobaltrade.com')
  .toLowerCase()
  .trim();
const password =
  process.env.ADMIN_PASSWORD ||
  process.env.ADMIN_DEFAULT_PASSWORD ||
  crypto.randomBytes(18).toString('base64url').slice(0, 22);

async function main() {
  await mongoose.connect(env.mongoUri);

  const existing = await Admin.findOne({ email });
  const hash = await hashPassword(password);

  if (existing) {
    existing.passwordHash = hash;
    existing.isActive = true;
    existing.role = 'superadmin';
    await existing.save();
    console.log('Updated existing admin password.');
  } else {
    await Admin.create({
      name: 'MSK Admin',
      email,
      passwordHash: hash,
      role: 'superadmin',
      isActive: true,
    });
    console.log('Created new admin.');
  }

  console.log('');
  console.log('Use these credentials to sign in at /admin/login:');
  console.log('  Email:    ', email);
  console.log('  Password: ', password);
  console.log('');
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
