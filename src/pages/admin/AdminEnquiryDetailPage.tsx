import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { adminFetch } from '../../api/adminClient';
import { toast } from 'react-toastify';
import { buildAdminFollowUpMessage, whatsappMeUrl } from '../../lib/whatsappAdmin';
import { MessageCircle } from 'lucide-react';

type Enquiry = {
  _id: string;
  enquiryId: string;
  sourceType: string;
  customerName: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  location: string;
  country: string;
  city: string;
  message: string;
  products: { productId?: string; productName?: string; category?: string; variant?: string; quantity?: unknown }[];
  status: string;
  priority: string;
  tags: string[];
  adminNotes: { _id: string; text: string; adminName?: string; createdAt: string }[];
  timeline: { type: string; description: string; adminName?: string; createdAt: string }[];
  contactedViaWhatsApp: boolean;
  contactedAt?: string;
  createdAt: string;
};

function productSummary(enquiry: Enquiry) {
  const parts = enquiry.products?.map((p) => p.productName || p.category).filter(Boolean);
  return parts?.length ? parts.join(', ') : 'your enquiry';
}

export default function AdminEnquiryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [e, setE] = useState<Enquiry | null>(null);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  const load = () => {
    if (!id) return;
    adminFetch<Enquiry>(`/api/admin/enquiries/${id}`)
      .then((data) => {
        setE(data);
        setStatus(data.status);
        setPriority(data.priority);
      })
      .catch((err) => toast.error(err instanceof Error ? err.message : 'Failed'));
  };

  useEffect(() => {
    load();
  }, [id]);

  if (!e) {
    return <div className="text-gray-500">Loading…</div>;
  }

  const saveStatus = async () => {
    try {
      await adminFetch(`/api/admin/enquiries/${e._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status, priority }),
      });
      toast.success('Updated');
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error');
    }
  };

  const addNote = async () => {
    if (!note.trim()) return;
    try {
      await adminFetch(`/api/admin/enquiries/${e._id}/notes`, {
        method: 'POST',
        body: JSON.stringify({ text: note }),
      });
      toast.success('Note added');
      setNote('');
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error');
    }
  };

  const openWhatsAppAndTrack = async () => {
    const msg = buildAdminFollowUpMessage(e.customerName, productSummary(e));
    const phone = e.whatsappNumber || e.phone;
    window.open(whatsappMeUrl(phone, msg), '_blank', 'noopener,noreferrer');
    try {
      await adminFetch(`/api/admin/enquiries/${e._id}/whatsapp-contacted`, { method: 'POST' });
      toast.success('Marked as contacted via WhatsApp');
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link to="/admin/enquiries" className="text-sm text-orange-600 hover:underline">
            ← Back to enquiries
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 mt-2 flex flex-wrap items-center gap-3">
            <span className="font-mono">{e.enquiryId}</span>
            <span className="inline-flex px-2 py-0.5 rounded-full bg-gray-100 text-sm font-normal">{e.status}</span>
            <span className="inline-flex px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-sm font-normal">{e.priority}</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">{e.customerName} · {new Date(e.createdAt).toLocaleString()}</p>
        </div>
        <button
          type="button"
          onClick={openWhatsAppAndTrack}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 shadow"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp lead
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Customer</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-gray-500">Name</dt>
                <dd className="font-medium">{e.customerName}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Email</dt>
                <dd>{e.email || '—'}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Phone</dt>
                <dd>{e.phone}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Location</dt>
                <dd>{e.location || '—'}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Country / City</dt>
                <dd>
                  {e.country || '—'} {e.city ? `· ${e.city}` : ''}
                </dd>
              </div>
            </dl>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Products</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-2">Product</th>
                    <th className="pb-2">Category</th>
                    <th className="pb-2">Variant</th>
                    <th className="pb-2">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {e.products?.length ? (
                    e.products.map((p, i) => (
                      <tr key={i} className="border-b border-gray-50">
                        <td className="py-2">{p.productName || '—'}</td>
                        <td className="py-2">{p.category || '—'}</td>
                        <td className="py-2">{p.variant || '—'}</td>
                        <td className="py-2">{String(p.quantity ?? '—')}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-2 text-gray-500">
                        No line items
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Message</h3>
            <p className="text-gray-700 whitespace-pre-wrap text-sm">{e.message || '—'}</p>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Timeline</h3>
            <ul className="space-y-3">
              {e.timeline
                ?.slice()
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((t, i) => (
                  <li key={i} className="text-sm border-l-2 border-emerald-600 pl-3">
                    <span className="text-gray-400 text-xs">{new Date(t.createdAt).toLocaleString()}</span>
                    <p className="text-gray-800">
                      <span className="font-medium capitalize">{t.type.replace(/_/g, ' ')}</span> — {t.description}
                      {t.adminName ? ` · ${t.adminName}` : ''}
                    </p>
                  </li>
                ))}
            </ul>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Update</h3>
            <label className="block text-xs text-gray-500 mb-1">Status</label>
            <select
              className="w-full border rounded-lg px-3 py-2 text-sm mb-3"
              value={status}
              onChange={(ev) => setStatus(ev.target.value)}
            >
              {['new', 'contacted', 'in_progress', 'quoted', 'won', 'lost', 'archived'].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <label className="block text-xs text-gray-500 mb-1">Priority</label>
            <select
              className="w-full border rounded-lg px-3 py-2 text-sm mb-3"
              value={priority}
              onChange={(ev) => setPriority(ev.target.value)}
            >
              {['low', 'medium', 'high'].map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <button type="button" onClick={saveStatus} className="w-full py-2 rounded-lg bg-emerald-800 text-white text-sm font-medium">
              Save changes
            </button>
            {e.contactedViaWhatsApp ? (
              <p className="text-xs text-green-700 mt-2">WhatsApp contact logged{e.contactedAt ? ` · ${new Date(e.contactedAt).toLocaleString()}` : ''}</p>
            ) : null}
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Admin notes</h3>
            <textarea
              className="w-full border rounded-lg px-3 py-2 text-sm min-h-[100px]"
              placeholder="Internal note…"
              value={note}
              onChange={(ev) => setNote(ev.target.value)}
            />
            <button type="button" onClick={addNote} className="mt-2 w-full py-2 rounded-lg bg-orange-500 text-white text-sm font-medium">
              Add note
            </button>
            <ul className="mt-4 space-y-2 max-h-48 overflow-y-auto">
              {e.adminNotes?.map((n) => (
                <li key={n._id} className="text-sm bg-gray-50 rounded-lg p-2">
                  <p>{n.text}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {n.adminName} · {new Date(n.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
