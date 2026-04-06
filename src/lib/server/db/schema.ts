import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

// Persistent rate limiting — survives across serverless instances.
// key: identifies the limit (e.g. "auth:login:ip:1.2.3.4")
// count: number of attempts in the current window
// resetAt: unix timestamp (ms) when the window resets
export const rateLimit = sqliteTable('rate_limit', {
	key: text('key').primaryKey(),
	count: integer('count').notNull(),
	resetAt: integer('reset_at').notNull()
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
