'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  tools,
  calculatorGoals,
  type CalculatorGoal,
} from '@/data/landingPageData';

type ActiveGoal = CalculatorGoal | 'all';

export default function CalculatorHubFilter() {
  const [active, setActive] = useState<ActiveGoal>('all');

  const visible = tools.filter(
    (tool) => active === 'all' || tool.goals.includes(active),
  );

  const activeGroup = calculatorGoals.find((g) => g.id === active)!;

  return (
    <>
      <div
        role="tablist"
        aria-label="Filter calculators by goal"
        className="flex flex-wrap justify-center gap-2 mb-6"
      >
        {calculatorGoals.map((group) => {
          const isActive = group.id === active;
          return (
            <button
              key={group.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(group.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                isActive
                  ? 'bg-[#0F2744] text-white border-[#0F2744] hover:bg-[#1E3A5F]'
                  : 'border-border text-muted-foreground hover:text-foreground hover:border-accent bg-background'
              }`}
            >
              {group.label}
            </button>
          );
        })}
      </div>

      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
        {activeGroup.description}
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((tool) => (
          <article
            key={tool.title}
            className="flex h-full flex-col rounded-[20px] border border-border bg-card p-7 shadow-[0_1px_3px_rgba(13,31,53,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C8D4E4] hover:shadow-[0_8px_32px_rgba(13,31,53,0.14)] dark:hover:border-[#1A2E44]"
          >
            <div className="flex-1">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl bg-[#C9A84C]/10 text-[#C9A84C] dark:text-[#D4B96A]">
                  <tool.icon className="h-[22px] w-[22px]" />
                </div>
                <h2 className="text-[17px] font-bold text-foreground">{tool.title}</h2>
              </div>
              <p className="text-sm leading-[1.65] text-muted-foreground">{tool.description}</p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {tool.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-[13px] text-muted-foreground"
                  >
                    <span className="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C9A84C]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <Link
                href={tool.url}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#0F2744] px-5 py-[9px] text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-[#1E3A5F]"
              >
                Open calculator
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
