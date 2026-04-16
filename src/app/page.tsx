import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import ToolsSection from '@/components/sections/ToolsSection';
import AboutSection from '@/components/sections/AboutSection';
import FaqSection from '@/components/sections/FaqSection';
import CtaSection from '@/components/sections/CtaSection';
import { websiteSchema, faqSchema } from '@/data/schemaData';
import { buildBreadcrumbSchema } from '@/data/calculatorSchemaData';

const homeBreadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: '/' },
]);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumbSchema) }}
      />
      <HeroSection />
      <ToolsSection />
      <AboutSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
