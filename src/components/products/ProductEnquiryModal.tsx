import React, { useRef, useState } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { WhatsAppActionButton } from '../ui/WhatsAppActionButton';
import { Product } from '../../types';
import { InquiryListItem } from '../../store/useInquiryList';
import { validateEnquiryForm } from '../../lib/formValidation';

interface ProductEnquiryModalProps {
  product: Product | null;
  inquiryList: InquiryListItem[];
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

const fieldOrder = ['name', 'email', 'phone', 'quantity', 'location', 'message'] as const;

const ProductEnquiryModal: React.FC<ProductEnquiryModalProps> = ({ product, inquiryList, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Partial<Record<(typeof fieldOrder)[number], string>>>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const refs: Record<string, React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>> = {
    name: nameRef,
    email: emailRef,
    phone: phoneRef,
    quantity: quantityRef,
    location: locationRef,
    message: messageRef,
  };

  const clearFieldError = (key: (typeof fieldOrder)[number]) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateEnquiryForm({ name, email, phone, quantity, location, message });
    setErrors(nextErrors);
    const firstKey = fieldOrder.find((k) => nextErrors[k]);
    if (firstKey) {
      refs[firstKey]?.current?.focus();
      return;
    }
    onSubmit({ name, email, phone, quantity, location, message });
  };

  const listSummary =
    !product && inquiryList.length > 0 ? (
      <div className="mb-4 rounded-xl border border-ivory-300 bg-ivory-100/80 px-4 py-3 text-sm text-deepGreen-900">
        <p className="font-semibold text-deepGreen-900 mb-1">Your inquiry list</p>
        <ul className="list-disc list-inside space-y-0.5 text-deepGreen-800">
          {inquiryList.map((item) => (
            <li key={`${item.product.id}-${item.variant}`}>
              {item.product.name}
              {item.variant ? ` · ${item.variant}` : ''}
            </li>
          ))}
        </ul>
      </div>
    ) : null;

  return (
    <Modal isOpen={true} onClose={onClose}>
      <h2 className="text-xl sm:text-2xl font-semibold text-deepGreen-900 mb-2 pr-8">
        {product ? `Enquire about ${product.name}` : 'Product enquiry'}
      </h2>
      {product ? (
        <p className="text-sm text-deepGreen-700 mb-4">
          {product.category} · {product.packing}
        </p>
      ) : (
        <p className="text-sm text-deepGreen-700 mb-4">
          {inquiryList.length > 0 ? 'We will include your inquiry list in the message.' : 'Tell us what you need — we will follow up on WhatsApp.'}
        </p>
      )}
      {listSummary}
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[min(70vh,560px)] overflow-y-auto pr-1" noValidate>
        <Input
          ref={nameRef}
          label="Name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            clearFieldError('name');
          }}
          error={errors.name}
        />

        <Input
          ref={emailRef}
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearFieldError('email');
          }}
          error={errors.email}
        />

        <Input
          ref={phoneRef}
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+91 98765 43210"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            clearFieldError('phone');
          }}
          error={errors.phone}
        />

        <Input
          ref={quantityRef}
          label="Quantity"
          name="quantity"
          inputMode="decimal"
          placeholder="e.g. 500 kg or 2 tons"
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
            clearFieldError('quantity');
          }}
          error={errors.quantity}
        />

        <Input
          ref={locationRef}
          label="Location / destination"
          name="location"
          autoComplete="country-name"
          placeholder="City, country"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            clearFieldError('location');
          }}
          error={errors.location}
        />

        <div className="mb-1">
          <label htmlFor="enquiry-message" className="block text-sm font-semibold text-deepGreen-900 mb-2">
            Message <span className="font-normal text-deepGreen-600">(optional)</span>
          </label>
          <textarea
            ref={messageRef}
            id="enquiry-message"
            name="message"
            rows={4}
            maxLength={2000}
            aria-invalid={errors.message ? 'true' : undefined}
            aria-describedby={errors.message ? 'enquiry-message-error' : undefined}
            className={`w-full rounded-lg border bg-ivory-100 px-4 py-3 text-deepGreen-900 placeholder-deepGreen-400 focus:outline-none focus:ring-2 transition-shadow shadow-inner resize-y min-h-[100px] ${
              errors.message ? 'border-red-500 focus:ring-red-400' : 'border-ivory-300 focus:ring-deepGreen-600'
            }`}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              clearFieldError('message');
            }}
            placeholder="Additional details or questions"
          />
          <div className="flex justify-between items-center mt-1">
            {errors.message ? (
              <p id="enquiry-message-error" role="alert" className="text-red-600 text-sm">
                {errors.message}
              </p>
            ) : (
              <span />
            )}
            <span className="text-xs text-deepGreen-600">{message.length}/2000</span>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <WhatsAppActionButton type="submit" className="sm:min-w-[200px]">
            Send via WhatsApp
          </WhatsAppActionButton>
        </div>
      </form>
    </Modal>
  );
};

export default ProductEnquiryModal;
