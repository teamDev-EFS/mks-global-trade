export function buildAdminFollowUpMessage(customerName: string, productSummary: string) {
  return `Hello ${customerName},

Thank you for contacting MSK Global Trade regarding ${productSummary}. We have received your enquiry and will assist you with quotation, MOQ, packing, and export details.

Regards,
MSK Global Trade`;
}

export function whatsappMeUrl(phone: string, message: string) {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return '#';
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
