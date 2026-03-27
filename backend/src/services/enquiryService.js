import Enquiry from '../models/Enquiry.js';
import { nextEnquiryHumanId } from './enquirySequenceService.js';
import { inferCountryCity } from '../utils/location.js';
import { createNewEnquiryNotification } from './notificationService.js';

export async function createPublicEnquiry(raw, req) {
  const enquiryId = await nextEnquiryHumanId();
  const { country, city } = inferCountryCity(raw.location, raw.country, raw.city);
  const whatsapp = raw.whatsappNumber?.trim() || raw.phone?.trim() || '';

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    '';

  const enquiry = await Enquiry.create({
    enquiryId,
    sourceType: raw.sourceType,
    customerName: raw.customerName,
    email: raw.email || '',
    phone: raw.phone,
    whatsappNumber: whatsapp,
    location: raw.location || '',
    country: country || '',
    city: city || '',
    message: raw.message || '',
    products: (raw.products || []).map((p) => ({
      productId: p.productId || '',
      productName: p.productName || '',
      category: p.category || '',
      variant: p.variant || '',
      quantity: p.quantity ?? null,
    })),
    status: 'new',
    priority: 'medium',
    timeline: [
      {
        type: 'created',
        description: `Enquiry received via ${raw.sourceType.replace(/_/g, ' ')}`,
        createdAt: new Date(),
      },
      {
        type: 'notification',
        description: 'Notification queued for admins',
        createdAt: new Date(),
      },
    ],
    ipAddress: ip,
  });

  await createNewEnquiryNotification(enquiry);
  return enquiry;
}
