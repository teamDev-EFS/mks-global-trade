/** Shared enquiry / contact field validation (client-side). */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value: string): string | undefined {
  const v = value.trim();
  if (!v) return 'Email is required';
  if (!EMAIL_RE.test(v)) return 'Enter a valid email address';
  return undefined;
}

/** At least 8 digits (allows +, spaces, dashes). */
export function validatePhone(value: string): string | undefined {
  const v = value.trim();
  if (!v) return 'Phone is required';
  const digits = v.replace(/\D/g, '');
  if (digits.length < 8) return 'Enter a valid phone number (at least 8 digits)';
  if (digits.length > 15) return 'Phone number looks too long';
  return undefined;
}

export function validateRequired(value: string, label: string): string | undefined {
  if (!value.trim()) return `${label} is required`;
  return undefined;
}

/** Quantity: required, positive number (decimals allowed). */
export function validateQuantity(value: string): string | undefined {
  const v = value.trim();
  if (!v) return 'Quantity is required';
  const n = Number(v.replace(/,/g, ''));
  if (Number.isNaN(n) || n <= 0) return 'Enter a valid quantity greater than zero';
  if (n > 1e9) return 'Quantity is too large';
  return undefined;
}

export function validateOptionalMessage(value: string, maxLen = 2000): string | undefined {
  if (value.length > maxLen) return `Message must be at most ${maxLen} characters`;
  return undefined;
}

export type EnquiryFields = {
  name: string;
  email: string;
  phone: string;
  quantity: string;
  location: string;
  message: string;
};

export function validateEnquiryForm(fields: EnquiryFields): Partial<Record<keyof EnquiryFields, string>> {
  const errors: Partial<Record<keyof EnquiryFields, string>> = {};
  const nameErr = validateRequired(fields.name, 'Name');
  if (nameErr) errors.name = nameErr;
  const emailErr = validateEmail(fields.email);
  if (emailErr) errors.email = emailErr;
  const phoneErr = validatePhone(fields.phone);
  if (phoneErr) errors.phone = phoneErr;
  const qtyErr = validateQuantity(fields.quantity);
  if (qtyErr) errors.quantity = qtyErr;
  const locErr = validateRequired(fields.location, 'Location');
  if (locErr) errors.location = locErr;
  const msgErr = validateOptionalMessage(fields.message);
  if (msgErr) errors.message = msgErr;
  return errors;
}

export type ContactFields = {
  name: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  location: string;
  message: string;
};

/** Contact page: required name, email, phone; optional product/location; quantity validated if provided. */
export function validateContactFormFields(fields: ContactFields): Partial<Record<keyof ContactFields, string>> {
  const errors: Partial<Record<keyof ContactFields, string>> = {};
  const nameErr = validateRequired(fields.name, 'Name');
  if (nameErr) errors.name = nameErr;
  const emailErr = validateEmail(fields.email);
  if (emailErr) errors.email = emailErr;
  const phoneErr = validatePhone(fields.phone);
  if (phoneErr) errors.phone = phoneErr;
  const productErr = validateRequired(fields.product, 'Product');
  if (productErr) errors.product = productErr;
  const locErr = validateRequired(fields.location, 'Location');
  if (locErr) errors.location = locErr;
  const qtyErr = validateQuantity(fields.quantity);
  if (qtyErr) errors.quantity = qtyErr;
  const msgErr = validateOptionalMessage(fields.message);
  if (msgErr) errors.message = msgErr;
  return errors;
}
