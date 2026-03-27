import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageHero from '../components/layout/PageHero';
import Seo from '../components/seo/Seo';
import { ArticleJsonLd, BreadcrumbJsonLd } from '../components/seo/JsonLd';
import { buildInsightMeta } from '../seo/pageMeta';
import { getInsightBySlug } from '../data/insightsPosts';

const InsightPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getInsightBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 bg-[#F8F6F3]">
        <Seo
          title="Article not found | MSK Global Trade"
          description="The requested article could not be found."
          keywords="MSK Global Trade"
          path="/insights"
          noindex
        />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h1>
        <Link to="/insights" className="text-orange-600 font-semibold hover:underline">
          Back to Insights
        </Link>
      </div>
    );
  }

  const meta = buildInsightMeta(post);

  return (
    <article className="bg-[#F8F6F3] min-h-screen pb-12">
      <Seo {...meta} type="article" />
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        urlPath={meta.path}
        datePublished={post.datePublished}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/insights' },
          { name: post.title, path: meta.path },
        ]}
      />

      <PageHero
        variant="gradient-map"
        title={post.title}
        subtitle={post.description}
        breadcrumbs={[
          { label: 'Insights', to: '/insights' },
          { label: post.title.slice(0, 40) + (post.title.length > 40 ? '…' : '') },
        ]}
      />

      <div className="max-w-[min(100%,720px)] mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-10">
          <p className="text-sm text-gray-500 mb-8">
            {post.datePublished} · {post.readingTime}
          </p>
          <div className="prose prose-emerald max-w-none">
            {post.paragraphs.map((p, i) => (
              <p key={i} className="text-gray-800 leading-relaxed mb-5 last:mb-0 text-base sm:text-lg">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
            >
              Enquire for bulk export
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-emerald-800 text-emerald-900 font-semibold hover:bg-emerald-50 transition-colors"
            >
              View products
            </Link>
          </div>
        </div>

        <Link
          to="/insights"
          className="inline-flex items-center gap-2 mt-8 text-emerald-900 font-medium hover:text-orange-700"
        >
          <ArrowLeft className="w-4 h-4" />
          All insights
        </Link>
      </div>
    </article>
  );
};

export default InsightPost;
