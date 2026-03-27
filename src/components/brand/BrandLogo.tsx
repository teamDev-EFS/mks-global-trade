import React from 'react';
import logo from '../../assets/MSK_logo.jpg';

type BrandLogoProps = {
  className?: string;
  /** Shown to screen readers when not decorative */
  alt?: string;
};

/** MSK logo — used in header, footer, and marketing sections */
const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', alt = 'MSK Global Trade' }) => (
  <img src={logo} alt={alt} className={`object-contain object-left max-w-full ${className}`} loading="eager" />
);

export default BrandLogo;
