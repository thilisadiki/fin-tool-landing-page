import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import ToolsSection from '@/components/sections/ToolsSection';
import AboutSection from '@/components/sections/AboutSection';
import LatestArticles from '@/components/sections/LatestArticles';
import FaqSection from '@/components/sections/FaqSection';
import CtaSection from '@/components/sections/CtaSection';
import { websiteSchema, faqSchema } from '@/data/schemaData';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroSection />
      <ToolsSection />
      <AboutSection />
      <LatestArticles />
      <FaqSection />
      <CtaSection />
    </>
  );
}
