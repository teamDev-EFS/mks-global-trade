import Notification from '../models/Notification.js';

export async function createNewEnquiryNotification(enquiry) {
  const productSummary =
    enquiry.products?.length > 0
      ? enquiry.products.map((p) => p.productName || p.category || 'Product').join(', ')
      : 'General';
  const title = `New enquiry ${enquiry.enquiryId}`;
  const message = `${enquiry.customerName} · ${productSummary} · ${enquiry.country || enquiry.location || '—'}`;
  return Notification.create({
    type: 'new_enquiry',
    title,
    message,
    enquiryId: enquiry._id,
    enquiryHumanId: enquiry.enquiryId,
    isRead: false,
  });
}

export async function createStatusUpdateNotification(enquiry, oldStatus, adminName) {
  return Notification.create({
    type: 'status_update',
    title: `Status: ${enquiry.enquiryId}`,
    message: `${adminName || 'Admin'} changed status from ${oldStatus} to ${enquiry.status}`,
    enquiryId: enquiry._id,
    enquiryHumanId: enquiry.enquiryId,
    isRead: false,
  });
}

export async function createNoteNotification(enquiry, adminName) {
  return Notification.create({
    type: 'note_added',
    title: `Note on ${enquiry.enquiryId}`,
    message: `${adminName || 'Admin'} added a note`,
    enquiryId: enquiry._id,
    enquiryHumanId: enquiry.enquiryId,
    isRead: false,
  });
}
