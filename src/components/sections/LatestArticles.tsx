import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Section from '@/components/ui/Section';
import {
  getPosts,
  getFeaturedImage,
  getAuthor,
  stripHtml,
  readingTimeMinutes,
} from '@/lib/wp';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default async function LatestArticles() {
  const { posts } = await getPosts({ perPage: 3 });
  if (posts.length === 0) return null;

  return (
    <Section id="articles" containerClassName="">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Latest from the blog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Finance guides, tax insights, and money walk-throughs written for
            South Africans.
          </p>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300 font-semibold transition-colors group"
        >
          View all articles
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post) => {
          const image = getFeaturedImage(post);
          const author = getAuthor(post);
          const readTime = readingTimeMinutes(post.content.rendered);
          const excerpt = stripHtml(post.excerpt.rendered).slice(0, 140);

          return (
            <article
              key={post.id}
              className="group rounded-2xl overflow-hidden border border-border bg-background hover:border-accent hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {image && (
                <Link
                  href={`/blog/${post.slug}`}
                  className="block relative overflow-hidden aspect-[16/9] bg-accent"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-foreground mb-3 leading-tight text-xl">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-emerald-500 transition-colors"
                  >
                    {stripHtml(post.title.rendered)}
                  </Link>
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4 flex-grow">
                  {excerpt}
                  {excerpt.length >= 140 ? '…' : ''}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto pt-4 border-t border-border">
                  {author && (
                    <span className="font-medium text-foreground">
                      {author.name}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {readTime} min
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
