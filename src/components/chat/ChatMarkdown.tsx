import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
const BOLD_RE = /\*\*([^*]+)\*\*/g;

function renderInline(text: string, keyBase: string): ReactNode[] {
  const parts: { type: 'text' | 'link' | 'bold'; content: string; href?: string }[] = [];
  let lastIndex = 0;

  const tokens: { start: number; end: number; type: 'link' | 'bold'; content: string; href?: string }[] = [];

  for (const match of text.matchAll(LINK_RE)) {
    if (match.index === undefined) continue;
    tokens.push({
      start: match.index,
      end: match.index + match[0].length,
      type: 'link',
      content: match[1],
      href: match[2],
    });
  }
  for (const match of text.matchAll(BOLD_RE)) {
    if (match.index === undefined) continue;
    const start = match.index;
    const end = start + match[0].length;
    if (tokens.some((t) => start < t.end && end > t.start)) continue;
    tokens.push({ start, end, type: 'bold', content: match[1] });
  }
  tokens.sort((a, b) => a.start - b.start);

  for (const token of tokens) {
    if (token.start > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, token.start) });
    }
    parts.push({ type: token.type, content: token.content, href: token.href });
    lastIndex = token.end;
  }
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return parts.map((part, i) => {
    const key = `${keyBase}-${i}`;
    if (part.type === 'link' && part.href) {
      const isInternal = part.href.startsWith('/');
      if (isInternal) {
        return (
          <Link
            key={key}
            href={part.href}
            className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]"
          >
            {part.content}
          </Link>
        );
      }
      return (
        <a
          key={key}
          href={part.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#C9A84C] dark:text-[#D4B96A] underline hover:text-[#B8943E]"
        >
          {part.content}
        </a>
      );
    }
    if (part.type === 'bold') {
      return (
        <strong key={key} className="font-semibold">
          {part.content}
        </strong>
      );
    }
    return <Fragment key={key}>{part.content}</Fragment>;
  });
}

export default function ChatMarkdown({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  const lines = text.split('\n');
  let listBuffer: string[] = [];
  let paragraphBuffer: string[] = [];

  const flushParagraph = (key: string) => {
    if (paragraphBuffer.length === 0) return;
    const joined = paragraphBuffer.join('\n');
    blocks.push(
      <p key={`p-${key}`} className="whitespace-pre-wrap">
        {renderInline(joined, `p-${key}`)}
      </p>,
    );
    paragraphBuffer = [];
  };

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return;
    const items = [...listBuffer];
    blocks.push(
      <ul key={`ul-${key}`} className="list-disc pl-5 space-y-1">
        {items.map((item, i) => (
          <li key={`li-${key}-${i}`}>{renderInline(item, `li-${key}-${i}`)}</li>
        ))}
      </ul>,
    );
    listBuffer = [];
  };

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trimEnd();
    const listMatch = line.match(/^\s*[-*]\s+(.*)$/);
    if (listMatch) {
      flushParagraph(`b${idx}`);
      listBuffer.push(listMatch[1]);
      return;
    }
    if (line.trim() === '') {
      flushList(`b${idx}`);
      flushParagraph(`b${idx}`);
      return;
    }
    flushList(`b${idx}`);
    paragraphBuffer.push(line);
  });

  flushList('end');
  flushParagraph('end');

  return <div className="space-y-2 text-sm leading-relaxed">{blocks}</div>;
}
