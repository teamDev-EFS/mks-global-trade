import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { env } from '../config/env.js';
import Admin from '../models/Admin.js';
import Enquiry from '../models/Enquiry.js';
import Notification from '../models/Notification.js';
import Counter from '../models/Counter.js';
import { hashPassword } from '../utils/password.js';

dotenv.config();

const adminEmail = process.env.ADMIN_DEFAULT_EMAIL || 'admin@mskglobaltrade.com';
const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'ChangeMe123!';

async function run() {
  await mongoose.connect(env.mongoUri);
  console.log('Connected');

  await Notification.deleteMany({});
  await Enquiry.deleteMany({});
  await Counter.deleteMany({});
  await Admin.deleteMany({ email: adminEmail });

  const passwordHash = await hashPassword(adminPassword);
  const admin = await Admin.create({
    name: 'MSK Admin',
    email: adminEmail,
    passwordHash,
    role: 'superadmin',
    isActive: true,
  });

  const year = new Date().getFullYear();
  await Counter.create({ year, seq: 3 });

  const e1 = await Enquiry.create({
    enquiryId: `ENQ-${year}-0001`,
    sourceType: 'contact_form',
    customerName: 'Sample Buyer',
    email: 'buyer@example.com',
    phone: '+919876543210',
    whatsappNumber: '+919876543210',
    location: 'Mumbai, India',
    country: 'India',
    city: 'Mumbai',
    message: 'Need vermicompost bulk quote.',
    products: [
      {
        productId: '1',
        productName: 'Vermicompost',
        category: 'Agro',
        variant: 'Bulk',
        quantity: 500,
      },
    ],
    status: 'new',
    priority: 'high',
    timeline: [
      { type: 'created', description: 'Seed enquiry', createdAt: new Date() },
    ],
  });

  const e2 = await Enquiry.create({
    enquiryId: `ENQ-${year}-0002`,
    sourceType: 'product_modal',
    customerName: 'Gulf Trading LLC',
    email: 'proc@gulf.ae',
    phone: '+971501234567',
    whatsappNumber: '+971501234567',
    location: 'Dubai, UAE',
    country: 'UAE',
    city: 'Dubai',
    message: 'Jaggery cubes export inquiry.',
    products: [
      {
        productId: '2',
        productName: 'Jaggery',
        category: 'Food',
        variant: 'Cube',
        quantity: 2000,
      },
    ],
    status: 'contacted',
    priority: 'medium',
    timeline: [{ type: 'created', description: 'Seed', createdAt: new Date() }],
    contactedViaWhatsApp: true,
    contactedAt: new Date(),
  });

  await Notification.create({
    type: 'new_enquiry',
    title: `New enquiry ${e1.enquiryId}`,
    message: `${e1.customerName} · Vermicompost · India`,
    enquiryId: e1._id,
    enquiryHumanId: e1.enquiryId,
    isRead: false,
  });

  console.log('Seed complete.');
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
