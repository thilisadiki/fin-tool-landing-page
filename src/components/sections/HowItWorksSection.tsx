import { MousePointerClick, Calculator, BookOpen } from 'lucide-react';
import Section from '@/components/ui/Section';

const steps = [
  {
    icon: MousePointerClick,
    title: '1. Pick your calculator',
    description:
      'Choose the Quick Money Tool calculator that matches your situation: tax, vehicle finance, personal loan, retirement, budget, or currency.',
  },
  {
    icon: Calculator,
    title: '2. Enter your numbers',
    description:
      'All calculations run in your browser using the latest SA rates from SARS, SARB, and the NCR. Nothing is saved or sent to our servers.',
  },
  {
    icon: BookOpen,
    title: '3. Read the SA guide',
    description:
      'Every calculator is paired with a research-based guide and FAQs reviewed by a qualified SARS tax professional, so you understand the result.',
  },
];

const HowItWorksSection = () => {
  return (
    <Section id="how-it-works" className="bg-accent/30">
      <div className="text-center mb-14 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          How Quick Money Tool Works
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Three simple steps from question to confident answer, with no sign-up and no stored data.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="dark:bg-slate-800/50 bg-slate-100 rounded-2xl p-8 border border-border animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-14 h-14 bg-gradient-to-r from-[#C9A84C] to-[#B8943E] rounded-xl flex items-center justify-center mb-5">
              <step.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default HowItWorksSection;
