import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-lg rounded-2xl p-8 border border-gray-300 ${className} transition-transform transform hover:scale-105 hover:shadow-xl`}>      {children}
    </div>
  );
};

export default Card;
