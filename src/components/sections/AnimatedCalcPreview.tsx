'use client';

import { useEffect, useState } from 'react';

export default function AnimatedCalcPreview() {
  const [salary, setSalary] = useState(0);
  const [medical, setMedical] = useState(false);
  const [results, setResults] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

    async function run() {
      while (!cancelled) {
        setSalary(0);
        setMedical(false);
        setResults(false);
        setTyping(false);
        await delay(900);
        setTyping(true);
        const target = 450000;
        const dur = 1800;
        const fps = 60;
        for (let i = 1; i <= fps; i++) {
          if (cancelled) return;
          const ease = 1 - Math.pow(1 - i / fps, 2);
          setSalary(Math.round(target * ease));
          await delay(dur / fps);
        }
        setSalary(450000);
        setTyping(false);
        await delay(500);
        setMedical(true);
        await delay(700);
        setResults(true);
        await delay(4500);
        setResults(false);
        await delay(700);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[380px] rounded-[28px] border border-border bg-card p-7 pb-20 shadow-[0_12px_48px_rgba(13,31,53,0.12)] dark:shadow-[0_12px_48px_rgba(0,0,0,0.45)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
        <div className="absolute inset-y-0 left-[-100%] w-3/5 animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
      <div className="mb-6 flex items-center justify-between">
        <span className="text-[15px] font-bold text-foreground">SARS Tax Calculator</span>
        <span className="rounded-full bg-[#C9A84C]/10 px-[9px] py-[3px] text-[11px] font-bold tracking-wider text-[#C9A84C] dark:text-[#D4B96A]">
          2026/27
        </span>
      </div>

      <div className="mb-[18px]">
        <div className="mb-[7px] text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
          Annual Income
        </div>
        <div
          className={`flex items-center gap-1 rounded-xl border-[1.5px] bg-secondary px-4 py-3 text-[20px] font-bold text-foreground transition-colors ${
            typing ? 'border-[#C9A84C]' : 'border-border'
          }`}
        >
          <span className="mr-0.5 text-[16px] font-medium text-muted-foreground">R</span>
          <span>{salary.toLocaleString('en-ZA')}</span>
          {typing && (
            <span className="ml-0.5 inline-block h-5 w-0.5 animate-[blink_1s_infinite] bg-[#C9A84C]" />
          )}
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <span className="text-[13px] font-medium text-muted-foreground">Medical Aid Credits</span>
        <button
          className={`relative h-[22px] w-10 flex-shrink-0 rounded-full border-none transition-colors ${
            medical ? 'bg-[#C9A84C]' : 'bg-border'
          }`}
          onClick={() => setMedical((m) => !m)}
          aria-label="Toggle medical aid"
          type="button"
        >
          <span
            className={`absolute top-[3px] left-[3px] h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
              medical ? 'translate-x-[18px]' : ''
            }`}
          />
        </button>
      </div>

      <div className="my-[18px] h-px bg-border" />

      <div
        className={`transition-all duration-500 ${
          results ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between border-b border-border py-2">
          <span className="text-[13px] text-muted-foreground">Monthly Tax</span>
          <span className="text-base font-bold text-foreground">R 8,142</span>
        </div>
        <div className="flex items-center justify-between border-b border-border py-2">
          <span className="text-[13px] text-muted-foreground">Effective Rate</span>
          <span className="text-base font-bold text-[#C9A84C] dark:text-[#D4B96A]">21.7%</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-[13px] text-muted-foreground">Net Monthly Pay</span>
          <span className="text-xl font-bold text-foreground">R 28,358</span>
        </div>
      </div>

      <button
        type="button"
        className="mt-5 w-full rounded-xl border-none bg-[#0F2744] px-4 py-[11px] text-center text-sm font-semibold text-white transition-colors hover:bg-[#1E3A5F] dark:bg-[#C9A84C] dark:hover:bg-[#B8943E]"
      >
        Try Full Calculator →
      </button>

      {results && (
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-xl border border-border bg-card px-4 py-[10px] text-[13px] font-semibold text-foreground shadow-[0_4px_20px_rgba(13,31,53,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
          <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#22C55E]" />
          Browser-only, no data stored
        </div>
      )}
    </div>
  );
}
