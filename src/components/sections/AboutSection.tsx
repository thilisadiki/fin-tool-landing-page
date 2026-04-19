import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import { features } from '@/data/landingPageData';

const AboutSection = () => {
  return (
    <Section
      id="about"
      className="bg-secondary/50"
      containerClassName="grid gap-12 md:grid-cols-2 md:gap-[72px] md:items-start"
    >
      <div className="animate-in fade-in slide-in-from-left-8 duration-700 fill-mode-both">
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#C9A84C]/10 px-3 py-[5px] text-xs font-bold uppercase tracking-wider text-[#C9A84C] dark:text-[#D4B96A]">
          About us
        </div>
        <h2 className="mb-4 text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15] tracking-tight text-foreground">
          More than just calculators
        </h2>
        <p className="mb-3.5 text-base leading-[1.75] text-muted-foreground">
          Quick Money Tool is a personal finance guide built for real South African situations. From understanding your SARS tax return to budgeting on a local salary, we combine free calculators with research-based guides to help you make confident decisions.
        </p>
        <p className="mb-3.5 text-base leading-[1.75] text-muted-foreground">
          Every tool and guide is reviewed by{' '}
          <Link
            href="/authors/ndulamiso-mamburu"
            className="border-b border-transparent font-semibold text-[#C9A84C] transition-colors hover:border-[#C9A84C] dark:text-[#D4B96A]"
          >
            Ndulamiso Mamburu
          </Link>
          , a qualified Tax Professional at{' '}
          <a
            href="https://www.sars.gov.za"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-transparent font-semibold text-[#C9A84C] transition-colors hover:border-[#C9A84C] dark:text-[#D4B96A]"
          >
            SARS
          </a>
          . Our content is grounded in current{' '}
          <a
            href="https://www.sars.gov.za/tax-rates/income-tax/rates-of-tax-for-individuals/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-transparent font-semibold text-[#C9A84C] transition-colors hover:border-[#C9A84C] dark:text-[#D4B96A]"
          >
            SARS tax tables
          </a>
          ,{' '}
          <a
            href="https://www.ncr.org.za"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-transparent font-semibold text-[#C9A84C] transition-colors hover:border-[#C9A84C] dark:text-[#D4B96A]"
          >
            NCR
          </a>{' '}
          regulations, and{' '}
          <a
            href="https://www.resbank.co.za"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-transparent font-semibold text-[#C9A84C] transition-colors hover:border-[#C9A84C] dark:text-[#D4B96A]"
          >
            SARB
          </a>{' '}
          data.
        </p>
        <Link
          href="/about"
          className="group mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-[#C9A84C] transition-all dark:text-[#D4B96A]"
        >
          Learn more about us
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="animate-in fade-in zoom-in-95 duration-700 fill-mode-both delay-200">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="mb-4 flex gap-4 rounded-[20px] border border-border bg-card p-5 transition-all hover:border-[#C8D4E4] hover:shadow-[0_1px_3px_rgba(13,31,53,0.06)] dark:hover:border-[#1A2E44]"
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#C9A84C]/10 text-[#C9A84C] dark:text-[#D4B96A]">
              <feature.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="mb-1 text-[15px] font-bold text-foreground">{feature.title}</div>
              <div className="text-[13px] leading-[1.55] text-muted-foreground">
                {feature.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default AboutSection;
