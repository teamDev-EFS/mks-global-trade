import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useWhatsApp } from './useWhatsApp';

export const useInquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    product: '',
    quantity: 0,
    location: '',
    message: '',
  });
  const addInquiry = useStore((state) => state.addInquiry);
  const sendWhatsApp = useWhatsApp();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry({ ...formData, id: Date.now().toString() });
    sendWhatsApp(formData.name, formData.product, formData.quantity, formData.location, formData.message);
  };

  return { formData, handleChange, handleSubmit };
};