export type SourceType = 'contact_form' | 'product_modal' | 'inquiry_list';

export type ProductLine = {
  productId?: string;
  productName?: string;
  category?: string;
  variant?: string;
  quantity?: number | string | null;
};

export type PublicEnquiryBody = {
  sourceType: SourceType;
  customerName: string;
  email?: string;
  phone: string;
  whatsappNumber?: string;
  location?: string;
  country?: string;
  city?: string;
  message?: string;
  products?: ProductLine[];
};

const apiBase = import.meta.env.VITE_API_URL ?? '';

export async function submitPublicEnquiry(body: PublicEnquiryBody) {
  const res = await fetch(`${apiBase}/api/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(typeof (data as { error?: string }).error === 'string' ? (data as { error: string }).error : `Request failed (${res.status})`);
  }
  return data as { success: boolean; enquiryId: string; id: string };
}
