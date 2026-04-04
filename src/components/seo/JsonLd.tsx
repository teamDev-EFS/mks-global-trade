import React from 'react';
import { Helmet } from 'react-helmet-async';
import type { Product } from '../../types';
import { absoluteUrl, BRAND, getSiteUrl } from '../../seo/siteConfig';
import type { FaqItem } from '../../seo/productSeo';

function JsonLdScript({ id, data }: { id: string; data: unknown }) {
  return (
    <Helmet>
      <script id={id} type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
}

export function OrganizationJsonLd() {
  const site = getSiteUrl();
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site}/#organization`,
    name: BRAND.name,
    legalName: BRAND.legalName,
    description: BRAND.description,
    url: site,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(BRAND.logoPath),
      width: 512,
      height: 512,
    },
    image: absoluteUrl(BRAND.logoPath),
    email: BRAND.email,
    telephone: BRAND.phone,
    foundingDate: '2016',
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 10, maxValue: 50 },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Vijaynagar',
      addressLocality: 'Indore',
      addressRegion: 'Madhya Pradesh',
      postalCode: '452010',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 22.7196,
      longitude: 75.8577,
    },
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Saudi Arabia' },
      { '@type': 'Country', name: 'Qatar' },
      { '@type': 'Country', name: 'Oman' },
      { '@type': 'Country', name: 'Kuwait' },
      { '@type': 'Country', name: 'Bahrain' },
    ],
    knowsAbout: [
      'Agricultural exports from India',
      'Organic vermicompost',
      'Indian spices export',
      'Jaggery and natural sweeteners',
      'Bulk agricultural commodity trading',
      'Export logistics and supply chain management',
      'Food safety and quality control',
    ],
    industry: 'Agricultural Export & Trading',
    sameAs: BRAND.sameAs.length ? BRAND.sameAs : undefined,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BRAND.phone,
        contactType: 'sales',
        email: BRAND.email,
        availableLanguage: ['English', 'Hindi'],
        areaServed: ['IN', 'AE', 'SA', 'QA', 'OM', 'KW', 'BH'],
      },
    ],
  };
  return <JsonLdScript id="ld-org" data={data} />;
}

export function WebSiteJsonLd() {
  const site = getSiteUrl();
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site}/#website`,
    name: BRAND.name,
    url: site,
    description: BRAND.description,
    publisher: { '@id': `${site}/#organization` },
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site}/products?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
  return <JsonLdScript id="ld-website" data={data} />;
}

export function ProductJsonLd({ product }: { product: Product }) {
  const url = absoluteUrl(`/products/${product.slug}`);
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image ? [product.image] : [absoluteUrl(BRAND.logoPath)],
    category: product.category,
    brand: { '@type': 'Brand', name: BRAND.name },
    manufacturer: { '@id': `${getSiteUrl()}/#organization` },
    countryOfOrigin: { '@type': 'Country', name: 'India' },
    material: product.category,
    offers: {
      '@type': 'Offer',
      availability:
        product.availability === 'In Stock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
      priceCurrency: 'USD',
      price: '0',
      priceValidUntil: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0],
      seller: { '@id': `${getSiteUrl()}/#organization` },
      url,
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: ['AE', 'SA', 'QA', 'OM', 'KW', 'BH', 'IN'],
        },
      },
    },
    additionalProperty: product.highlights.map((h) => ({
      '@type': 'PropertyValue',
      name: 'Feature',
      value: h,
    })),
  };
  return <JsonLdScript id="ld-product" data={data} />;
}

export function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  if (!faqs.length) return null;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
  return <JsonLdScript id="ld-faq" data={data} />;
}

export function ContactPageJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact MSK Global Trade',
    url: absoluteUrl('/contact'),
    mainEntity: {
      '@type': 'Organization',
      name: BRAND.name,
      email: BRAND.email,
      telephone: BRAND.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Vijaynagar',
        addressLocality: 'Indore',
        addressRegion: 'Madhya Pradesh',
        postalCode: '452010',
        addressCountry: 'IN',
      },
      areaServed: BRAND.areaServed,
    },
  };
  return <JsonLdScript id="ld-contact" data={data} />;
}

export function ArticleJsonLd({
  title,
  description,
  urlPath,
  datePublished,
  imageUrl,
}: {
  title: string;
  description: string;
  urlPath: string;
  datePublished: string;
  imageUrl?: string;
}) {
  const url = absoluteUrl(urlPath);
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    author: { '@id': `${getSiteUrl()}/#organization` },
    publisher: {
      '@type': 'Organization',
      name: BRAND.name,
      logo: { '@type': 'ImageObject', url: absoluteUrl(BRAND.logoPath) },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: imageUrl ? [imageUrl] : [absoluteUrl(BRAND.logoPath)],
    inLanguage: 'en',
  };
  return <JsonLdScript id="ld-article" data={data} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
  return <JsonLdScript id="ld-breadcrumb" data={data} />;
}

/** Local Business schema — enhances Google Maps & local search visibility */
export function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${getSiteUrl()}/#localbusiness`,
    name: BRAND.name,
    description: BRAND.description,
    url: getSiteUrl(),
    telephone: BRAND.phone,
    email: BRAND.email,
    image: absoluteUrl(BRAND.logoPath),
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Vijaynagar',
      addressLocality: 'Indore',
      addressRegion: 'Madhya Pradesh',
      postalCode: '452010',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 22.7196,
      longitude: 75.8577,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: BRAND.sameAs,
  };
  return <JsonLdScript id="ld-localbusiness" data={data} />;
}
