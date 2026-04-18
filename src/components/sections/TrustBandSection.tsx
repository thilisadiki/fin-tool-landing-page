import { Calculator, BadgeCheck, Landmark, Lock } from 'lucide-react';
import Section from '@/components/ui/Section';

const stats = [
  {
    icon: Calculator,
    value: '6',
    label: 'Free SA calculators',
  },
  {
    icon: BadgeCheck,
    value: 'SARS',
    label: 'Tax professional reviewed',
  },
  {
    icon: Landmark,
    value: 'SARS, SARB, NCR',
    label: 'Current official data',
  },
  {
    icon: Lock,
    value: '100%',
    label: 'Private, no sign-up',
  },
];

const TrustBandSection = () => {
  return (
    <Section maxWidth="max-w-6xl">
      <div className="dark:bg-slate-800/50 bg-slate-100 rounded-2xl border border-border p-8 md:p-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-[#C9A84C]/15 to-[#0F2744]/15 rounded-xl flex items-center justify-center mb-3">
                <stat.icon className="w-6 h-6 text-[#C9A84C]" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default TrustBandSection;
