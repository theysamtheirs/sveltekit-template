import { dev } from '$app/environment';

export const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionPolicy = {
	// 30 day sessions, renewed when < 15 days remaining
	lifetimeMs: DAY_IN_MS * 30,
	renewalWindowMs: DAY_IN_MS * 15
} as const;

// Recommended minimum parameters (shared across hash + verify).
export const argon2Options = {
	memoryCost: 19456,
	timeCost: 2,
	outputLen: 32,
	parallelism: 1
} as const;

export function sessionCookieOptions(expiresAt: Date) {
	return {
		expires: expiresAt,
		path: '/',
		httpOnly: true,
		secure: !dev,
		sameSite: 'lax' as const
	};
}

export function sessionCookieDeleteOptions() {
	return {
		path: '/',
		httpOnly: true,
		secure: !dev,
		sameSite: 'lax' as const
	};
}
