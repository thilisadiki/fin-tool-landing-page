interface Bucket {
  minuteCount: number;
  minuteResetAt: number;
  dayCount: number;
  dayResetAt: number;
}

const PER_MINUTE_LIMIT = 10;
const PER_DAY_LIMIT = 60;

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  ok: boolean;
  reason?: 'minute' | 'day';
  retryAfterSeconds?: number;
}

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  let bucket = buckets.get(ip);

  if (!bucket) {
    bucket = {
      minuteCount: 0,
      minuteResetAt: now + 60_000,
      dayCount: 0,
      dayResetAt: now + 86_400_000,
    };
    buckets.set(ip, bucket);
  }

  if (now >= bucket.minuteResetAt) {
    bucket.minuteCount = 0;
    bucket.minuteResetAt = now + 60_000;
  }
  if (now >= bucket.dayResetAt) {
    bucket.dayCount = 0;
    bucket.dayResetAt = now + 86_400_000;
  }

  if (bucket.dayCount >= PER_DAY_LIMIT) {
    return {
      ok: false,
      reason: 'day',
      retryAfterSeconds: Math.ceil((bucket.dayResetAt - now) / 1000),
    };
  }
  if (bucket.minuteCount >= PER_MINUTE_LIMIT) {
    return {
      ok: false,
      reason: 'minute',
      retryAfterSeconds: Math.ceil((bucket.minuteResetAt - now) / 1000),
    };
  }

  bucket.minuteCount += 1;
  bucket.dayCount += 1;
  return { ok: true };
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return headers.get('x-real-ip') ?? 'unknown';
}
