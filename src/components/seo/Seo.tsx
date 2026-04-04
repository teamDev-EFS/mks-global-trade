import React from 'react';
import { Helmet } from 'react-helmet-async';
import { absoluteUrl, BRAND, getSiteUrl } from '../../seo/siteConfig';

export type SeoProps = {
  title: string;
  description: string;
  keywords?: string;
  path: string;
  ogImage?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
};

const GOOGLE_VERIFY = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined;

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  keywords,
  path,
  ogImage,
  type = 'website',
  noindex = false,
}) => {
  const site = getSiteUrl();
  const canonical = absoluteUrl(path);
  const image = ogImage?.startsWith('http') ? ogImage : absoluteUrl(ogImage || BRAND.logoPath);

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={canonical} />

      {/* Robots directives */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={BRAND.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Google verification */}
      {GOOGLE_VERIFY ? <meta name="google-site-verification" content={GOOGLE_VERIFY} /> : null}

      {/* Author & Geo */}
      <meta name="author" content={BRAND.legalName} />
      <meta name="geo.region" content="IN-MP" />
      <meta name="geo.placename" content="Indore, India" />

      {/* Language alternates */}
      <link rel="alternate" hrefLang="en" href={canonical} />
      <link rel="alternate" hrefLang="en-in" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={`${site}/`} />
    </Helmet>
  );
};

export default Seo;
