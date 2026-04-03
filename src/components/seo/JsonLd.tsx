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
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    legalName: BRAND.legalName,
    description: BRAND.description,
    url: getSiteUrl(),
    logo: absoluteUrl(BRAND.logoPath),
    image: absoluteUrl(BRAND.logoPath),
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
    areaServed: BRAND.areaServed.map((name) => ({ '@type': 'Place', name })),
    industry: 'Agricultural export',
    sameAs: BRAND.sameAs.length ? BRAND.sameAs : undefined,
  };
  return <JsonLdScript id="ld-org" data={data} />;
}

export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.name,
    url: getSiteUrl(),
    description: BRAND.description,
    publisher: { '@type': 'Organization', name: BRAND.name, url: getSiteUrl() },
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
    image: product.image,
    category: product.category,
    brand: { '@type': 'Brand', name: BRAND.name },
    offers: {
      '@type': 'Offer',
      availability:
        product.availability === 'In Stock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
      priceCurrency: 'USD',
      seller: { '@type': 'Organization', name: BRAND.name },
      url,
    },
  };
  return <JsonLdScript id="ld-product" data={data} />;
}

export function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
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
        streetAddress: 'VijayNagar',
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
    author: { '@type': 'Organization', name: BRAND.name },
    publisher: {
      '@type': 'Organization',
      name: BRAND.name,
      logo: { '@type': 'ImageObject', url: absoluteUrl(BRAND.logoPath) },
    },
    mainEntityOfPage: url,
    image: imageUrl ? [imageUrl] : [absoluteUrl(BRAND.logoPath)],
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
