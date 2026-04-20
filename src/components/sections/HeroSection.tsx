import Link from 'next/link';
import AnimatedCalcPreview from '@/components/sections/AnimatedCalcPreview';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden px-7 pb-20 pt-[72px]">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute -top-52 -right-24 h-[600px] w-[600px] rounded-full opacity-50 blur-[80px]"
          style={{
            background:
              'radial-gradient(circle, rgba(201,168,76,0.08), transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-24 -left-12 h-[400px] w-[400px] rounded-full opacity-50 blur-[80px]"
          style={{
            background:
              'radial-gradient(circle, rgba(15,39,68,0.06), transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1200px] items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="text-center md:text-left animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/10 py-[5px] pl-2 pr-[14px]">
            <span className="h-[6px] w-[6px] rounded-full bg-[#C9A84C]" />
            <span className="text-xs font-semibold tracking-wide text-[#C9A84C] dark:text-[#D4B96A]">
              South Africa&apos;s Free Finance Guide
            </span>
          </div>

          <h1 className="mb-5 text-[clamp(36px,4.5vw,56px)] font-extrabold leading-[1.1] tracking-tight text-foreground">
            Smarter money decisions,
            <br />
            <span className="text-[#C9A84C] dark:text-[#D4B96A]">made in minutes.</span>
          </h1>

          <p className="mb-8 max-w-[480px] mx-auto md:mx-0 text-lg leading-[1.7] text-muted-foreground">
            Free calculators and research-based guides for real South African situations: SARS tax, vehicle finance, retirement, and more. All professionally reviewed.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Link
              href="/calculators"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#C9A84C] px-[26px] py-[13px] text-[15px] font-semibold text-white transition-all hover:-translate-y-px hover:bg-[#B8943E] hover:shadow-[0_4px_20px_rgba(13,31,53,0.08)]"
            >
              Explore Calculators
            </Link>
            <Link
              href="/calculators/sars-income-tax-calculator"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#C8D4E4] bg-transparent px-[26px] py-[13px] text-[15px] font-semibold text-foreground transition-colors hover:bg-secondary dark:border-[#1A2E44]"
            >
              SARS Tax Calculator
            </Link>
          </div>

          <div className="mt-7 flex items-center justify-center gap-2 text-[13px] text-muted-foreground md:justify-start">
            <div className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-[#C9A84C]" />
              <span className="h-2 w-2 rounded-full bg-[#C9A84C]/50" />
              <span className="h-2 w-2 rounded-full bg-[#C9A84C]/50" />
            </div>
            <span>Reviewed by a qualified SARS tax professional</span>
          </div>
        </div>

        <div className="relative z-10 hidden md:block animate-in fade-in zoom-in-95 duration-700 fill-mode-both delay-200">
          <AnimatedCalcPreview />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
