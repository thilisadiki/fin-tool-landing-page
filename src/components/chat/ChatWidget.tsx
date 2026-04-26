'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, RefreshCcw, Sparkles, X } from 'lucide-react';
import { useChat } from '@/lib/chat/useChat';
import ChatMessages from '@/components/chat/ChatMessages';
import ChatInput from '@/components/chat/ChatInput';
import SuggestedQuestions from '@/components/chat/SuggestedQuestions';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const { messages, isStreaming, error, send, reset } = useChat();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const handlePick = (question: string) => {
    void send(question);
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.div
            key="launcher"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-5 right-5 z-50 flex items-center gap-3"
          >
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#0F2744] dark:text-white bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full shadow-lg border border-[#C9A84C]/40">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
              Ask AI
            </span>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open Quick Money Tool assistant"
              className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A84C] via-[#D4B96A] to-[#0F2744] text-white shadow-[0_10px_30px_rgba(201,168,76,0.45)] flex items-center justify-center hover:scale-110 transition-transform"
            >
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full bg-[#C9A84C]"
                animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
              <MessageCircle className="w-7 h-7 relative" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 sm:inset-auto sm:bottom-5 sm:right-5 z-50 sm:w-[380px] sm:h-[600px] sm:max-h-[calc(100vh-2.5rem)] flex flex-col bg-white dark:bg-slate-900 border border-border sm:rounded-2xl shadow-2xl overflow-hidden"
          >
            <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-gradient-to-r from-[#0F2744] to-[#1E3A5F] text-white">
              <div>
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  Quick Money Tool assistant
                  <span className="text-[10px] font-medium bg-[#C9A84C] text-[#0F2744] px-1.5 py-0.5 rounded">
                    Beta
                  </span>
                </h2>
                <p className="text-xs text-white/70">Personal finance for South Africa</p>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={reset}
                    aria-label="Start a new chat"
                    className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
                  >
                    <RefreshCcw className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            {messages.length === 0 ? (
              <div className="flex-1 overflow-y-auto">
                <div className="px-4 pt-5">
                  <div className="rounded-xl bg-gradient-to-br from-[#0F2744] to-[#1E3A5F] text-white p-4">
                    <p className="text-sm leading-relaxed">
                      Hi, I&apos;m the Quick Money Tool assistant. Ask me about SARS
                      tax, NCA-regulated credit, retirement planning, budgeting, or
                      anything else on the site.
                    </p>
                  </div>
                </div>
                <SuggestedQuestions onPick={handlePick} />
              </div>
            ) : (
              <ChatMessages messages={messages} isStreaming={isStreaming} />
            )}

            {error && (
              <div className="px-4 py-2 text-xs text-red-600 dark:text-red-400 bg-red-500/5 border-t border-red-500/20">
                {error}
              </div>
            )}

            <ChatInput onSend={send} disabled={isStreaming} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
