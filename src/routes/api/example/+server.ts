import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getRequestEvent } from '$app/server';

/**
 * Example API route demonstrating common patterns:
 * - Authentication checks
 * - Query parameter handling
 * - Error handling
 * - Type-safe responses
 */

export const GET: RequestHandler = async ({ url }) => {
	const { locals } = getRequestEvent();

	// Example: Protected endpoint (uncomment to require auth)
	// if (!locals.user) {
	//   error(401, 'Unauthorized');
	// }

	// Example: Query parameters
	const name = url.searchParams.get('name') || 'World';
	const count = parseInt(url.searchParams.get('count') || '1', 10);

	if (isNaN(count) || count < 1) {
		error(400, 'Count must be a positive number');
	}

	return json({
		message: `Hello, ${name}!`,
		count,
		user: locals.user ? { id: locals.user.id, username: locals.user.username } : null,
		timestamp: new Date().toISOString()
	});
};

export const POST: RequestHandler = async ({ request }) => {
	const { locals } = getRequestEvent();

	// Example: Require authentication
	if (!locals.user) {
		error(401, 'Unauthorized');
	}

	// Example: Parse JSON body
	let body;
	try {
		body = await request.json();
	} catch {
		error(400, 'Invalid JSON');
	}

	return json({
		message: 'Data received',
		received: body,
		user: {
			id: locals.user.id,
			username: locals.user.username
		},
		timestamp: new Date().toISOString()
	});
};

