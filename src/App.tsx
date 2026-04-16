import { Helmet } from 'react-helmet-async';
import MainLayout from '@/layouts/MainLayout';
import HeroSection from '@/components/sections/HeroSection';
import ToolsSection from '@/components/sections/ToolsSection';
import AboutSection from '@/components/sections/AboutSection';
import FaqSection from '@/components/sections/FaqSection';
import CtaSection from '@/components/sections/CtaSection';
import { websiteSchema, faqSchema } from '@/data/schemaData';

function App() {
  return (
    <>
      <Helmet>
        <title>Quick Money Tool | Free Finance Calculators for South Africans</title>
        <meta name="description" content="Free, accurate financial calculators for South Africa. Simplify your SARS income tax, vehicle finance, and retirement savings planning with our easy-to-use online tools." />
        <meta name="keywords" content="financial calculator south africa, sars tax calculator, paye calculator, vehicle finance calculator, retirement savings calculator, car payment calculator, income tax calculator, retirement annuity, free financial tools, personal loan calculator" />
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <MainLayout>
        <HeroSection />
        <ToolsSection />
        <AboutSection />
        <FaqSection />
        <CtaSection />
      </MainLayout>
    </>
  );
}

export default App;
