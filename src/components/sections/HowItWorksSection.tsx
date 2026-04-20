import { MousePointerClick, Calculator, BookOpen } from 'lucide-react';
import Section from '@/components/ui/Section';

const steps = [
  {
    icon: MousePointerClick,
    title: 'Pick your calculator',
    description:
      'Choose the tool that matches your situation: tax, vehicle finance, retirement savings, personal loan, or budgeting.',
  },
  {
    icon: Calculator,
    title: 'Enter your numbers',
    description:
      'All calculations run locally in your browser using the latest SA rates from SARS, SARB, and the NCR. Nothing is stored.',
  },
  {
    icon: BookOpen,
    title: 'Read the SA guide',
    description:
      'Every result is paired with a practical, professionally reviewed guide so you understand what the numbers mean for you.',
  },
];

const HowItWorksSection = () => {
  return (
    <Section id="how-it-works" className="bg-secondary/50">
      <div className="mb-14 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#C9A84C]/10 px-3 py-[5px] text-xs font-bold uppercase tracking-wider text-[#C9A84C] dark:text-[#D4B96A]">
          How it works
        </div>
        <h2 className="mb-3.5 text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15] tracking-tight text-foreground">
          From question to confident answer
        </h2>
        <p className="mx-auto max-w-[560px] text-[17px] leading-[1.65] text-muted-foreground">
          Three steps. No sign-up. No stored data.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="rounded-[20px] border border-border bg-card p-7 shadow-[0_1px_3px_rgba(13,31,53,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C8D4E4] hover:shadow-[0_8px_32px_rgba(13,31,53,0.14)] dark:hover:border-[#1A2E44] animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl bg-[#C9A84C]/10 text-[#C9A84C] dark:text-[#D4B96A]">
                <step.icon className="h-[22px] w-[22px]" />
              </div>
              <h3 className="text-[17px] font-bold text-foreground">{step.title}</h3>
            </div>
            <p className="text-sm leading-[1.65] text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default HowItWorksSection;
