import React from 'react';
import ReactGA from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import ToolsSection from '@/components/sections/ToolsSection';
import AboutSection from '@/components/sections/AboutSection';
import FaqSection from '@/components/sections/FaqSection';
import CtaSection from '@/components/sections/CtaSection';
import Footer from '@/components/sections/Footer';
import { websiteSchema, faqSchema } from '@/data/schemaData';

// G4A Measurement ID
const GA_MEASUREMENT_ID = 'G-42NMWE8582'; 

ReactGA.initialize(GA_MEASUREMENT_ID);

function App() {
  return (
    <>
      <Helmet>
        <title>Quick Money Tool | Free Financial Calculators for South Africa</title>
        <meta name="description" content="Free, accurate financial calculators for South Africa. Simplify your SARS income tax, vehicle finance, and retirement savings planning with our easy-to-use online tools." />
        <meta name="keywords" content="financial calculator south africa, sars tax calculator, paye calculator, vehicle finance calculator, retirement savings calculator, car payment calculator, income tax calculator, retirement annuity, free financial tools, personal loan calculator" />
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      
      <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
        <Toaster />
        <Header />
        <main>
          <HeroSection />
          <ToolsSection />
          <AboutSection />
          <FaqSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;