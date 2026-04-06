import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import { dev } from '$app/environment';
import { lt } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		const response = await resolve(event);
		return withSecurityHeaders(response);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);

	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;
	const response = await resolve(event);
	return withSecurityHeaders(response);
};

// Opportunistically purge expired rate limit rows on ~2% of requests.
// Keeps the table lean without a dedicated cron job.
const CLEANUP_PROBABILITY = 0.02;

async function maybeCleanRateLimits(): Promise<void> {
	if (Math.random() > CLEANUP_PROBABILITY) return;
	await db.delete(table.rateLimit).where(lt(table.rateLimit.resetAt, Date.now()));
}

const handleRateLimitCleanup: Handle = async ({ event, resolve }) => {
	maybeCleanRateLimits(); // fire-and-forget, never blocks the request
	return resolve(event);
};

export const handle: Handle = sequence(handleRateLimitCleanup, handleAuth);

function withSecurityHeaders(response: Response): Response {
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
	response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
	response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');

	if (!dev) {
		response.headers.set(
			'Strict-Transport-Security',
			'max-age=31536000; includeSubDomains; preload'
		);
	}

	return response;
}
