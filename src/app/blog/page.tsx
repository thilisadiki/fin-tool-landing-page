import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Calendar, Clock } from 'lucide-react';
import Section from '@/components/ui/Section';
import {
  getPosts,
  getFeaturedImage,
  getAuthor,
  getCategories,
  stripHtml,
  readingTimeMinutes,
  type WPPost,
} from '@/lib/wp';

export const revalidate = 300;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.quickmoneytool.com';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function PostCard({ post, featured = false }: { post: WPPost; featured?: boolean }) {
  const image = getFeaturedImage(post);
  const author = getAuthor(post);
  const categories = getCategories(post);
  const excerpt = stripHtml(post.excerpt.rendered).slice(0, featured ? 220 : 140);
  const href = `/blog/${post.slug}`;
  const readTime = readingTimeMinutes(post.content.rendered);

  return (
    <article
      className={`group rounded-2xl overflow-hidden border border-border bg-background hover:border-accent hover:-translate-y-1 transition-all duration-300 flex flex-col ${
        featured ? 'md:col-span-2 md:grid md:grid-cols-2 md:gap-0' : ''
      }`}
    >
      {image && (
        <Link href={href} className="block relative overflow-hidden aspect-[16/9] bg-accent">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={featured ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority={featured}
          />
        </Link>
      )}
      <div className="p-6 flex flex-col flex-grow">
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.slice(0, 2).map((c) => (
              <span
                key={c.id}
                className="text-xs font-semibold uppercase tracking-wide text-[#C9A84C] dark:text-[#D4B96A]"
              >
                {c.name}
              </span>
            ))}
          </div>
        )}
        <h2
          className={`font-bold text-foreground mb-3 leading-tight ${
            featured ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}
        >
          <Link href={href} className="hover:text-[#C9A84C] transition-colors">
            {stripHtml(post.title.rendered)}
          </Link>
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4 flex-grow">
          {excerpt}
          {excerpt.length >= (featured ? 220 : 140) ? '…' : ''}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto pt-4 border-t border-border">
          {author && <span className="font-medium text-foreground">{author.name}</span>}
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {readTime} min read
          </span>
        </div>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20 rounded-2xl border border-dashed border-border">
      <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        No articles yet
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto">
        We're working on our first posts. Check back soon for finance guides and
        calculator walk-throughs for South Africans.
      </p>
    </div>
  );
}

export default async function BlogIndexPage() {
  const { posts } = await getPosts({ perPage: 13 });
  const [featured, ...rest] = posts;

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Quick Money Tool Blog',
    url: `${BASE_URL}/blog`,
    description:
      'Finance, tax, and money guides for South Africans. Learn how to budget, save, invest, and plan with Quick Money Tool.',
    publisher: {
      '@type': 'Organization',
      name: 'Quick Money Tool',
      url: BASE_URL,
    },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: stripHtml(p.title.rendered),
      url: `${BASE_URL}/blog/${p.slug}`,
      datePublished: p.date_gmt,
      dateModified: p.modified_gmt,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${BASE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${BASE_URL}/blog`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="px-6 py-16 bg-gradient-to-br dark:from-[#070f1a] dark:via-[#0F2744] dark:to-[#070f1a] from-slate-50 via-[#eef2f7] to-[#e6ecf4]">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#0F2744] to-[#1E3A5F] rounded-xl flex items-center justify-center mx-auto mb-6 border border-[#C9A84C]/30">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            The Quick Money Tool Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practical finance guides, tax insights, and money walk-throughs built for
            South Africans. Written plainly, updated often.
          </p>
        </div>
      </section>

      <Section maxWidth="max-w-6xl">
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {featured && <PostCard post={featured} featured />}
            {rest.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
