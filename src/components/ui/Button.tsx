import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, children, ...props }) => {
  const baseStyles = 'px-5 py-3 rounded-full font-semibold transition-all duration-200';
  const variantStyles =
    variant === 'primary'
      ? 'bg-orange-500 text-white hover:bg-orange-600 focus-visible:ring-2 focus-visible:ring-orange-400'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-gray-300';

  return (
    <button className={cn(baseStyles, variantStyles, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
