const CMS_HOSTNAME = 'articles.quickmoneytool.com';

export function cleanContent(html: string): string {
  if (!html) return '';

  let out = html;

  out = out.replace(/<!--\s*\/?wp:[^>]*-->/g, '');

  out = out.replace(/\sclass="([^"]*)"/g, (_match, classes: string) => {
    const kept = classes
      .split(/\s+/)
      .filter((c) => c && !c.startsWith('wp-block-'))
      .join(' ')
      .trim();
    return kept ? ` class="${kept}"` : '';
  });

  out = out.replace(/\sstyle="[^"]*"/g, '');

  out = out.replace(/\sdata-[a-z0-9_-]+="[^"]*"/gi, '');

  out = out.replace(/<p>\s*(&nbsp;|<br\s*\/?>)?\s*<\/p>/gi, '');

  out = out.replace(/<span>\s*([\s\S]*?)\s*<\/span>/gi, '$1');

  const rewriteHost = new RegExp(
    `https?://${CMS_HOSTNAME.replace(/\./g, '\\.')}(/[^"'\\s]*)?`,
    'gi',
  );
  out = out.replace(rewriteHost, (_match, path: string | undefined) => {
    if (!path || path === '/') return '/blog';
    if (path.startsWith('/wp-content') || path.startsWith('/wp-json')) {
      return `https://${CMS_HOSTNAME}${path}`;
    }
    return `/blog${path.replace(/\/$/, '')}`;
  });

  out = out.replace(
    /<p>(\s*<strong>[\s\S]*?<\/strong>\s*)<\/p>/gi,
    '<p class="wp-callout">$1</p>',
  );

  return out.trim();
}
