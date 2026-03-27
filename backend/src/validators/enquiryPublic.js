import { z } from 'zod';

const productLine = z.object({
  productId: z.string().optional().default(''),
  productName: z.string().optional().default(''),
  category: z.string().optional().default(''),
  variant: z.string().optional().default(''),
  quantity: z.union([z.number(), z.string()]).optional().nullable(),
});

export const publicEnquirySchema = z.object({
  sourceType: z.enum(['contact_form', 'product_modal', 'inquiry_list']),
  customerName: z.string().trim().min(1, 'Name is required').max(200),
  email: z.union([z.string().email(), z.literal('')]).optional().default(''),
  phone: z.string().trim().min(8, 'Valid phone required').max(40),
  whatsappNumber: z.string().trim().max(40).optional().default(''),
  location: z.string().trim().max(500).optional().default(''),
  country: z.string().trim().max(120).optional().default(''),
  city: z.string().trim().max(120).optional().default(''),
  message: z.string().trim().max(20000).optional().default(''),
  products: z.array(productLine).optional().default([]),
});

export function parsePublicEnquiry(body) {
  return publicEnquirySchema.parse(body);
}
