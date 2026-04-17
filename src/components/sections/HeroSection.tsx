import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative px-6 py-20 overflow-hidden bg-gradient-to-br dark:from-[#070f1a] dark:via-[#0F2744] dark:to-[#070f1a] from-slate-50 via-[#eef2f7] to-[#e6ecf4]">
      <div className="max-w-7xl mx-auto text-center">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Your Personal Finance Guide for
            <span className="bg-gradient-to-r from-[#C9A84C] via-[#D4B96A] to-[#C9A84C] bg-clip-text text-transparent"> South Africa </span>
          </h1>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-150">
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Free calculators, research-based guides, and practical money advice built for real South African situations. All professionally reviewed by qualified tax and finance experts.
            </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#C9A84C] to-[#B8943E] hover:from-[#B8943E] hover:to-[#9A7A32] text-white dark:text-white px-8 py-4 text-lg"
            >
              <a href="#tools">View All Calculators</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-4 text-lg"
            >
              <a href="#about">Learn More</a>
            </Button>
          </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-[#C9A84C]/20 to-[#0F2744]/20 rounded-full blur-xl animate-pulse"
        />
        <div
          className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-[#0F2744]/20 to-[#1E3A5F]/20 rounded-full blur-xl animate-pulse"
        />
      </div>
    </section>
  );
};

export default HeroSection;
