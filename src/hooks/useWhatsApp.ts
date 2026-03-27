import { useCallback } from 'react';

export const useWhatsApp = () => {
  return useCallback((name: string, product: string, quantity: number, location: string, message: string) => {
    const whatsappMessage = `Hello MSK Global Trade,\n\nI would like to inquire about the following:\n\n👤 Name: ${name}\n📦 Product: ${product}\n📊 Quantity: ${quantity}\n📍 Location: ${location}\n📝 Requirement: ${message}\n\nPlease share more details.\n\nThank you.`;
    window.open(`https://wa.me/919232091060?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  }, []);
};