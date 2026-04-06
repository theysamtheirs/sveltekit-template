# AI Agent Context

This file is read automatically by AI coding tools (Claude Code, Cursor, GitHub Copilot, etc.). It gives you the mental model needed to work effectively in this codebase without extensive exploration.

## What This Is

A production-ready SvelteKit template. When someone clones it, they get: username/password auth, a Turso SQLite database, shadcn-svelte UI, and a Vercel deployment config — all wired together.

**Stack:** SvelteKit 2 · Svelte 5 (runes) · TypeScript strict · Tailwind CSS v4 · Drizzle ORM · Turso (LibSQL) · Vercel · Bun

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── ui/                    # shadcn-svelte components — modify freely
│   │   └── Navigation.svelte      # Top nav (reads isTemplateShowcase from layout)
│   ├── server/                    # Server-only code — never imported client-side
│   │   ├── auth.ts                # Session lifecycle (create, validate, invalidate)
│   │   ├── db/
│   │   │   ├── index.ts           # DB connection — falls back to file:local.db in dev
│   │   │   └── schema.ts          # Drizzle schema: user, session, rate_limit tables
│   │   ├── rate-limit.ts          # DB-backed rate limiting (async, persists across instances)
│   │   ├── security.ts            # Cookie config, Argon2 options, session policy constants
│   │   └── validation.ts          # Shared pure validators (no SvelteKit deps — testable)
│   ├── utils/                     # Client-safe utilities (cn, SEO helpers)
│   └── assets/logos/              # SVG logos for landing page
├── routes/
│   ├── +layout.svelte             # Root layout with nav
│   ├── +layout.server.ts          # Passes user + isTemplateShowcase to all pages
│   ├── +page.svelte               # Landing page
│   ├── +error.svelte              # Error page (details only shown in dev)
│   ├── sign-in/+page.server.ts    # login action — validates, rate limits, creates session
│   ├── sign-up/+page.server.ts    # register action — validates, hashes, creates session
│   ├── sign-out/+server.ts        # POST — invalidates session, clears cookie
│   ├── dashboard/+page.server.ts  # Protected route example
│   ├── api/health/+server.ts      # GET — checks DB connection and env vars
│   └── api/example/+server.ts    # GET/POST — pattern reference for API routes
├── hooks.server.ts                # Auth middleware + opportunistic rate_limit cleanup
└── app.d.ts                       # Augments App.Locals with user and session types
```

## Database Schema

```typescript
// user — one row per registered account
{ id: text PK, username: text UNIQUE, passwordHash: text }

// session — one row per active login
{ id: text PK (SHA256 of token), userId: text FK, expiresAt: timestamp }

// rate_limit — tracks auth attempt counts per IP/username window
{ key: text PK, count: integer, resetAt: integer (unix ms) }
```

Schema lives in `src/lib/server/db/schema.ts`. After any schema change, run `bun run db:push`.

**Dev database:** `local.db` (auto-created SQLite file, gitignored). No Turso account needed for local development.

## Auth Flow

1. **Sign up / sign in** → generate 18-byte random token → SHA256 hash it → store hash as session ID in DB → set token in HttpOnly cookie
2. **Every request** → `hooks.server.ts` reads cookie → hashes it → DB lookup → populates `event.locals.user` and `event.locals.session`
3. **Session renewal** — if within 15 days of expiry (30-day total lifetime), expiry is extended automatically

The token itself never touches the database — only its SHA256 hash. This means a DB breach doesn't expose active sessions.

## Key Conventions

### Svelte 5 Runes — Always Use These

```svelte
<script lang="ts">
	// ✅ Svelte 5
	let { data }: { data: PageData } = $props();
	let count = $state(0);
	let doubled = $derived(count * 2);

	// For multi-line derivations use $derived.by():
	let message = $derived.by(() => {
		if (count > 10) return 'high';
		return 'low';
	});

	// ❌ Never Svelte 4
	export let data;
	$: doubled = count * 2;
</script>
```

### Protecting a Route

```typescript
// src/routes/my-route/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(302, '/sign-in');
	return { user: locals.user };
};
```

### Database Queries — Always Drizzle, Never Raw SQL

```typescript
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

// Select
const [user] = await db.select().from(table.user).where(eq(table.user.id, id));

// Insert
await db.insert(table.user).values({ id, username, passwordHash });

// Update
await db.update(table.session).set({ expiresAt }).where(eq(table.session.id, sessionId));
```

### Input Validation — Use the Shared Module

All username/password validation and rate limit key building lives in `src/lib/server/validation.ts`. This module has **zero SvelteKit dependencies**, making it directly testable.

```typescript
import { validateUsername, validatePassword, buildRateLimitKey } from '$lib/server/validation';

