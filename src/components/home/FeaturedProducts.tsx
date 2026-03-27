import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Package } from 'lucide-react';
import { products } from '../../data/products';
import { productImageAlt } from '../../seo/pageMeta';

const FeaturedProducts: React.FC = () => {
  const featured = products.slice(0, 6);

  return (
    <section
      id="products-section"
      className="relative py-16 sm:py-20 md:py-24"
      aria-labelledby="featured-products-heading"
    >
      <div className="relative rounded-2xl border border-stone-200/60 bg-gradient-to-b from-white via-[#FAF7F2]/30 to-white px-4 py-12 shadow-[0_2px_24px_-8px_rgba(15,61,46,0.06)] sm:px-8 sm:py-14 md:px-10 md:py-16">
        <div className="mx-auto max-w-[min(100%,1280px)]">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-12"
          >
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 mb-3">
                Export Catalogue
              </span>
              <h2
                id="featured-products-heading"
                className="text-3xl font-bold tracking-tight text-[#0F3D2E] sm:text-4xl md:text-[2.75rem]"
              >
                Featured Products
              </h2>
              <p className="mt-3 max-w-xl text-base text-stone-500 sm:text-lg">
                Browse export-grade lines with clear packing, variants, and bulk availability.
              </p>
            </div>
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 self-start text-sm font-bold text-emerald-700 hover:text-[#0F3D2E] transition-colors sm:self-auto"
            >
              View full catalogue
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </motion.div>

          {/* Product grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {featured.map((product, i) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/60 bg-white shadow-[0_2px_20px_-8px_rgba(15,61,46,0.08)] transition-all duration-500 hover:-translate-y-1 hover:border-emerald-200/60 hover:shadow-[0_12px_48px_-12px_rgba(15,61,46,0.18)]"
              >
                <Link to={`/products/${product.slug}`} className="relative block overflow-hidden">
                  <div className="aspect-[16/11] w-full overflow-hidden bg-stone-100">
                    <img
                      src={product.image}
                      alt={productImageAlt(product)}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                    {product.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-[#0F3D2E]/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white/90 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-600">
                    <Package className="h-3.5 w-3.5" aria-hidden />
                    {product.category}
                  </div>
                  <h3 className="text-xl font-bold leading-snug text-[#0F3D2E] sm:text-2xl">
                    <Link
                      to={`/products/${product.slug}`}
                      className="transition-colors hover:text-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                    >
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-500">{product.shortDescription}</p>

                  <ul className="mt-4 space-y-2 border-t border-stone-100 pt-4">
                    {product.highlights.slice(0, 3).map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-stone-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                      to="/contact"
                      className="inline-flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-[#0F3D2E] to-[#1a5c3f] px-5 py-3 text-center text-sm font-bold text-white shadow-md shadow-emerald-900/10 transition-all hover:shadow-lg"
                    >
                      Enquire Now
                    </Link>
                    <Link
                      to={`/products/${product.slug}`}
                      className="inline-flex flex-1 items-center justify-center rounded-xl border border-stone-200/80 px-5 py-3 text-center text-sm font-bold text-[#0F3D2E] transition-all hover:border-emerald-200 hover:bg-emerald-50/50"
                    >
                      Product Details
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
