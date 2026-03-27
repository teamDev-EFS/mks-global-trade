import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Product } from '../../types';

interface ProductEnquiryModalProps {
  product: Product | null;
  inquiryList: Product[];
  onClose: () => void;
  onSubmit: (details: {
    name: string;
    email: string;
    phone: string;
    quantity: string;
    location: string;
    message: string;
  }) => void;
}

const ProductEnquiryModal: React.FC<ProductEnquiryModalProps> = ({ product, inquiryList, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email address';
    if (!phone.trim()) newErrors.phone = 'Phone is required';
    if (!quantity.trim()) newErrors.quantity = 'Quantity is required';
    if (!location.trim()) newErrors.location = 'Location is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ name, email, phone, quantity, location, message });
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <h2 className="text-2xl font-semibold text-deepGreen-900 mb-6">
        {product ? `Enquire about ${product.name}` : 'Product Enquiry'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={errors.name ? 'border-red-500' : ''}
          required
          autoFocus
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? 'border-red-500' : ''}
          required
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

        <Input
          label="Phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={errors.phone ? 'border-red-500' : ''}
          required
        />
        {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}

        <Input
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className={errors.quantity ? 'border-red-500' : ''}
          required
        />
        {errors.quantity && <p className="text-red-600 text-sm">{errors.quantity}</p>}

        <Input
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={errors.location ? 'border-red-500' : ''}
          required
        />
        {errors.location && <p className="text-red-600 text-sm">{errors.location}</p>}

        <div className="mb-4">
          <label className="block text-sm font-semibold text-deepGreen-900 mb-2">Message (optional)</label>
          <textarea
            className="w-full rounded-lg border border-ivory-300 bg-ivory-100 px-4 py-3 text-deepGreen-900 placeholder-deepGreen-400 focus:outline-none focus:ring-2 focus:ring-deepGreen-600 transition-shadow shadow-inner resize-y"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Additional details or questions"
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Send via WhatsApp
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductEnquiryModal;
