export interface Product {
  id: string;
  slug: string;
  /** Optional alternate URL slugs for the same product (SEO / legacy links). */
  slugAliases?: string[];
  name: string;
  category: string;
  variants: string[];
  shortDescription: string;
  highlights: string[];
  tags: string[];
  packing: string;
  exportMarkets: string[];
  availability: string;
  image: string;
  featured: boolean;
  inquiryPriority: number;
  description: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  region: string;
}

export interface Testimonial {
  id: string;
  name: string;
  feedback: string;
  avatar: string;
  /** Optional organisation label (B2B context). */
  company?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface InquiryProduct {
  productId: string;
  variant: string;
  quantity: number;
  notes?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  message: string;
  products: InquiryProduct[];
}

export interface Highlight {
  id: string;
  title: string;
  description: string;
  icon: string;
}
