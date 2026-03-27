import React from 'react';

/** Official WhatsApp brand green — solid, high-contrast actions */
export const whatsappActionBaseClass =
  'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white ' +
  'bg-[#25D366] shadow-md hover:bg-[#20BD5A] active:bg-[#1DA851] ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 ' +
  'transition-colors disabled:opacity-60 disabled:pointer-events-none';

const WhatsAppGlyph = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0 fill-current" aria-hidden>
    <path d="M16 .4C7.5.4.4 7.5.4 16c0 2.8.7 5.4 2.1 7.7L0 32l8.6-2.5c2.2 1.2 4.7 1.9 7.4 1.9 8.5 0 15.6-7.1 15.6-15.6S24.5.4 16 .4zm0 28.6c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-5.1 1.5 1.4-5-.3-.5C3.6 20.7 3 18.4 3 16 3 8.8 8.8 3 16 3s13 5.8 13 13-5.8 13-13 13zm7.2-9.8c-.4-.2-2.3-1.1-2.7-1.3-.4-.1-.7-.2-1 .2-.3.4-1.1 1.3-1.3 1.5-.2.2-.5.3-.9.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.3-2.1-2.7-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.5-.7.2-.3.1-.6 0-.8-.1-.2-1-2.4-1.4-3.3-.4-.9-.8-.8-1-.8h-.9c-.3 0-.8.1-1.2.6-.4.4-1.6 1.6-1.6 3.9s1.7 4.6 1.9 4.9c.2.3 3.4 5.1 8.2 7.1 1.1.5 2 .8 2.7 1 .9.3 1.7.3 2.3.2.7-.1 2.3-.9 2.6-1.8.3-.9.3-1.7.2-1.8-.1-.2-.4-.3-.8-.5z" />
  </svg>
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
};

/** Primary CTA: opens enquiry flow (modal) — full WhatsApp branding */
export function WhatsAppActionButton({
  children = 'WhatsApp enquiry',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={`${whatsappActionBaseClass} ${className}`} {...props}>
      <WhatsAppGlyph />
      {children}
    </button>
  );
}

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: React.ReactNode;
};

/** Same look for links that open WhatsApp directly */
export function WhatsAppActionLink({ children = 'WhatsApp', className = '', ...props }: AnchorProps) {
  return (
    <a className={`${whatsappActionBaseClass} ${className}`} {...props}>
      <WhatsAppGlyph />
      {children}
    </a>
  );
}
