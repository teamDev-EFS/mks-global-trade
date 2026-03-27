import React from 'react';
import { Users, Globe, Package, Clock, ShieldCheck, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';
import AnimatedTeamVisual from '../components/about/AnimatedTeamVisual';
import { leadershipTeam, aboutWhyChoose, aboutStats, aboutMissionVision, type AboutWhyIcon } from '../data/aboutContent';

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

const whyIcons: Record<AboutWhyIcon, React.ReactNode> = {
  globe: <Globe className="w-7 h-7 text-green-700" aria-hidden />,
  package: <Package className="w-7 h-7 text-green-700" aria-hidden />,
  shield: <ShieldCheck className="w-7 h-7 text-green-700" aria-hidden />,
  clock: <Clock className="w-7 h-7 text-green-700" aria-hidden />,
  users: <Users className="w-7 h-7 text-green-700" aria-hidden />,
};

const whatsappUrl =
  'https://wa.me/919232091060?text=' +
  encodeURIComponent(
    'Hello MSK Global Trade,\n\nI would like to inquire about your export services. Please contact me with more details.\n\nThank you.'
  );

const About: React.FC = () => {
  return (
    <div className="bg-[#F8F6F3] min-h-screen">
      <PageHero
        title="About MSK Global Trade"
        subtitle="Your trusted partner for agro and natural product exports — quality, reliability, and long-term relationships."
        breadcrumbs={[{ label: 'About' }]}
      />

      <article className="max-w-[min(100%,1200px)] mx-auto">
        <section className="py-8 sm:py-10 px-4 sm:px-6" aria-labelledby="about-intro">
          <h2 id="about-intro" className="sr-only">
            Company introduction
          </h2>
          <p className="text-lg text-gray-800 leading-relaxed text-center max-w-2xl mx-auto">
            <span className="font-semibold text-green-900">MSK Global Trade</span> is a merchant exporter specializing in
            high-quality agro and natural products. We serve global markets with a commitment to quality, reliability, and
            long-term partnerships — so every shipment reinforces trust with your buyers.
          </p>
        </section>

        <section className="py-6 sm:py-8 px-4 sm:px-6" aria-labelledby="mission-vision-heading">
          <h2 id="mission-vision-heading" className="sr-only">
            Mission and vision
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutMissionVision.map((block) => (
              <div
                key={block.title}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-8 flex flex-col items-center text-center"
              >
                <h3 className="text-xl font-bold text-green-900 mb-2">{block.title}</h3>
                <p className="text-gray-700 text-base">{block.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-8 sm:py-10 px-4 sm:px-6" aria-labelledby="why-heading">
          <div className="max-w-6xl mx-auto">
            <h2 id="why-heading" className="text-2xl md:text-3xl font-bold text-green-900 mb-6 text-center">
              Why choose MSK Global Trade?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
              {aboutWhyChoose.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center bg-white rounded-xl shadow p-6 min-h-[180px] hover:shadow-lg transition-shadow text-center border border-gray-100"
                >
                  <div className="mb-3">{whyIcons[item.icon]}</div>
                  <h3 className="font-semibold text-green-900 text-base mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

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