const result = validateUsername(formData.get('username'));
if (!result.valid) return fail(400, { message: result.error });
```

Don't duplicate these validators in new routes — import from the shared module.

### Rate Limiting

Rate limiting is async and database-backed. Always `await` it:

```typescript
import { enforceRateLimit } from '$lib/server/rate-limit';
import { buildRateLimitKey } from '$lib/server/validation';

await enforceRateLimit({
	key: buildRateLimitKey(['auth', 'my-action', 'ip', event.getClientAddress()]),
	windowMs: 60_000,
	max: 10
});
```

### Adding a New Database Table

1. Add to `src/lib/server/db/schema.ts`
2. Export the inferred type: `export type MyTable = typeof myTable.$inferSelect;`
3. Run `bun run db:push`

### Environment Variables

- Access server-side: `import { env } from '$env/dynamic/private'`
- Never in client code (use `$env/dynamic/public` for public vars)
- Dev fallback: `DATABASE_URL` defaults to `file:local.db` if not set
- Required in production: `DATABASE_URL`, `DATABASE_AUTH_TOKEN`
- Optional: `TEMPLATE_SHOWCASE_MODE=true` (hides auth buttons in nav — for demo deployments)

## Icon Systems

This project has **two icon systems**. Use the right one:

### 1. Iconify via Tailwind classes (use this for new code)

```svelte
<span class="icon-[lucide--home]"></span>
<span class="icon-[lucide--user] text-xl text-red-500"></span>
```

Syntax: `icon-[{prefix}--{name}]` with double hyphens. Verify names at [icon-sets.iconify.design](https://icon-sets.iconify.design/). Common prefixes: `lucide`, `heroicons`, `tabler`, `mdi-light`.

**Never use placeholder names** like `icon-[prefix--name]` — they silently render nothing. Always verify the exact name at [icon-sets.iconify.design](https://icon-sets.iconify.design/) first.

### 2. @lucide/svelte imports (only in shadcn-svelte components)

```svelte
<script lang="ts">
	import CheckIcon from '@lucide/svelte/icons/check';
</script>

<CheckIcon class="size-4" />
```

Only use this inside `src/lib/components/ui/` where shadcn-svelte components already use it.

## Testing

Tests use Vitest. Run with `bun run test` (watch) or `bun run test:run` (CI).

Test files live alongside source files as `*.test.ts`.

**What's tested:** Input validation functions (`validation.test.ts`), session token generation (`auth.test.ts`).

**Mocking pattern for SvelteKit modules** — needed when testing files that import from `$lib/server/db`:

```typescript
vi.mock('$app/environment', () => ({ dev: true }));
vi.mock('$env/dynamic/private', () => ({ env: { DATABASE_URL: 'file:test.db' } }));
vi.mock('$lib/server/db', () => ({ db: {} }));
```

Add these at the top of the test file (Vitest hoists `vi.mock` calls automatically).

## What NOT To Do

- ❌ `any` types — strict mode enforced
- ❌ Svelte 4 syntax (`export let`, `$:`) — always use runes
- ❌ Tailwind v3 syntax (`@tailwind base`) — this uses v4 (`@import "tailwindcss"`)
- ❌ Raw SQL — use Drizzle ORM
- ❌ Hardcoded secrets — use `$env/dynamic/private`
- ❌ Sync `enforceRateLimit` calls — it's async, always `await` it
- ❌ `$derived(() => ...)` for multi-line derivations — use `$derived.by(() => ...)`
- ❌ Showing raw error details in production — `+error.svelte` gates them behind `dev`
- ❌ Placeholder icon names — verify at iconify before using

## Quick Reference

```typescript
import { db } from '$lib/server/db'; // database
import * as table from '$lib/server/db/schema'; // schema
import * as auth from '$lib/server/auth'; // session management
import { validateUsername, validatePassword, buildRateLimitKey } from '$lib/server/validation';
import { enforceRateLimit } from '$lib/server/rate-limit';

event.locals.user; // current user (null if not logged in)
event.locals.session; // current session (null if not logged in)
```

## Deployment

- **Platform**: Vercel with `@sveltejs/adapter-vercel` (Node.js 22.x runtime)
- **CI**: GitHub Actions using bun — runs lint, type check, tests, and build on every push
- **Production env vars**: Set `DATABASE_URL` and `DATABASE_AUTH_TOKEN` in Vercel dashboard
- **Showcase deployment**: Set `TEMPLATE_SHOWCASE_MODE=true` to hide auth UI on a demo instance
