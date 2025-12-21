import { hash } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail, redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	register: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		const usernameValidation = validateUsername(username);
		if (!usernameValidation.valid) {
			return fail(400, {
				message: usernameValidation.error || 'Invalid username'
			});
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Password must be at least 6 characters long' });
		}

		// Normalize username to lowercase for case-insensitive storage
		const normalizedUsername = (username as string).trim().toLowerCase();

		const userId = generateUserId();
		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		try {
			await db.insert(table.user).values({ id: userId, username: normalizedUsername, passwordHash });

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch {
			return fail(500, { message: 'An error has occurred. Username may already be taken.' });
		}
		return redirect(302, '/');
	}
};

function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}

function validateUsername(username: unknown): { valid: boolean; error?: string } {
	if (typeof username !== 'string') {
		return { valid: false, error: 'Username must be a string' };
	}

	const trimmed = username.trim();

	if (trimmed.length < 3) {
		return { valid: false, error: 'Username must be at least 3 characters long' };
	}

	if (trimmed.length > 31) {
		return { valid: false, error: 'Username must be 31 characters or less' };
	}

	// Allow letters (both cases), numbers, underscores, and hyphens
	if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
		return {
			valid: false,
			error: 'Username can only contain letters, numbers, underscores, and hyphens'
		};
	}

	// Cannot start with underscore or hyphen
	if (/^[_-]/.test(trimmed)) {
		return { valid: false, error: 'Username cannot start with an underscore or hyphen' };
	}

	// Cannot end with underscore or hyphen
	if (/[_-]$/.test(trimmed)) {
		return { valid: false, error: 'Username cannot end with an underscore or hyphen' };
	}

	// Cannot be all numbers
	if (/^\d+$/.test(trimmed)) {
		return { valid: false, error: 'Username cannot be all numbers' };
	}

	return { valid: true };
}

function validatePassword(password: unknown): password is string {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}

