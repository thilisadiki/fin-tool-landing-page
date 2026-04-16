import Link from 'next/link';
import { UserCheck, Linkedin } from 'lucide-react';
import type { Author } from '@/data/authors';

interface ReviewedByProps {
  author: Author;
  dateReviewed: string;
}

function formatReviewDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export default function ReviewedBy({ author, dateReviewed }: ReviewedByProps) {
  const formatted = formatReviewDate(dateReviewed);

  return (
    <section className="px-6 py-4 border-y border-border bg-accent/30">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
        <div className="flex items-center gap-2 shrink-0">
          <UserCheck className="w-4 h-4 text-emerald-500" aria-hidden="true" />
          <span className="text-muted-foreground">Reviewed by</span>
        </div>
        <Link
          href={`/authors/${author.slug}`}
          className="font-semibold text-foreground hover:underline"
        >
          {author.name}
        </Link>
        <span className="text-muted-foreground">
          · {author.shortCredentials}, {author.affiliation.name}
        </span>
        <time
          dateTime={dateReviewed}
          className="text-muted-foreground md:ml-auto"
        >
          Last reviewed: {formatted}
        </time>
        <a
          href={author.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${author.name} on LinkedIn`}
          className="text-muted-foreground hover:text-[#0A66C2] transition-colors"
        >
          <Linkedin className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
