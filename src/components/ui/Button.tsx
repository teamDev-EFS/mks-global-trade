import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  as?: React.ElementType;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className = '',
  children,
  as: Component = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white shadow-lg hover:from-orange-600 hover:to-orange-700 focus-visible:ring-orange-400 px-6 py-3',
    secondary: 'border border-deepGreen-700 text-deepGreen-700 bg-ivory-50 hover:bg-ivory-100 focus-visible:ring-deepGreen-600 px-5 py-2.5 shadow-sm',
    tertiary: 'text-deepGreen-700 hover:underline underline-offset-4 px-2 py-1',
  };

  return (
    <Component className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </Component>
  );
};

export default Button;
