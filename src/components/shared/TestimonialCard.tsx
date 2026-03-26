import React from 'react';
import { Testimonial } from '../../types';

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center border border-gray-100">
      <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full mb-3" />
      <p className="text-gray-700 mb-2">“{testimonial.feedback}”</p>
      <div className="font-semibold text-green-900">{testimonial.name}</div>
    </div>
  );
};

export default TestimonialCard;
