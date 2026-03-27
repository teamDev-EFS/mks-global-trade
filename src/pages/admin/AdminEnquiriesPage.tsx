import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { adminFetch, getAdminToken } from '../../api/adminClient';
import { toast } from 'react-toastify';
import { ExternalLink } from 'lucide-react';

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

function productSummary(products?: { productName?: string }[]) {
  if (!products?.length) return '—';
  return products.map((p) => p.productName).filter(Boolean).join(', ') || '—';
}

function waUrl(phone: string) {
  const d = phone.replace(/\D/g, '');
  return `https://wa.me/${d}`;
}

export default function AdminEnquiriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<{ items: EnquiryRow[]; total: number; page: number; pages: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const country = searchParams.get('country') || '';
  const status = searchParams.get('status') || '';
  const sourceType = searchParams.get('sourceType') || '';

  const load = () => {
    setLoading(true);
    const q = new URLSearchParams();
    q.set('page', String(page));
    q.set('limit', '15');
    if (search) q.set('search', search);
    if (country) q.set('country', country);
    if (status) q.set('status', status);
    if (sourceType) q.set('sourceType', sourceType);
    adminFetch<{ items: EnquiryRow[]; total: number; page: number; pages: number }>(`/api/admin/enquiries?${q}`)
      .then(setData)
      .catch((e) => toast.error(e instanceof Error ? e.message : 'Failed'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [page, search, country, status, sourceType]);

  const setFilter = (key: string, value: string) => {
    const n = new URLSearchParams(searchParams);
    if (value) n.set(key, value);
    else n.delete(key);
    n.set('page', '1');
    setSearchParams(n);
  };

  const exportCsv = async () => {
    const q = new URLSearchParams();
    if (search) q.set('search', search);
    if (country) q.set('country', country);
    if (status) q.set('status', status);
    if (sourceType) q.set('sourceType', sourceType);
    const apiBase = import.meta.env.VITE_API_URL ?? '';
    const t = getAdminToken();
    const res = await fetch(`${apiBase}/api/admin/enquiries/export/csv?${q}`, {
      headers: t ? { Authorization: `Bearer ${t}` } : {},
    });
    if (!res.ok) {
      toast.error('Export failed');
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'enquiries.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Enquiries</h2>
          <p className="text-gray-500 text-sm">Search and manage leads</p>
        </div>
        <button
          type="button"
          onClick={exportCsv}
          className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-sm font-medium hover:bg-gray-50"
        >
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        <input
          placeholder="Search name, phone, ID…"
          className="border rounded-lg px-3 py-2 text-sm"
          defaultValue={search}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setFilter('search', (e.target as HTMLInputElement).value);
          }}
        />
        <input
          placeholder="Country"
          className="border rounded-lg px-3 py-2 text-sm"
          value={country}
          onChange={(e) => setFilter('country', e.target.value)}
        />
        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={status}
          onChange={(e) => setFilter('status', e.target.value)}
        >
          <option value="">All statuses</option>
          {['new', 'contacted', 'in_progress', 'quoted', 'won', 'lost', 'archived'].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={sourceType}
          onChange={(e) => setFilter('sourceType', e.target.value)}
        >
          <option value="">All sources</option>
          <option value="contact_form">Contact form</option>
          <option value="product_modal">Product modal</option>
          <option value="inquiry_list">Inquiry list</option>
        </select>
        <button
          type="button"
          className="rounded-lg bg-emerald-800 text-white text-sm font-medium py-2"
          onClick={() => setSearchParams(new URLSearchParams())}
        >
          Clear filters
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Enquiry ID</th>
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
                  <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
                    Loading…
                  </td>
                </tr>
              ) : null}
              {!loading &&
                data?.items.map((e) => (
                <tr key={e._id} className="border-t border-gray-100 hover:bg-gray-50/80">
                  <td className="px-4 py-3 font-mono text-xs">
                    <Link to={`/admin/enquiries/${e._id}`} className="text-orange-600 font-semibold hover:underline">
                      {e.enquiryId}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{e.customerName}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{e.phone}</td>
                  <td className="px-4 py-3">{e.country || '—'}</td>
                  <td className="px-4 py-3 max-w-[180px] truncate" title={productSummary(e.products)}>
                    {productSummary(e.products)}
                  </td>
                  <td className="px-4 py-3 capitalize">{e.sourceType?.replace(/_/g, ' ')}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex px-2 py-0.5 rounded-full bg-gray-100 text-xs">{e.status}</span>
                  </td>
                  <td className="px-4 py-3">{e.priority}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">{new Date(e.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <a
                      href={waUrl(e.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-green-700 hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" /> WA
                    </a>
                  </td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
        {data && data.pages > 1 ? (
          <div className="flex justify-between items-center px-4 py-3 border-t border-gray-100 text-sm">
            <span className="text-gray-500">
              Page {data.page} of {data.pages} ({data.total} total)
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1}
                className="px-3 py-1 rounded border disabled:opacity-40"
                onClick={() => setSearchParams((p) => {
                  const n = new URLSearchParams(p);
                  n.set('page', String(page - 1));
                  return n;
                })}
              >
                Prev
              </button>
              <button
                type="button"
                disabled={page >= data.pages}
                className="px-3 py-1 rounded border disabled:opacity-40"
                onClick={() => setSearchParams((p) => {
                  const n = new URLSearchParams(p);
                  n.set('page', String(page + 1));
                  return n;
                })}
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
