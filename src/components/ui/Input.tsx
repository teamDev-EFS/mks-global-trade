import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-deepGreen-900 mb-2">
        {label}
      </label>
      <input
        className={`w-full rounded-lg border border-ivory-300 bg-ivory-100 px-4 py-3 text-deepGreen-900 placeholder-deepGreen-400 focus:outline-none focus:ring-2 focus:ring-deepGreen-600 transition-shadow shadow-inner ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
