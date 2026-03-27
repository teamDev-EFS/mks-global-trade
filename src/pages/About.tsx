import React from 'react';
import {
  Leaf,
  Target,
  Rocket,
  Globe2,
  Trophy,
  Package,
  Sprout,
  Sparkles,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';
import AnimatedTeamVisual from '../components/about/AnimatedTeamVisual';
import {
  aboutTagline,
  companyOverviewParagraphs,
  aboutVision,
  aboutMissionBullets,
  coreValues,
  whatWeDoIntro,
  whatWeDoProducts,
  whyGlobalBullets,
  competitiveAdvantages,
  qualityPackagingBullets,
  ourImpactBullets,
  futureGoals,
  leadershipTeam,
  aboutStats,
} from '../data/aboutContent';
import Seo from '../components/seo/Seo';
import { getStaticPageMeta } from '../seo/pageMeta';
import { trackWhatsAppClick } from '../lib/analytics';

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

const whatsappUrl =
  'https://wa.me/919232091060?text=' +
  encodeURIComponent(
    'Hello MSK Global Trade,\n\nI would like to inquire about your export services. Please contact me with more details.\n\nThank you.'
  );

const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; id?: string }> = ({
  title,
  icon,
  children,
  id,
}) => (
  <section id={id} className="py-8 sm:py-10 px-4 sm:px-6" aria-labelledby={id ? `${id}-title` : undefined}>
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">{icon}</span>
        <h2 id={id ? `${id}-title` : undefined} className="text-2xl md:text-3xl font-bold text-green-900">
          {title}
        </h2>
      </div>
      <div className="text-gray-700 leading-relaxed space-y-4">{children}</div>
    </div>
  </section>
);

const BulletList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-2.5">
    {items.map((item) => (
      <li key={item} className="flex gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const About: React.FC = () => {
  const meta = getStaticPageMeta('about');

  return (
    <div className="bg-[#F8F6F3] min-h-screen">
      <Seo {...meta} />
      <PageHero
        title="About MSK Global Trade"
        subtitle={aboutTagline}
        breadcrumbs={[{ label: 'About' }]}
      />

      <article className="max-w-[min(100%,1200px)] mx-auto">
        {/* Company overview */}
        <section className="py-8 sm:py-10 px-4 sm:px-6" aria-labelledby="overview-title">
          <h2 id="overview-title" className="sr-only">
            Company overview
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">Company overview</p>
            {companyOverviewParagraphs.map((p) => (
              <p key={p.slice(0, 40)} className="text-lg text-gray-800 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-6 sm:py-8 px-4 sm:px-6" aria-labelledby="vision-mission">
          <h2 id="vision-mission" className="sr-only">
            Vision and mission
          </h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
              <div className="flex items-center gap-2 mb-3 text-emerald-800">
                <Target className="w-7 h-7" aria-hidden />
                <h3 className="text-xl font-bold text-green-900">Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{aboutVision}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
              <div className="flex items-center gap-2 mb-3 text-emerald-800">
                <Rocket className="w-7 h-7" aria-hidden />
                <h3 className="text-xl font-bold text-green-900">Mission</h3>
              </div>
              <BulletList items={aboutMissionBullets} />
            </div>
          </div>
        </section>

        {/* Core values */}
        <section className="py-8 sm:py-10 px-4 sm:px-6 bg-white/60 border-y border-gray-100" aria-labelledby="values-title">
          <div className="max-w-6xl mx-auto">
            <h2 id="values-title" className="text-2xl md:text-3xl font-bold text-green-900 mb-2 text-center">
              Our core values
            </h2>
            <p className="text-center text-gray-600 text-sm mb-8 max-w-2xl mx-auto">
              Principles that guide every shipment and partnership.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {coreValues.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-xl border border-emerald-100 p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-green-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SectionCard title="What we do" icon={<Leaf className="w-6 h-6" />} id="what-we-do">
          <p>{whatWeDoIntro}</p>
          <BulletList items={whatWeDoProducts} />
        </SectionCard>

        <SectionCard title="Why our products matter globally" icon={<Globe2 className="w-6 h-6" />} id="why-global">
          <BulletList items={whyGlobalBullets} />
        </SectionCard>

        <SectionCard title="Competitive advantages" icon={<Trophy className="w-6 h-6" />} id="advantages">
          <BulletList items={competitiveAdvantages} />
        </SectionCard>

        <SectionCard title="Quality & packaging" icon={<Package className="w-6 h-6" />} id="quality">
          <BulletList items={qualityPackagingBullets} />
        </SectionCard>

        <SectionCard title="Our impact" icon={<Sprout className="w-6 h-6" />} id="impact">
          <BulletList items={ourImpactBullets} />
        </SectionCard>

        <SectionCard title="Future goals" icon={<Sparkles className="w-6 h-6" />} id="future">
          <BulletList items={futureGoals} />
        </SectionCard>

        <section className="py-8 sm:py-10 bg-white border-y border-gray-100 px-4 sm:px-6" aria-labelledby="stats-heading">
          <div className="max-w-5xl mx-auto">
            <h2 id="stats-heading" className="sr-only">
              Company statistics
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
              {aboutStats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-extrabold text-emerald-600 mb-2">{stat.value}</span>
                  <span className="text-gray-700 text-base font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-10 px-4 sm:px-6" aria-labelledby="leadership-heading">
          <div className="max-w-5xl mx-auto">
            <h2 id="leadership-heading" className="text-2xl md:text-3xl font-bold text-green-900 mb-2 text-center">
              Leadership
            </h2>
            <p className="text-center text-gray-600 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
              Experienced leadership driving quality, compliance, and reliable export execution.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
              {leadershipTeam.map((member) => (
                <div
                  key={member.name}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
                >
                  <AnimatedTeamVisual variant={member.variant} initials={initialsFromName(member.name)} />
                  <h3 className="text-lg font-semibold text-green-900 mb-1">{member.name}</h3>
                  <p className="text-emerald-700 text-sm font-medium">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-green-700 via-emerald-600 to-green-900 py-8 sm:py-10 px-4 sm:px-6" aria-labelledby="cta-heading">
          <div className="max-w-2xl mx-auto text-center">
            <h2 id="cta-heading" className="text-2xl md:text-3xl font-bold text-white mb-4">
              Let&apos;s build long-term business relationships
            </h2>
            <p className="text-white/90 mb-6">
              Reach out for quotes, product questions, or partnership discussions — we respond promptly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition-all text-lg group"
              >
                Contact us
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold bg-green-600 text-white shadow-lg hover:bg-green-700 transition-all text-lg"
                onClick={() => trackWhatsAppClick('about_cta')}
              >
                <MessageCircle className="mr-2 w-5 h-5" aria-hidden />
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
};

export default About;
