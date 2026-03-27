import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-ivory-50 border border-ivory-200 rounded-[20px] p-8 shadow-md transition-shadow hover:shadow-xl ${className}`}
      style={{
        backgroundImage: 'radial-gradient(circle at top left, rgba(255 255 255 / 0.5), transparent)',
      }}
    >
      {children}
    </div>
  );
};

export default Card;
