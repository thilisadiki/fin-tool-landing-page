import Link from 'next/link';
import Section from '@/components/ui/Section';

const CtaSection = () => {
  return (
    <Section className="pb-20">
      <div className="relative overflow-hidden rounded-[28px] bg-[#0F2744] px-8 py-16 text-center md:px-12 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full blur-[60px]"
          style={{
            background:
              'radial-gradient(circle, rgba(201,168,76,0.15), transparent 70%)',
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-16 h-[300px] w-[300px] rounded-full blur-[60px]"
          style={{
            background:
              'radial-gradient(circle, rgba(30,58,95,0.4), transparent 70%)',
          }}
        />
        <div className="relative z-10">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#C9A84C]/15 px-3 py-[5px] text-xs font-bold uppercase tracking-wider text-[#C9A84C]">
            Get started
          </div>
          <h2 className="mb-3.5 text-[clamp(24px,3vw,40px)] font-extrabold leading-tight tracking-tight text-white">
            Ready to take control of
            <br />
            your finances?
          </h2>
          <p className="mx-auto mb-8 max-w-[480px] text-[17px] text-white/65">
            Explore free calculators and guides tailored for South Africa. No sign-up. No cost. No data stored.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators"
              className="inline-flex items-center gap-2 rounded-xl bg-[#C9A84C] px-7 py-3.5 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#B8943E] hover:shadow-[0_8px_24px_rgba(201,168,76,0.4)]"
            >
              Explore All Calculators
            </Link>
            <Link
              href="/calculators/sars-income-tax-calculator"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-transparent px-7 py-3.5 text-base font-semibold text-white/80 transition-colors hover:bg-white/5"
            >
              Try SARS Tax Calculator
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CtaSection;
