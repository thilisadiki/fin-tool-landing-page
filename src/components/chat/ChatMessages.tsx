'use client';

import { useEffect, useRef } from 'react';
import { Bot, User } from 'lucide-react';
import type { ChatMessage } from '@/lib/chat/types';
import ChatMarkdown from '@/components/chat/ChatMarkdown';

interface ChatMessagesProps {
  messages: ChatMessage[];
  isStreaming: boolean;
}

export default function ChatMessages({ messages, isStreaming }: ChatMessagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isStreaming]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
    >
      {messages.map((msg) => {
        const isUser = msg.role === 'user';
        const isEmpty = msg.content.length === 0;
        return (
          <div
            key={msg.id}
            className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
          >
            {!isUser && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#0F2744] to-[#C9A84C] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                isUser
                  ? 'bg-[#0F2744] text-white'
                  : 'dark:bg-slate-800 bg-slate-100 text-foreground'
              }`}
            >
              {isUser ? (
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>
              ) : isEmpty ? (
                <TypingDots />
              ) : (
                <ChatMarkdown text={msg.content} />
              )}
            </div>
            {isUser && (
              <div className="w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-slate-700 dark:text-slate-200" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex gap-1 items-center py-1">
      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" />
    </div>
  );
}
