import { describe, expect, it } from 'vitest';
import { buildRateLimitKey, validatePassword, validateUsername } from './validation';

describe('validateUsername', () => {
	it('accepts valid usernames', () => {
		expect(validateUsername('alice').valid).toBe(true);
		expect(validateUsername('bob_123').valid).toBe(true);
		expect(validateUsername('user-name').valid).toBe(true);
		expect(validateUsername('ABC').valid).toBe(true);
	});

	it('rejects non-string inputs', () => {
		expect(validateUsername(null).valid).toBe(false);
		expect(validateUsername(42).valid).toBe(false);
		expect(validateUsername(undefined).valid).toBe(false);
	});

	it('rejects too short (< 3 chars)', () => {
		expect(validateUsername('ab').valid).toBe(false);
		expect(validateUsername('').valid).toBe(false);
	});

	it('rejects too long (> 31 chars)', () => {
		expect(validateUsername('a'.repeat(32)).valid).toBe(false);
		expect(validateUsername('a'.repeat(31)).valid).toBe(true);
	});

	it('rejects disallowed characters', () => {
		expect(validateUsername('user name').valid).toBe(false);
		expect(validateUsername('user@name').valid).toBe(false);
		expect(validateUsername('user.name').valid).toBe(false);
	});

	it('rejects usernames starting or ending with _ or -', () => {
		expect(validateUsername('_alice').valid).toBe(false);
		expect(validateUsername('-alice').valid).toBe(false);
		expect(validateUsername('alice_').valid).toBe(false);
		expect(validateUsername('alice-').valid).toBe(false);
	});

	it('rejects all-numeric usernames', () => {
		expect(validateUsername('12345').valid).toBe(false);
	});

	it('returns an error message on failure', () => {
		const result = validateUsername('ab');
		expect(result.valid).toBe(false);
		expect(result.error).toBeTruthy();
	});
});

describe('validatePassword', () => {
	it('accepts valid passwords', () => {
		expect(validatePassword('secret')).toBe(true);
		expect(validatePassword('a'.repeat(255))).toBe(true);
	});

	it('rejects passwords shorter than 6 characters', () => {
		expect(validatePassword('abc')).toBe(false);
		expect(validatePassword('')).toBe(false);
	});

	it('rejects passwords longer than 255 characters', () => {
		expect(validatePassword('a'.repeat(256))).toBe(false);
	});

	it('rejects non-string inputs', () => {
		expect(validatePassword(null)).toBe(false);
		expect(validatePassword(123456)).toBe(false);
	});
});

describe('buildRateLimitKey', () => {
	it('joins parts with :', () => {
		expect(buildRateLimitKey(['auth', 'login', 'ip'])).toBe('auth:login:ip');
	});

	it('filters out null and undefined', () => {
		expect(buildRateLimitKey(['auth', null, 'login', undefined, 'ip'])).toBe('auth:login:ip');
	});

	it('filters out empty strings', () => {
		expect(buildRateLimitKey(['auth', '', 'login'])).toBe('auth:login');
	});

	it('handles all-empty input', () => {
		expect(buildRateLimitKey([null, undefined, ''])).toBe('');
	});
});
