import React from 'react';
import { useInquiryForm } from '../../hooks/useInquiryForm';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';

const ContactForm: React.FC = () => {
  const { formData, handleChange, handleSubmit } = useInquiryForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Name" name="name" value={formData.name} onChange={handleChange} required />
      <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} required />
      <Select 
        label="Product" 
        name="product" 
        options={[
          { value: 'vermicompost', label: 'Vermicompost' },
          { value: 'jaggery', label: 'Jaggery' },
          { value: 'onion', label: 'Onion' },
          { value: 'coriander', label: 'Coriander' },
          { value: 'fullers-earth', label: 'Fuller’s Earth' }
        ]} 
        onChange={handleChange} 
        required 
      />
      <Input label="Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />
      <Input label="Location" name="location" value={formData.location} onChange={handleChange} required />
      <Textarea label="Message" name="message" value={formData.message} onChange={handleChange} required />
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primaryHover">Send Inquiry</button>
    </form>
  );
};

export default ContactForm;