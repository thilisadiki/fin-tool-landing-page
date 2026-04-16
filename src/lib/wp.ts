import { cache } from 'react';

const WP_API_URL =
  process.env.WP_API_URL ?? 'https://articles.quickmoneytool.com/wp-json/wp/v2';

export interface WPRenderedField {
  rendered: string;
  protected?: boolean;
}

export interface WPRankMath {
  title: string | null;
  description: string | null;
  canonical: string | null;
  focus_keyword: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
}

export interface WPAuthor {
  id: number;
  name: string;
  slug: string;
  description: string;
  avatar_urls?: Record<string, string>;
  url?: string;
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes?: Record<
      string,
      { source_url: string; width: number; height: number }
    >;
  };
}

export interface WPEmbedded {
  author?: WPAuthor[];
  'wp:featuredmedia'?: WPMedia[];
  'wp:term'?: WPCategory[][];
}

export interface WPPost {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  link: string;
  title: WPRenderedField;
  content: WPRenderedField;
  excerpt: WPRenderedField;
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  rank_math?: WPRankMath;
  _embedded?: WPEmbedded;
}

export interface WPPostsResponse {
  posts: WPPost[];
  total: number;
  totalPages: number;
}

const DEFAULT_TAGS = ['wp:posts'];

function postTag(slug: string) {
  return `wp:post:${slug}`;
}

async function wpFetch<T>(
  path: string,
  {
    tags = [],
    revalidate = 3600,
  }: { tags?: string[]; revalidate?: number | false } = {},
): Promise<{ data: T; headers: Headers } | null> {
  const url = `${WP_API_URL}${path}`;
  try {
    const res = await fetch(url, {
      next: { tags: [...DEFAULT_TAGS, ...tags], revalidate },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      if (res.status !== 404) {
        console.error(`[wp] ${res.status} ${url}`);
      }
      return null;
    }
    const data = (await res.json()) as T;
    return { data, headers: res.headers };
  } catch (err) {
    console.error(`[wp] fetch failed: ${url}`, err);
    return null;
  }
}

export const getPosts = cache(
  async (
    {
      page = 1,
      perPage = 12,
      categories,
      exclude,
      fields,
    }: {
      page?: number;
      perPage?: number;
      categories?: number[];
      exclude?: number[];
      fields?: string[];
    } = {},
  ): Promise<WPPostsResponse> => {
    const params = new URLSearchParams();
    params.set('_embed', '1');
    params.set('page', String(page));
    params.set('per_page', String(perPage));
    if (categories?.length) params.set('categories', categories.join(','));
    if (exclude?.length) params.set('exclude', exclude.join(','));
    if (fields?.length) params.set('_fields', fields.join(','));

    const result = await wpFetch<WPPost[]>(`/posts?${params.toString()}`);
    if (!result) return { posts: [], total: 0, totalPages: 0 };
    return {
      posts: result.data,
      total: Number(result.headers.get('x-wp-total') ?? 0),
      totalPages: Number(result.headers.get('x-wp-totalpages') ?? 0),
    };
  },
);

export const getPostBySlug = cache(async (slug: string): Promise<WPPost | null> => {
  const params = new URLSearchParams();
  params.set('_embed', '1');
  params.set('slug', slug);
  const result = await wpFetch<WPPost[]>(
    `/posts?${params.toString()}`,
    { tags: [postTag(slug)] },
  );
  if (!result || result.data.length === 0) return null;
  return result.data[0];
});

export const getRelatedPosts = cache(
  async (
    categoryIds: number[],
    excludeId: number,
    limit = 3,
  ): Promise<WPPost[]> => {
    if (!categoryIds.length) return [];
    const result = await getPosts({
      categories: categoryIds,
      exclude: [excludeId],
      perPage: limit,
    });
    return result.posts;
  },
);

export const getAllPostSlugs = cache(async (): Promise<string[]> => {
  const slugs: string[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const params = new URLSearchParams({
      _fields: 'slug',
      per_page: String(perPage),
      page: String(page),
    });
    const result = await wpFetch<{ slug: string }[]>(
      `/posts?${params.toString()}`,
    );
    if (!result) break;
    slugs.push(...result.data.map((p) => p.slug));
    const totalPages = Number(result.headers.get('x-wp-totalpages') ?? 0);
    if (page >= totalPages) break;
    page += 1;
  }

  return slugs;
});

export function getFeaturedImage(post: WPPost) {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (!media?.source_url) return null;
  const sizes = media.media_details?.sizes ?? {};
  const large = sizes.large ?? sizes.medium_large ?? sizes.full;
  return {
    src: large?.source_url ?? media.source_url,
    width: large?.width ?? media.media_details?.width ?? 1200,
    height: large?.height ?? media.media_details?.height ?? 630,
    alt: media.alt_text || post.title.rendered,
  };
}

export function getAuthor(post: WPPost) {
  return post._embedded?.author?.[0] ?? null;
}

export function getCategories(post: WPPost): WPCategory[] {
  const terms = post._embedded?.['wp:term'] ?? [];
  return terms.flat().filter((t) => t.taxonomy === 'category');
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

export function readingTimeMinutes(html: string): number {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
}
