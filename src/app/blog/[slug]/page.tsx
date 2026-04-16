import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import Section from '@/components/ui/Section';
import { cleanContent } from '@/lib/cleanContent';
import {
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
  getFeaturedImage,
  getAuthor,
  getCategories,
  stripHtml,
  readingTimeMinutes,
  type WPPost,
} from '@/lib/wp';

export const revalidate = 3600;
export const dynamicParams = true;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.quickmoneytool.com';

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Not Found' };

  const rm = post.rank_math ?? null;
  const plainTitle = stripHtml(post.title.rendered);
  const plainExcerpt = stripHtml(post.excerpt.rendered);
  const image = getFeaturedImage(post);

  const title = rm?.title || plainTitle;
  const description =
    rm?.description || plainExcerpt.slice(0, 160) || undefined;
  const ogTitle = rm?.og_title || title;
  const ogDescription = rm?.og_description || description;
  const ogImage = rm?.og_image || image?.src;
  const canonical = rm?.canonical || `/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      publishedTime: post.date_gmt,
      modifiedTime: post.modified_gmt,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

function RelatedPostCard({ post }: { post: WPPost }) {
  const image = getFeaturedImage(post);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-xl overflow-hidden border border-border bg-background hover:border-accent hover:-translate-y-1 transition-all duration-300"
    >
      {image && (
        <div className="relative aspect-[16/9] bg-accent overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-5">
        <h3 className="font-semibold text-foreground group-hover:text-emerald-500 transition-colors leading-snug">
          {stripHtml(post.title.rendered)}
        </h3>
        <p className="text-xs text-muted-foreground mt-2">
          {formatDate(post.date)}
        </p>
      </div>
    </Link>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const image = getFeaturedImage(post);
  const author = getAuthor(post);
  const categories = getCategories(post);
  const readTime = readingTimeMinutes(post.content.rendered);
  const cleaned = cleanContent(post.content.rendered);
  const related = await getRelatedPosts(
    categories.map((c) => c.id),
    post.id,
    3,
  );

  const canonical = post.rank_math?.canonical || `${BASE_URL}/blog/${post.slug}`;
  const authorAvatar = author?.avatar_urls?.['96'];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: stripHtml(post.title.rendered),
    description: stripHtml(post.excerpt.rendered).slice(0, 200),
    image: image?.src ? [image.src] : undefined,
    datePublished: post.date_gmt,
    dateModified: post.modified_gmt,
    author: author
      ? {
          '@type': 'Person',
          name: author.name,
          url: `${BASE_URL}/blog/author/${author.slug}`,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Quick Money Tool',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    articleSection: categories[0]?.name,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: stripHtml(post.title.rendered),
        item: canonical,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="px-6 pt-10 pb-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((c) => (
                <span
                  key={c.id}
                  className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400"
                >
                  {c.name}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            {stripHtml(post.title.rendered)}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-8">
            {author && (
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium text-foreground">{author.name}</span>
              </span>
            )}
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </span>
            {post.modified_gmt !== post.date_gmt && (
              <span className="text-xs">
                Updated {formatDate(post.modified)}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {readTime} min read
            </span>
          </div>
        </div>
      </section>

      {image && (
        <section className="px-6 mb-10">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-accent">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 900px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div
            className="wp-content"
            dangerouslySetInnerHTML={{ __html: cleaned }}
          />
        </div>
      </section>

      {author && (author.description || authorAvatar) && (
        <Section maxWidth="max-w-3xl" className="border-t border-border">
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-accent/30 border border-border">
            {authorAvatar && (
              <Image
                src={authorAvatar}
                alt={author.name}
                width={64}
                height={64}
                className="rounded-full"
              />
            )}
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                Written by
              </p>
              <p className="font-semibold text-foreground">{author.name}</p>
              {author.description && (
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {author.description}
                </p>
              )}
            </div>
          </div>
        </Section>
      )}

      {related.length > 0 && (
        <Section className="bg-accent/30" maxWidth="max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Keep reading
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((r) => (
              <RelatedPostCard key={r.id} post={r} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
