import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft, MessageCircle, Loader2 } from 'lucide-react';
import { adminFetch } from '../../api/adminClient';
import { buildAdminFollowUpMessage, whatsappMeUrl } from '../../lib/whatsappAdmin';
import {
  Card,
  CardTitle,
  StatusBadge,
  LoadingState,
  ErrorState,
  PrimaryButton,
  FilterSelect,
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
} from '../../components/admin/AdminUI';

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

function summarizeProducts(enquiry: Enquiry): string {
  const parts = enquiry.products?.map((p) => p.productName || p.category).filter(Boolean);
  return parts?.length ? parts.join(', ') : 'your enquiry';
}

const InfoField: React.FC<{ label: string; value: string | undefined }> = ({ label, value }) => (
  <div>
    <dt className="text-xs font-medium text-stone-400 uppercase tracking-wider">{label}</dt>
    <dd className="mt-0.5 text-sm font-medium text-stone-800">{value || '—'}</dd>
  </div>
);

const AdminEnquiryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [saving, setSaving] = useState(false);

  const loadEnquiry = useCallback(() => {
    if (!id) return;
    setError(null);
    adminFetch<Enquiry>(`/api/admin/enquiries/${id}`)
      .then((data) => {
        setEnquiry(data);
        setStatus(data.status);
        setPriority(data.priority);
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load'));
  }, [id]);

  useEffect(() => {
    loadEnquiry();
  }, [loadEnquiry]);

  const saveChanges = useCallback(async () => {
    if (!enquiry) return;
    setSaving(true);
    try {
      await adminFetch(`/api/admin/enquiries/${enquiry._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status, priority }),
      });
      toast.success('Updated');
      loadEnquiry();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    } finally {
      setSaving(false);
    }
  }, [enquiry, status, priority, loadEnquiry]);

  const addNote = useCallback(async () => {
    if (!enquiry || !note.trim()) return;
    try {
      await adminFetch(`/api/admin/enquiries/${enquiry._id}/notes`, {
        method: 'POST',
        body: JSON.stringify({ text: note }),
      });
      toast.success('Note added');
      setNote('');
      loadEnquiry();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    }
  }, [enquiry, note, loadEnquiry]);

  const contactViaWhatsApp = useCallback(async () => {
    if (!enquiry) return;
    const msg = buildAdminFollowUpMessage(enquiry.customerName, summarizeProducts(enquiry));
    const phone = enquiry.whatsappNumber || enquiry.phone;
    window.open(whatsappMeUrl(phone, msg), '_blank', 'noopener,noreferrer');
    try {
      await adminFetch(`/api/admin/enquiries/${enquiry._id}/whatsapp-contacted`, { method: 'POST' });
      toast.success('Marked as contacted via WhatsApp');
      loadEnquiry();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    }
  }, [enquiry, loadEnquiry]);

  if (error) return <ErrorState message={error} onRetry={loadEnquiry} />;
  if (!enquiry) return <LoadingState message="Loading enquiry..." />;

  const sortedTimeline = enquiry.timeline
    ?.slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link to="/admin/enquiries" className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-700 transition-colors mb-3">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to enquiries
          </Link>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight flex flex-wrap items-center gap-3">
            <span className="font-mono">{enquiry.enquiryId}</span>
            <StatusBadge value={enquiry.status} />
            <StatusBadge value={enquiry.priority} type="priority" />
          </h2>
          <p className="text-stone-500 text-sm mt-1">
            {enquiry.customerName} &middot; {new Date(enquiry.createdAt).toLocaleString()}
          </p>
        </div>
        <button
          type="button"
          onClick={contactViaWhatsApp}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 shadow-sm transition-colors"
        >
          <MessageCircle className="w-4.5 h-4.5" />
          WhatsApp Lead
        </button>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer info */}
          <Card>
            <CardTitle>Customer Information</CardTitle>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoField label="Name" value={enquiry.customerName} />
              <InfoField label="Email" value={enquiry.email} />
              <InfoField label="Phone" value={enquiry.phone} />
              <InfoField label="Location" value={enquiry.location} />
              <InfoField label="Country / City" value={`${enquiry.country || '—'}${enquiry.city ? ` · ${enquiry.city}` : ''}`} />
              <InfoField label="Source" value={enquiry.sourceType?.replace(/_/g, ' ')} />
            </dl>
          </Card>

          {/* Products */}
          <Card padding={false}>
            <div className="px-5 pt-5 pb-3">
              <CardTitle>Products</CardTitle>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-stone-400 text-xs uppercase tracking-wider border-b border-stone-100">
                    <th className="px-5 pb-2 font-medium">Product</th>
                    <th className="px-5 pb-2 font-medium">Category</th>
                    <th className="px-5 pb-2 font-medium">Variant</th>
                    <th className="px-5 pb-2 font-medium">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiry.products?.length ? (
                    enquiry.products.map((p, i) => (
                      <tr key={i} className="border-b border-stone-50">
                        <td className="px-5 py-2.5 text-stone-700">{p.productName || '—'}</td>
                        <td className="px-5 py-2.5 text-stone-500">{p.category || '—'}</td>
                        <td className="px-5 py-2.5 text-stone-500">{p.variant || '—'}</td>
                        <td className="px-5 py-2.5 text-stone-500">{String(p.quantity ?? '—')}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-5 py-6 text-center text-stone-400 text-sm">No line items</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Message */}
          <Card>
            <CardTitle>Message</CardTitle>
            <p className="text-stone-600 whitespace-pre-wrap text-sm leading-relaxed">
              {enquiry.message || '—'}
            </p>
          </Card>

          {/* Timeline */}
          <Card>
            <CardTitle>Timeline</CardTitle>
            {sortedTimeline?.length ? (
              <ul className="space-y-3">
                {sortedTimeline.map((t, i) => (
                  <li key={i} className="text-sm border-l-2 border-emerald-300 pl-3">
                    <span className="text-stone-400 text-xs">{new Date(t.createdAt).toLocaleString()}</span>
                    <p className="text-stone-700">
                      <span className="font-medium capitalize text-stone-900">{t.type.replace(/_/g, ' ')}</span>
                      {' — '}{t.description}
                      {t.adminName && <span className="text-stone-400"> &middot; {t.adminName}</span>}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-stone-400 text-sm">No timeline events</p>
            )}
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Update status/priority */}
          <Card>
            <CardTitle>Update</CardTitle>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-400 uppercase tracking-wider mb-1.5">Status</label>
                <FilterSelect value={status} onChange={(e) => setStatus(e.target.value)}>
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                  ))}
                </FilterSelect>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-400 uppercase tracking-wider mb-1.5">Priority</label>
                <FilterSelect value={priority} onChange={(e) => setPriority(e.target.value)}>
                  {PRIORITY_OPTIONS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </FilterSelect>
              </div>
              <PrimaryButton onClick={saveChanges} disabled={saving} className="w-full flex items-center justify-center gap-2">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                Save Changes
              </PrimaryButton>
              {enquiry.contactedViaWhatsApp && (
                <p className="text-xs text-emerald-600 mt-2">
                  WhatsApp contact logged
                  {enquiry.contactedAt && ` · ${new Date(enquiry.contactedAt).toLocaleString()}`}
                </p>
              )}
            </div>
          </Card>

          {/* Admin notes */}
          <Card>
            <CardTitle>Admin Notes</CardTitle>
            <textarea
              className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm min-h-[100px] placeholder:text-stone-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-white outline-none transition-all resize-y"
              placeholder="Internal note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <PrimaryButton onClick={addNote} className="mt-2 w-full">
              Add Note
            </PrimaryButton>
            {enquiry.adminNotes?.length > 0 && (
              <ul className="mt-4 space-y-2 max-h-48 overflow-y-auto pr-1">
                {enquiry.adminNotes.map((n) => (
                  <li key={n._id} className="text-sm bg-stone-50 rounded-lg p-3 border border-stone-100">
                    <p className="text-stone-700">{n.text}</p>
                    <p className="text-xs text-stone-400 mt-1.5">
                      {n.adminName} &middot; {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminEnquiryDetailPage;
