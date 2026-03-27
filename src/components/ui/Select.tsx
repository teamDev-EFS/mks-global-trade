import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

const Select: React.FC<SelectProps> = ({ label, options, className, error, id, name, ...props }) => {
  const fieldId = id ?? (name ? `select-${name}` : undefined) ?? `select-${label.replace(/\s+/g, '-').toLowerCase()}`;
  const errorId = error ? `${fieldId}-error` : undefined;

  return (
    <div className="mb-1">
      <label htmlFor={fieldId} className="block text-sm font-semibold text-deepGreen-900 mb-2">
        {label}
      </label>
      <select
        id={fieldId}
        name={name}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={errorId}
        className={`w-full rounded-lg border bg-ivory-100 px-4 py-3 text-deepGreen-900 focus:outline-none focus:ring-2 transition-shadow shadow-inner ${
          error ? 'border-red-500 focus:ring-red-400' : 'border-ivory-300 focus:ring-deepGreen-600'
        } ${className ?? ''}`}
        {...props}
      >
        {options.map((option, idx) => (
          <option key={`${option.value}-${idx}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={errorId} role="alert" className="text-red-600 text-sm mt-1.5">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default Select;
