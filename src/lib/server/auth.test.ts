import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock SvelteKit virtual modules and DB dependencies so we can test auth utilities in isolation.
// These are module-level side effects in auth.ts — without mocking them, vitest can't load the module.
vi.mock('$app/environment', () => ({ dev: true }));
vi.mock('$env/dynamic/private', () => ({ env: { DATABASE_URL: 'file:test.db' } }));
vi.mock('$lib/server/db', () => ({ db: {} }));
vi.mock('$lib/server/security', () => ({
	sessionPolicy: { lifetimeMs: 2_592_000_000, renewalWindowMs: 1_296_000_000 },
	sessionCookieOptions: vi.fn(),
	sessionCookieDeleteOptions: vi.fn()
}));

const { generateSessionToken } = await import('./auth');

describe('generateSessionToken', () => {
	beforeEach(() => vi.clearAllMocks());

	it('returns a non-empty string', () => {
		expect(typeof generateSessionToken()).toBe('string');
		expect(generateSessionToken().length).toBeGreaterThan(0);
	});

	it('returns a 24-character base64url string (18 bytes encoded)', () => {
		// 18 bytes → 24 base64url chars (no padding)
		expect(generateSessionToken()).toHaveLength(24);
	});

	it('returns a different value on each call', () => {
		const tokens = new Set(Array.from({ length: 10 }, generateSessionToken));
		expect(tokens.size).toBe(10);
	});

	it('contains only base64url-safe characters', () => {
		const token = generateSessionToken();
		expect(token).toMatch(/^[A-Za-z0-9_-]+$/);
	});
});
