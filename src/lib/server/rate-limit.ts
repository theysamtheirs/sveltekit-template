import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

type RateLimitOptions = {
	key: string;
	windowMs: number;
	max: number;
};

export async function enforceRateLimit({ key, windowMs, max }: RateLimitOptions): Promise<void> {
	const now = Date.now();

	const [existing] = await db.select().from(table.rateLimit).where(eq(table.rateLimit.key, key));

	if (!existing || now >= existing.resetAt) {
		// Start a fresh window — onConflictDoUpdate handles both insert and reset atomically
		await db
			.insert(table.rateLimit)
			.values({ key, count: 1, resetAt: now + windowMs })
			.onConflictDoUpdate({
				target: table.rateLimit.key,
				set: { count: 1, resetAt: now + windowMs }
			});
		return;
	}

	if (existing.count >= max) {
		error(429, 'Too many requests');
	}

	await db
		.update(table.rateLimit)
		.set({ count: existing.count + 1 })
		.where(eq(table.rateLimit.key, key));
}
