import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Product } from '../types';

export type ProductSortKey = 'name' | 'inquiryPriority';

export function useProductCatalogFilters(allProducts: Product[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('q') ?? '';
  const categoryFilter = searchParams.get('cat');
  const variantFilter = searchParams.get('var');
  const tagFilter = searchParams.get('tag');
  const sortKey: ProductSortKey =
    searchParams.get('sort') === 'name' ? 'name' : 'inquiryPriority';

  const setSearch = useCallback(
    (v: string) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (v.trim()) next.set('q', v.trim());
          else next.delete('q');
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const setCategoryFilter = useCallback(
    (v: string | null) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (v) next.set('cat', v);
          else next.delete('cat');
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const setVariantFilter = useCallback(
    (v: string | null) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (v) next.set('var', v);
          else next.delete('var');
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const setTagFilter = useCallback(
    (v: string | null) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (v) next.set('tag', v);
          else next.delete('tag');
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const setSortKey = useCallback(
    (k: ProductSortKey) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (k === 'name') next.set('sort', 'name');
          else next.delete('sort');
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const clearFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const activeFilterCount = useMemo(() => {
    let n = 0;
    if (search.trim()) n += 1;
    if (categoryFilter) n += 1;
    if (variantFilter) n += 1;
    if (tagFilter) n += 1;
    return n;
  }, [search, categoryFilter, variantFilter, tagFilter]);

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;
    if (search.trim()) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.category.toLowerCase().includes(lower) ||
          p.tags.some((tag) => tag.toLowerCase().includes(lower))
      );
    }
    if (categoryFilter) {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }
    if (variantFilter) {
      filtered = filtered.filter((p) => p.variants.includes(variantFilter));
    }
    if (tagFilter) {
      filtered = filtered.filter((p) => p.tags.includes(tagFilter));
    }
    if (sortKey === 'name') {
      filtered = filtered.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filtered = filtered.slice().sort((a, b) => a.inquiryPriority - b.inquiryPriority);
    }
    return filtered;
  }, [allProducts, search, categoryFilter, variantFilter, tagFilter, sortKey]);

  return {
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    variantFilter,
    setVariantFilter,
    tagFilter,
    setTagFilter,
    sortKey,
    setSortKey,
    filteredProducts,
    clearFilters,
    activeFilterCount,
  };
}
