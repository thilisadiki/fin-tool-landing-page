'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
                  ? 'bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600'
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visible.map((tool) => (
          <article key={tool.title} className="group">
            <div className="dark:bg-slate-800/50 bg-slate-100 backdrop-blur-lg rounded-2xl p-8 border border-border hover:border-accent hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">
              <div
                className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <tool.icon className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-4">
                {tool.title}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                {tool.description}
              </p>

              <ul className="space-y-2 mb-8">
                {tool.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-muted-foreground"
                  >
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`w-full mt-auto bg-gradient-to-r ${tool.color} hover:opacity-90 text-white dark:text-white`}
              >
                <Link href={tool.url}>
                  Open calculator
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
