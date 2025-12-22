import { error } from '@sveltejs/kit';

type Bucket = {
	count: number;
	resetAtMs: number;
};

const buckets = new Map<string, Bucket>();

type RateLimitOptions = {
	key: string;
	windowMs: number;
	max: number;
};

export function enforceRateLimit({ key, windowMs, max }: RateLimitOptions): void {
	const now = Date.now();
	const existing = buckets.get(key);

	if (!existing || now >= existing.resetAtMs) {
		buckets.set(key, { count: 1, resetAtMs: now + windowMs });
		return;
	}

	if (existing.count >= max) {
		error(429, 'Too many requests');
	}

	existing.count += 1;
}

export function buildRateLimitKey(parts: Array<string | null | undefined>): string {
	return parts.filter((p) => typeof p === 'string' && p.length > 0).join(':');
}
