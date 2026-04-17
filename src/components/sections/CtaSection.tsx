import { Button } from '@/components/ui/button';
import Section from '@/components/ui/Section';

const CtaSection = () => {
    return (
        <Section
          className="bg-gradient-to-r from-[#0F2744] to-[#1E3A5F]"
          maxWidth="max-w-4xl"
          containerClassName="text-center"
        >
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Take Control of Your Finances?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Explore our free calculators and research-based guides to make smarter, more informed decisions about your money.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#0F2744] hover:bg-[#C9A84C] hover:text-white px-8 py-4 text-lg font-semibold transition-colors"
                >
                  <a href="/calculators">Start Calculating Now</a>
                </Button>
              </div>
            </div>
        </Section>
    );
};

export default CtaSection;
