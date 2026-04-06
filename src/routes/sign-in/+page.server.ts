import { verify } from '@node-rs/argon2';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
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
	login: async (event) => {
		const clientAddress = event.getClientAddress();
		await enforceRateLimit({
			key: buildRateLimitKey(['auth', 'login', 'ip', clientAddress]),
			windowMs: 60_000,
			max: 20
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
			key: buildRateLimitKey(['auth', 'login', 'ip-user', clientAddress, normalizedUsername]),
			windowMs: 60_000,
			max: 5
		});

		const results = await db
			.select()
			.from(table.user)
			.where(eq(table.user.username, normalizedUsername));

		const existingUser = results.at(0);
		if (!existingUser) {
			return fail(400, { message: 'Incorrect username or password' });
		}

		const validPassword = await verify(existingUser.passwordHash, password, argon2Options);
		if (!validPassword) {
			return fail(400, { message: 'Incorrect username or password' });
		}

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, existingUser.id);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(302, '/');
	}
};
