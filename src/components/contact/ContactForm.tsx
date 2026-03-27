import React from 'react';
import { useInquiryForm } from '../../hooks/useInquiryForm';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';

const ContactForm: React.FC = () => {
  const { formData, handleChange, handleSubmit, submitting, submitError, fieldErrors } = useInquiryForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Input
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={fieldErrors.name}
        autoComplete="name"
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={fieldErrors.email}
        autoComplete="email"
        inputMode="email"
      />
      <Input
        label="Phone"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        error={fieldErrors.phone}
        autoComplete="tel"
        inputMode="tel"
      />
      <Select
        label="Product"
        name="product"
        value={formData.product}
        options={[
          { value: '', label: 'Select a product' },
          { value: 'vermicompost', label: 'Vermicompost' },
          { value: 'jaggery', label: 'Jaggery' },
          { value: 'onion', label: 'Onion' },
          { value: 'coriander', label: 'Coriander' },
          { value: 'fullers-earth', label: 'Fuller’s Earth' },
        ]}
        onChange={handleChange}
        error={fieldErrors.product}
      />
      <Input
        label="Quantity"
        name="quantity"
        type="number"
        min={0}
        step="any"
        value={formData.quantity === 0 ? '' : formData.quantity}
        onChange={handleChange}
        error={fieldErrors.quantity}
      />
      <Input
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        error={fieldErrors.location}
        autoComplete="address-level1"
      />
      <Textarea
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        error={fieldErrors.message}
        maxLength={2000}
      />
      {submitError ? (
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          {submitError} Your inquiry was saved locally in this browser.
        </p>
      ) : null}
      <button
        type="submit"
        disabled={submitting}
        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primaryHover disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Sending…' : 'Send Inquiry'}
      </button>
    </form>
  );
};

export default ContactForm;