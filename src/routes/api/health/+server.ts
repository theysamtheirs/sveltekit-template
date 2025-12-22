import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async () => {
	const checks = {
		database: false,
		environment: {
			databaseUrl: !!env.DATABASE_URL,
			databaseToken: !!env.DATABASE_AUTH_TOKEN || import.meta.env.DEV
		},
		timestamp: new Date().toISOString()
	};

	try {
		// Test database connection
		await db.execute('SELECT 1');
		checks.database = true;
	} catch (error) {
		console.error('Database health check failed:', error);
	}

	const healthy =
		checks.database &&
		checks.environment.databaseUrl &&
		(checks.environment.databaseToken || import.meta.env.DEV);

	return json(
		{
			status: healthy ? 'healthy' : 'unhealthy',
			checks
		},
		{
			status: healthy ? 200 : 503
		}
	);
};

