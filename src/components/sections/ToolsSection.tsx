'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import { tools, calculatorGoals, type CalculatorGoal } from '@/data/landingPageData';

type FilterId = CalculatorGoal | 'all';

const ToolsSection = () => {
  const [active, setActive] = useState<FilterId>('all');

  const filtered = useMemo(() => {
    if (active === 'all') return tools;
    return tools.filter((t) => t.goals.includes(active));
  }, [active]);

  return (
    <Section id="tools">
      <div className="mb-14 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#C9A84C]/10 px-3 py-[5px] text-xs font-bold uppercase tracking-wider text-[#C9A84C] dark:text-[#D4B96A]">
          Free tools
        </div>
        <h2 className="mb-3.5 text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15] tracking-tight text-foreground">
          Six calculators built for SA
        </h2>
        <p className="max-w-[560px] text-[17px] leading-[1.65] text-muted-foreground">
          Every tool is free, private, and uses the latest official South African data.
        </p>
      </div>

      <div className="mb-10 flex flex-wrap gap-2">
        {calculatorGoals.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setActive(g.id)}
            className={`rounded-full border-[1.5px] px-4 py-[7px] text-[13px] font-semibold transition-all ${
              active === g.id
                ? 'border-[#0F2744] bg-[#0F2744] text-white dark:border-[#C9A84C] dark:bg-[#C9A84C]'
                : 'border-border bg-transparent text-muted-foreground hover:border-[#C8D4E4] hover:text-foreground dark:hover:border-[#1A2E44]'
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => (
          <article
            key={tool.title}
            className="flex h-full flex-col rounded-[20px] border border-border bg-card p-7 shadow-[0_1px_3px_rgba(13,31,53,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C8D4E4] hover:shadow-[0_8px_32px_rgba(13,31,53,0.14)] dark:hover:border-[#1A2E44]"
          >
            <div className="flex-1">
              <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-[#C9A84C]/10 text-[#C9A84C] dark:text-[#D4B96A]">
                <tool.icon className="h-[22px] w-[22px]" />
              </div>
              <h3 className="mb-2 text-[17px] font-bold text-foreground">{tool.title}</h3>
              <p className="text-sm leading-[1.65] text-muted-foreground">{tool.description}</p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {tool.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-[13px] text-muted-foreground"
                  >
                    <span className="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C9A84C]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-5">
              {tool.isInternal ? (
                <Link
                  href={tool.url}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#0F2744] px-5 py-[9px] text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-[#1E3A5F]"
                >
                  Open Calculator
                </Link>
              ) : (
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#0F2744] px-5 py-[9px] text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-[#1E3A5F]"
                >
                  Open Calculator
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};

export default ToolsSection;
