import { products as catalog } from '../data/products';
import type { Product } from '../types';

export function getProductBySlugOrId(slugOrId: string | undefined): Product | undefined {
  if (!slugOrId) return undefined;
  return catalog.find((p) => p.slug === slugOrId || p.id === slugOrId);
}
