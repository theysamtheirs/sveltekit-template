import { hash } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail, redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { argon2Options } from '$lib/server/security';
import { enforceRateLimit } from '$lib/server/rate-limit';
import { buildRateLimitKey, validatePassword, validateUsername } from '$lib/server/validation';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	register: async (event) => {
		const clientAddress = event.getClientAddress();
		await enforceRateLimit({
			key: buildRateLimitKey(['auth', 'register', 'ip', clientAddress]),
			windowMs: 60_000,
			max: 10
		});

		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		const usernameValidation = validateUsername(username);
		if (!usernameValidation.valid) {
			return fail(400, { message: usernameValidation.error || 'Invalid username' });
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Password must be at least 6 characters long' });
		}

		const normalizedUsername = (username as string).trim().toLowerCase();

		await enforceRateLimit({
			key: buildRateLimitKey(['auth', 'register', 'ip-user', clientAddress, normalizedUsername]),
			windowMs: 60_000,
			max: 3
		});

		const userId = generateUserId();
		const passwordHash = await hash(password, argon2Options);

		try {
			await db
				.insert(table.user)
				.values({ id: userId, username: normalizedUsername, passwordHash });

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch {
			return fail(500, { message: 'An error has occurred. Username may already be taken.' });
		}
		return redirect(302, '/');
	}
};

function generateUserId(): string {
	// 120 bits of entropy — same as UUID v4
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	return encodeBase32LowerCase(bytes);
}
