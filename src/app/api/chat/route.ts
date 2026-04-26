import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import { buildSystemPrompt } from '@/lib/chat/systemPrompt';
import { checkRateLimit, getClientIp } from '@/lib/chat/rateLimit';
import type { ChatMessage, ChatRequestPayload } from '@/lib/chat/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MODEL_ID = 'gemini-3.1-flash-lite-preview';
const MAX_USER_MESSAGE_LENGTH = 1500;
const MAX_HISTORY_TURNS = 12;
const MAX_OUTPUT_TOKENS = 600;

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== 'object') return false;
  const m = value as Record<string, unknown>;
  return (
    (m.role === 'user' || m.role === 'assistant') &&
    typeof m.content === 'string'
  );
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'GEMINI_API_KEY is not configured on the server.' },
      { status: 500 },
    );
  }

  const ip = getClientIp(request.headers);
  const limit = checkRateLimit(ip);
  if (!limit.ok) {
    const friendly =
      limit.reason === 'day'
        ? 'Daily message limit reached. Please come back tomorrow.'
        : 'You are sending messages too quickly. Please wait a moment and try again.';
    return NextResponse.json(
      { error: friendly },
      {
        status: 429,
        headers: limit.retryAfterSeconds
          ? { 'Retry-After': String(limit.retryAfterSeconds) }
          : undefined,
      },
    );
  }

  let body: ChatRequestPayload;
  try {
    body = (await request.json()) as ChatRequestPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const userMessage = typeof body.message === 'string' ? body.message.trim() : '';
  if (!userMessage) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
  }
  if (userMessage.length > MAX_USER_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `Message is too long (max ${MAX_USER_MESSAGE_LENGTH} characters).` },
      { status: 400 },
    );
  }

  const rawHistory = Array.isArray(body.messages) ? body.messages : [];
  const history = rawHistory.filter(isChatMessage).slice(-MAX_HISTORY_TURNS);

  const contents = [
    ...history.map((m) => ({
      role: m.role === 'assistant' ? ('model' as const) : ('user' as const),
      parts: [{ text: m.content }],
    })),
    {
      role: 'user' as const,
      parts: [{ text: userMessage }],
    },
  ];

  const ai = new GoogleGenAI({ apiKey });

  let stream;
  try {
    stream = await ai.models.generateContentStream({
      model: MODEL_ID,
      contents,
      config: {
        systemInstruction: buildSystemPrompt(),
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        temperature: 0.7,
      },
    });
  } catch (err) {
    console.error('[chat] Gemini call failed:', err);
    return NextResponse.json(
      { error: 'The assistant is unavailable right now. Please try again shortly.' },
      { status: 502 },
    );
  }

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const text = chunk?.text;
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
      } catch (err) {
        console.error('[chat] streaming error:', err);
        controller.enqueue(
          encoder.encode(
            '\n\n[The assistant lost connection. Please try again.]',
          ),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Accel-Buffering': 'no',
    },
  });
}
