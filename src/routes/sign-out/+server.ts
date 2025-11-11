import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	if (!event.locals.session) {
		return fail(401);
	}
	await auth.invalidateSession(event.locals.session.id);
	auth.deleteSessionTokenCookie(event);

	return redirect(302, '/');
};

