import React from 'react';

const WhatsAppButton: React.FC = () => {
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/919232091060`, '_blank');
  };

  return (
    <button onClick={handleWhatsAppClick} className="fixed bottom-4 right-4 bg-green-600 text-white rounded-full p-3 shadow-lg hover:bg-green-700 transition-all">
      WhatsApp
    </button>
  );
};

export default WhatsAppButton;