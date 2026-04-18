import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface RevalidatePayload {
  secret?: string;
  slug?: string;
  action?: 'publish' | 'update' | 'delete';
}

export async function POST(request: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: 'REVALIDATE_SECRET is not configured' },
      { status: 500 },
    );
  }

  let body: RevalidatePayload;
  try {
    body = (await request.json()) as RevalidatePayload;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const providedSecret =
    body.secret ??
    request.headers.get('x-revalidate-secret') ??
    request.nextUrl.searchParams.get('secret');

  if (providedSecret !== expected) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  revalidateTag('wp:posts', 'max');
  revalidatePath('/blog');
  revalidatePath('/sitemap.xml');

  if (body.slug) {
    revalidateTag(`wp:post:${body.slug}`, 'max');
    revalidatePath(`/blog/${body.slug}`);
  }

  return NextResponse.json({
    ok: true,
    revalidated: {
      tags: ['wp:posts', body.slug ? `wp:post:${body.slug}` : null].filter(Boolean),
      paths: ['/blog', body.slug ? `/blog/${body.slug}` : null, '/sitemap.xml'].filter(
        Boolean,
      ),
    },
    now: Date.now(),
  });
}
