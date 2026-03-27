import { useState } from 'react';
import { toast } from 'react-toastify';
import { useStore } from '../store/useStore';
import { useWhatsApp } from './useWhatsApp';
import { validateContactFormFields } from '../lib/formValidation';
import { submitPublicEnquiry } from '../lib/publicEnquiryApi';

export const useInquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    quantity: 0,
    location: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<string, string>>>({});
  const addInquiry = useStore((state) => state.addInquiry);
  const sendWhatsApp = useWhatsApp();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
    if (name === 'quantity') {
      setFormData((prev) => ({ ...prev, [name]: value === '' ? 0 : Number(value) }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const qtyStr = formData.quantity ? String(formData.quantity) : '';
    const validation = validateContactFormFields({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      product: formData.product,
      quantity: qtyStr,
      location: formData.location,
      message: formData.message,
    });
    if (Object.keys(validation).length > 0) {
      setFieldErrors(validation);
      const first = document.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }
    setFieldErrors({});

    setSubmitting(true);
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      product: formData.product,
      quantity: Number(formData.quantity),
      location: formData.location.trim(),
      message: formData.message.trim(),
    };

    try {
      const res = await submitPublicEnquiry({
        sourceType: 'contact_form',
        customerName: payload.name,
        email: payload.email,
        phone: payload.phone,
        whatsappNumber: payload.phone,
        location: payload.location,
        message: payload.message,
        products: [
          {
            productName: payload.product,
            category: '',
            variant: '',
            quantity: payload.quantity,
          },
        ],
      });
      toast.success(`Enquiry submitted — reference ${res.enquiryId}`);
      addInquiry({ ...payload, id: res.id });
      sendWhatsApp(
        formData.name,
        formData.product,
        formData.quantity || 0,
        formData.location,
        formData.message
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not save enquiry';
      setSubmitError(message);
      toast.error(message);
      addInquiry({ ...payload, id: Date.now().toString() });
    } finally {
      setSubmitting(false);
    }
  };

  return { formData, handleChange, handleSubmit, submitting, submitError, fieldErrors };
};
