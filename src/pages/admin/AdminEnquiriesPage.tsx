import React, { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Download, ExternalLink, Search } from 'lucide-react';
import { toast } from 'react-toastify';
import { adminFetch, getAdminToken } from '../../api/adminClient';
import {
  Card,
  PageHeader,
  StatusBadge,
  LoadingState,
  FilterInput,
  FilterSelect,
  PrimaryButton,
  SecondaryButton,
  STATUS_OPTIONS,
  SOURCE_OPTIONS,
} from '../../components/admin/AdminUI';

type EnquiryRow = {
  _id: string;
  enquiryId: string;
  customerName: string;
  phone: string;
  country: string;
  sourceType: string;
  status: string;
  priority: string;
  createdAt: string;
  products?: { productName?: string }[];
};

type PagedResult = { items: EnquiryRow[]; total: number; page: number; pages: number };

const ITEMS_PER_PAGE = 15;

function summarizeProducts(products?: { productName?: string }[]): string {
  if (!products?.length) return '—';
  return products.map((p) => p.productName).filter(Boolean).join(', ') || '—';
}

function buildWhatsAppUrl(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return digits ? `https://wa.me/${digits}` : '#';
}

const AdminEnquiriesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<PagedResult | null>(null);
  const [loading, setLoading] = useState(true);

  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const country = searchParams.get('country') || '';
  const status = searchParams.get('status') || '';
  const sourceType = searchParams.get('sourceType') || '';

  const loadData = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('limit', String(ITEMS_PER_PAGE));
    if (search) params.set('search', search);
    if (country) params.set('country', country);
    if (status) params.set('status', status);
    if (sourceType) params.set('sourceType', sourceType);

    adminFetch<PagedResult>(`/api/admin/enquiries?${params}`)
      .then(setData)
      .catch((e) => toast.error(e instanceof Error ? e.message : 'Failed'))
      .finally(() => setLoading(false));
  }, [page, search, country, status, sourceType]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const setFilter = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(searchParams);
      if (value) next.set(key, value);
      else next.delete(key);
      next.set('page', '1');
      setSearchParams(next);
    },
    [searchParams, setSearchParams],
  );

  const clearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  const goToPage = useCallback(
    (p: number) => {
      const next = new URLSearchParams(searchParams);
      next.set('page', String(p));
      setSearchParams(next);
    },
    [searchParams, setSearchParams],
  );

  const exportCsv = useCallback(async () => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (country) params.set('country', country);
    if (status) params.set('status', status);
    if (sourceType) params.set('sourceType', sourceType);

    const apiBase = import.meta.env.VITE_API_URL ?? '';
    const token = getAdminToken();

    try {
      const res = await fetch(`${apiBase}/api/admin/enquiries/export/csv?${params}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error('Export failed');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'enquiries.csv';
      anchor.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error('Export failed');
    }
  }, [search, country, status, sourceType]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enquiries"
        subtitle="Search and manage leads"
        actions={
          <SecondaryButton onClick={exportCsv} className="inline-flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </SecondaryButton>
        }
      />

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <FilterInput
              placeholder="Search name, phone, ID..."
              className="pl-9"
              defaultValue={search}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setFilter('search', (e.target as HTMLInputElement).value);
              }}
            />
          </div>
          <FilterInput
            placeholder="Country"
            value={country}
            onChange={(e) => setFilter('country', e.target.value)}
          />
          <FilterSelect value={status} onChange={(e) => setFilter('status', e.target.value)}>
            <option value="">All statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
            ))}
          </FilterSelect>
          <FilterSelect value={sourceType} onChange={(e) => setFilter('sourceType', e.target.value)}>
            <option value="">All sources</option>
            {SOURCE_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </FilterSelect>
          <SecondaryButton onClick={clearFilters}>Clear filters</SecondaryButton>
        </div>
      </Card>

      {/* Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-stone-50/80 text-stone-500 text-left text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Country</th>
                <th className="px-4 py-3 font-medium">Products</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10}><LoadingState /></td>
                </tr>
              ) : !data?.items.length ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-stone-400 text-sm">
                    No enquiries found
                  </td>
                </tr>
              ) : (
                data.items.map((row) => (
                  <tr key={row._id} className="border-t border-stone-100 hover:bg-stone-50/60 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs">
                      <Link to={`/admin/enquiries/${row._id}`} className="text-emerald-700 font-semibold hover:text-emerald-900">
                        {row.enquiryId}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-stone-700 font-medium">{row.customerName}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-stone-500">{row.phone}</td>
                    <td className="px-4 py-3 text-stone-500">{row.country || '—'}</td>
                    <td className="px-4 py-3 max-w-[180px] truncate text-stone-500" title={summarizeProducts(row.products)}>
                      {summarizeProducts(row.products)}
                    </td>
                    <td className="px-4 py-3 capitalize text-stone-500">{row.sourceType?.replace(/_/g, ' ')}</td>
                    <td className="px-4 py-3"><StatusBadge value={row.status} /></td>
                    <td className="px-4 py-3"><StatusBadge value={row.priority} type="priority" /></td>
                    <td className="px-4 py-3 whitespace-nowrap text-stone-400 text-xs">
                      {new Date(row.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={buildWhatsAppUrl(row.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 text-xs font-medium"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> WA
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.pages > 1 && (
          <div className="flex justify-between items-center px-4 py-3 border-t border-stone-100 text-sm">
            <span className="text-stone-400 text-xs">
              Page {data.page} of {data.pages} &middot; {data.total} total
            </span>
            <div className="flex gap-2">
              <SecondaryButton disabled={page <= 1} onClick={() => goToPage(page - 1)} className="px-3 py-1.5 text-xs">
                Previous
              </SecondaryButton>
              <SecondaryButton disabled={page >= data.pages} onClick={() => goToPage(page + 1)} className="px-3 py-1.5 text-xs">
                Next
              </SecondaryButton>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminEnquiriesPage;
