import { Calculator, BadgeCheck, TrendingUp, Lock } from 'lucide-react';
import Section from '@/components/ui/Section';

const stats = [
  {
    icon: Calculator,
    value: '7',
    suffix: '',
    label: 'Free SA calculators',
  },
  {
    icon: BadgeCheck,
    value: 'SARS',
    suffix: '',
    label: 'Tax professional reviewed',
  },
  {
    icon: Lock,
    value: '100%',
    suffix: '',
    label: 'Private, no sign-up',
  },
  {
    icon: TrendingUp,
    value: '2026',
    suffix: '/27',
    label: 'Tax year data',
  },
];

const TrustBandSection = () => {
  return (
    <Section className="pt-0">
      <div className="rounded-[28px] bg-[#0F2744] px-8 py-10 md:px-12 md:py-10 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center text-white/60">
                <stat.icon className="h-7 w-7" />
              </div>
              <div className="mb-1 text-[32px] font-extrabold leading-none tracking-tight text-white">
                {stat.value}
                {stat.suffix && <span className="text-[#C9A84C]">{stat.suffix}</span>}
              </div>
              <div className="text-[13px] font-medium text-white/55">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default TrustBandSection;
