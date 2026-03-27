import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, className, error, id, name, ...props }) => {
  const fieldId = id ?? (name ? `textarea-${name}` : undefined) ?? `textarea-${label.replace(/\s+/g, '-').toLowerCase()}`;
  const errorId = error ? `${fieldId}-error` : undefined;

  return (
    <div className="mb-1">
      <label htmlFor={fieldId} className="block text-sm font-semibold text-deepGreen-900 mb-2">
        {label}
      </label>
      <textarea
        id={fieldId}
        name={name}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={errorId}
        className={`w-full rounded-lg border bg-ivory-100 px-4 py-3 text-deepGreen-900 placeholder-deepGreen-400 focus:outline-none focus:ring-2 transition-shadow shadow-inner resize-y min-h-[100px] ${
          error ? 'border-red-500 focus:ring-red-400' : 'border-ivory-300 focus:ring-deepGreen-600'
        } ${className ?? ''}`}
        {...props}
      />
      {error ? (
        <p id={errorId} role="alert" className="text-red-600 text-sm mt-1.5">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default Textarea;
