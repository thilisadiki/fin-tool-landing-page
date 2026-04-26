'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChatMessage } from '@/lib/chat/types';

const STORAGE_KEY = 'qmt:chat:v1';
const STORAGE_LIMIT = 30;

function genId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `m_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function loadStored(): ChatMessage[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (m): m is ChatMessage =>
        !!m &&
        typeof m === 'object' &&
        ((m as ChatMessage).role === 'user' ||
          (m as ChatMessage).role === 'assistant') &&
        typeof (m as ChatMessage).content === 'string',
    );
  } catch {
    return [];
  }
}

function saveStored(messages: ChatMessage[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(messages.slice(-STORAGE_LIMIT)),
    );
  } catch {
    // localStorage may be unavailable (private mode, quota); silently ignore.
  }
}

export interface UseChatReturn {
  messages: ChatMessage[];
  isStreaming: boolean;
  error: string | null;
  send: (text: string) => Promise<void>;
  reset: () => void;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const hydratedRef = useRef(false);

  useEffect(() => {
    setMessages(loadStored());
    hydratedRef.current = true;
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;
    saveStored(messages);
  }, [messages]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;

      setError(null);

      const userMessage: ChatMessage = {
        id: genId(),
        role: 'user',
        content: trimmed,
        createdAt: Date.now(),
      };
      const assistantId = genId();
      const assistantPlaceholder: ChatMessage = {
        id: assistantId,
        role: 'assistant',
        content: '',
        createdAt: Date.now(),
      };

      const priorHistory = messages;
      setMessages([...priorHistory, userMessage, assistantPlaceholder]);
      setIsStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: priorHistory,
            message: trimmed,
          }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          let errMsg = 'The assistant is unavailable right now. Please try again.';
          try {
            const data = (await res.json()) as { error?: string };
            if (data?.error) errMsg = data.error;
          } catch {
            // ignore
          }
          setError(errMsg);
          setMessages((prev) => prev.filter((m) => m.id !== assistantId));
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: acc } : m,
            ),
          );
        }
        acc += decoder.decode();

        if (!acc.trim()) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    content:
                      'Sorry, I did not get a response. Please try rephrasing.',
                  }
                : m,
            ),
          );
        }
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          setMessages((prev) => prev.filter((m) => m.id !== assistantId));
        } else {
          console.error('[chat] send failed:', err);
          setError('Network error. Please check your connection and try again.');
          setMessages((prev) => prev.filter((m) => m.id !== assistantId));
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, isStreaming],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  }, []);

  return { messages, isStreaming, error, send, reset };
}
