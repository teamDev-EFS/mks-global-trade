import React, { useState } from 'react';
import { useInquiryList } from '../../store/useInquiryList';
import { X, Trash2, MessageCircle } from 'lucide-react';

const InquiryListDrawer: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { inquiryList, removeFromInquiryList, updateInquiryItem, clearInquiryList } = useInquiryList();
  const [form, setForm] = useState({ name: '', email: '', phone: '', location: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleQtyChange = (id: string, variant: string, qty: number) => {
    updateInquiryItem(id, variant, { quantity: qty });
  };

  const handleNoteChange = (id: string, variant: string, note: string) => {
    updateInquiryItem(id, variant, { notes: note });
  };

  const handleRemove = (id: string, variant: string) => {
    removeFromInquiryList(id, variant);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Here you would send to backend or log
    setTimeout(() => {
      setSubmitting(false);
      clearInquiryList();
      onClose();
      alert('Inquiry submitted!');
    }, 1200);
  };

  const getWhatsAppUrl = () => {
    const productsText = inquiryList.map((item, idx) =>
      `${idx + 1}. ${item.product.name} - Variant: ${item.variant} - Quantity: ${item.quantity}${item.notes ? ` - Notes: ${item.notes}` : ''}`
    ).join('%0A');
    const message = `Hello MSK Global Trade,%0A%0AI would like to inquire about the following products:%0A%0A${productsText}%0A%0AMy details:%0AName: ${form.name}%0APhone: ${form.phone}%0ALocation: ${form.location}%0ARequirement: ${form.message}%0A%0APlease share quotation, MOQ, and export details.%0A%0AThank you.`;
    return `https://wa.me/919232091060?text=${message}`;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <aside className="relative ml-auto bg-white w-full max-w-md h-full shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-bold text-green-900">Inquiry List ({inquiryList.length})</h3>
          <button className="p-2 rounded hover:bg-gray-100" onClick={onClose} aria-label="X">
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {inquiryList.length === 0 ? (
            <div className="text-center text-gray-500 py-12">No products in your inquiry list.</div>
          ) : (
            <ul className="space-y-4">
              {inquiryList.map((item) => (
                <li key={item.product.id + item.variant} className="border rounded-lg p-3 flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded object-cover border" />
                    <div className="flex-1">
                      <div className="font-semibold text-green-900 text-sm">{item.product.name}</div>
                      <div className="text-xs text-gray-500">Variant: {item.variant}</div>
                    </div>
                    <button className="p-1 rounded hover:bg-red-100" onClick={() => handleRemove(item.product.id, item.variant)} aria-label="Remove">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                  <div className="flex gap-2 items-center">
                    <label className="text-xs text-gray-500">Qty:</label>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={e => handleQtyChange(item.product.id, item.variant, Number(e.target.value) || 1)}
                      className="w-16 px-2 py-1 border rounded text-xs"
                    />
                    <label className="text-xs text-gray-500 ml-2">Notes:</label>
                    <input
                      type="text"
                      value={item.notes || ''}
                      onChange={e => handleNoteChange(item.product.id, item.variant, e.target.value)}
                      className="flex-1 px-2 py-1 border rounded text-xs"
                      placeholder="Optional"
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <form className="p-4 border-t space-y-3" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input name="name" required placeholder="Name" value={form.name} onChange={handleChange} className="flex-1 px-3 py-2 border rounded" />
            <input name="email" required type="email" placeholder="Mail" value={form.email} onChange={handleChange} className="flex-1 px-3 py-2 border rounded" />
          </div>
          <div className="flex gap-2">
            <input name="phone" required placeholder="Phone" value={form.phone} onChange={handleChange} className="flex-1 px-3 py-2 border rounded" />
            <input name="location" required placeholder="Location" value={form.location} onChange={handleChange} className="flex-1 px-3 py-2 border rounded" />
          </div>
          <textarea name="message" required placeholder="Requirement / Message" value={form.message} onChange={handleChange} className="w-full px-3 py-2 border rounded" rows={2} />
          <div className="flex gap-2 mt-2">
            <button type="submit" className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-all" disabled={submitting || inquiryList.length === 0}>
              {submitting ? 'Submitting...' : 'Submit Inquiry'}
            </button>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all text-sm shadow"
              aria-label="WhatsApp Inquiry"
            >
              <MessageCircle className="w-4 h-4 mr-1" /> WhatsApp
            </a>
          </div>
        </form>
      </aside>
    </div>
  );
};

export default InquiryListDrawer;
