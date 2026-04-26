'use client';

import { Sparkles } from 'lucide-react';

const SUGGESTIONS = [
  'How is PAYE calculated in South Africa?',
  'Should I use the snowball or avalanche method to clear debt?',
  'How much should I save for retirement?',
  'Can I afford a R1.8m home on a R45k monthly salary?',
];

interface SuggestedQuestionsProps {
  onPick: (question: string) => void;
}

export default function SuggestedQuestions({ onPick }: SuggestedQuestionsProps) {
  return (
    <div className="px-4 py-6">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-[#C9A84C]" />
        <h3 className="text-sm font-semibold text-foreground">
          Try asking
        </h3>
      </div>
      <div className="space-y-2">
        {SUGGESTIONS.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => onPick(q)}
            className="w-full text-left text-sm rounded-lg border border-border dark:bg-slate-800/50 bg-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800 px-3 py-2.5 text-foreground transition-colors"
          >
            {q}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        Not financial advice. For your specific situation, talk to a registered
        financial planner.
      </p>
    </div>
  );
}
