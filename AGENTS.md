# AI Agent Context Guide

This document provides essential context for AI assistants working with this SvelteKit template. Use this as a reference to understand the codebase structure, patterns, and conventions.

## 🎯 Project Overview

This is a **production-ready SvelteKit template** with:
- Custom authentication system (not Lucia - custom implementation)
- Turso (LibSQL) database with Drizzle ORM
- shadcn-svelte UI components
- Tailwind CSS v4
- Vercel deployment ready
- Full TypeScript with strict mode

## 📦 Tech Stack & Versions

### Core Framework
- **SvelteKit**: `^2.47.1`
- **Svelte**: `^5.41.0` (using Svelte 5 runes syntax)
- **TypeScript**: `^5.9.3` (strict mode enabled)
- **Vite**: `^7.1.10`
- **Node.js**: 18+ (Vercel uses Node.js 22.x)

### Database & ORM
- **Turso (LibSQL)**: `@libsql/client@^0.15.15`
- **Drizzle ORM**: `^0.44.6`
- **Drizzle Kit**: `^0.31.5`

### Authentication
- **Password Hashing**: `@node-rs/argon2@^2.0.2`
- **Crypto**: `@oslojs/crypto@^1.0.1`
- **Encoding**: `@oslojs/encoding@^1.1.0`

### UI & Styling
- **Tailwind CSS**: `^4.1.14` (v4 syntax - NOT v3)
- **shadcn-svelte**: Components built on `bits-ui@^2.14.3`
- **Iconify**: `@iconify/tailwind4@^1.1.0` (275k+ icons)
- **Tailwind Variants**: `^3.1.1`

### Deployment
- **Vercel Adapter**: `@sveltejs/adapter-vercel@^6.0.0`
- **Runtime**: Node.js 22.x

## 🏗️ Project Structure

```markdown:AGENTS.md
<code_block_to_apply_changes_from>
```
src/
├── lib/
│   ├── components/
│   │   ├── ui/              # shadcn-svelte components (modify freely)
│   │   └── Navigation.svelte # App navigation
│   ├── server/
│   │   ├── auth.ts          # Authentication logic (session management)
│   │   └── db/
│   │       ├── index.ts     # Database connection (exports `db`)
│   │       └── schema.ts    # Drizzle schema (user, session tables)
│   └── utils.ts             # Utility functions (cn, type helpers)
├── routes/
│   ├── +layout.svelte       # Root layout
│   ├── +page.svelte         # Landing page
│   ├── sign-in/             # Sign in page
│   ├── sign-up/             # Sign up page
│   ├── sign-out/+server.ts  # Sign out endpoint (POST)
│   └── dashboard/           # Protected route example
├── hooks.server.ts          # Auth middleware (validates sessions)
└── app.css                  # Global styles + Tailwind config
```

## 💻 Code Patterns & Conventions

### Svelte 5 Runes Syntax

**ALWAYS use Svelte 5 runes syntax**, not the old Svelte 4 syntax:

```svelte
<script lang="ts">
  // ✅ CORRECT - Svelte 5
  let { data }: { data: PageData } = $props();
  let count = $state(0);
  let doubled = $derived(count * 2);
  
  // ❌ WRONG - Svelte 4
  export let data;
  let count = 0;
  $: doubled = count * 2;
</script>
```

### TypeScript Rules

- **Strict mode enabled** - no `any` types unless absolutely necessary
- Use proper types from `$types` imports
- Always type function parameters and return values
- Use `type` for type aliases, not `interface` (unless extending)

### Authentication Patterns

**User data is available in `event.locals.user`** after authentication middleware runs.

**Protecting routes** - Use this pattern:

```typescript
// src/routes/protected/+page.server.ts
import { redirect } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const { locals } = getRequestEvent();
  
  if (!locals.user) {
    redirect(302, '/sign-in');
  }
  
  return { user: locals.user };
};
```

**Accessing user in components**:

```svelte
<script lang="ts">
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

{#if data.user}
  <p>Welcome, {data.user.username}!</p>
{/if}
```

### Database Patterns

**Always use Drizzle ORM** - never raw SQL:

```typescript
// ✅ CORRECT
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

const users = await db.select().from(table.user).where(eq(table.user.id, userId));
```

**Schema changes**:
1. Edit `src/lib/server/db/schema.ts`
2. Run `npm run db:push` to push changes
3. Types are auto-generated

### UI Component Patterns

**Use shadcn-svelte components** from `$lib/components/ui/`:

```svelte
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
</script>
```

**Tailwind CSS v4 syntax** (NOT v3):
- Use `@import "tailwindcss"` (not `@tailwind` directives)
- Use CSS variables for theming (see `app.css`)
- Icons: `class="icon-[lucide--home]"` format

### Form Handling

**Use SvelteKit's `enhance` action** for progressive enhancement:

```svelte
<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';
  let { form }: { form: ActionData } = $props();
</script>

<form method="post" action="?/register" use:enhance>
  <!-- form fields -->
</form>
```

## 🚫 Important Rules

### Never Do This

1. ❌ **Don't use `any` type** - always use proper types
2. ❌ **Don't use Svelte 4 syntax** - always use Svelte 5 runes
3. ❌ **Don't use Tailwind v3 syntax** - this project uses Tailwind v4
4. ❌ **Don't bypass authentication** - always check `event.locals.user`
5. ❌ **Don't use raw SQL** - always use Drizzle ORM
6. ❌ **Don't hardcode environment variables** - use `$env/dynamic/private`

### Always Do This

1. ✅ **Use TypeScript strict mode** - no implicit any
2. ✅ **Use Svelte 5 runes** - `$props()`, `$state()`, `$derived()`
3. ✅ **Type everything** - functions, props, return values
4. ✅ **Use `$lib` alias** - for imports from `src/lib`
5. ✅ **Check authentication** - verify `event.locals.user` exists
6. ✅ **Use Drizzle ORM** - for all database operations
7. ✅ **Follow file structure** - keep server code in `+page.server.ts`, components in `.svelte`

## 🔧 Common Tasks

### Adding a New Protected Route

1. Create route directory: `src/routes/my-route/`
2. Add `+page.server.ts` with auth check (see Authentication Patterns)
3. Add `+page.svelte` component
4. Access user via `data.user` in component

### Adding a Database Table

1. Edit `src/lib/server/db/schema.ts`:
```typescript
export const myTable = sqliteTable('my_table', {
  id: text('id').primaryKey(),
  // ... fields
});
```

2. Export type:
```typescript
export type MyTable = typeof myTable.$inferSelect;
```

3. Push schema: `npm run db:push`

### Adding a UI Component

```bash
npx shadcn-svelte@latest add <component-name>
```

Components are added to `src/lib/components/ui/` and can be customized.

### Environment Variables

- **Development**: `.env` file (gitignored)
- **Production**: Set in Vercel dashboard
- **Access**: Use `$env/dynamic/private` for server-side
- **Required**: `DATABASE_URL` (always), `DATABASE_AUTH_TOKEN` (production)

## 🎨 Styling Guidelines

### Tailwind CSS v4

- Use utility classes: `class="flex items-center gap-4"`
- Use CSS variables for theming: `var(--primary)`
- Dark mode: Use `.dark` class on parent
- Icons: `class="icon-[lucide--icon-name]"`

### Component Styling

- Use `cn()` utility for conditional classes: `cn("base-class", condition && "conditional-class")`
- Follow shadcn-svelte patterns for component variants
- Use Tailwind's responsive prefixes: `sm:`, `md:`, `lg:`

## 🔐 Security Considerations

1. **Password hashing**: Always use Argon2 (already configured)
2. **Session tokens**: Automatically hashed with SHA-256
3. **Environment variables**: Never commit `.env` file
4. **Database tokens**: Required in production, optional in dev
5. **Protected routes**: Always check authentication server-side

## 📝 Code Style

- **Formatting**: Prettier (run `npm run format`)
- **Linting**: ESLint + Prettier (run `npm run lint`)
- **Type checking**: TypeScript strict mode (run `npm run check`)
- **Indentation**: Tabs (as configured in Prettier)
- **Quotes**: Single quotes for JS/TS, double for HTML attributes

## 🚀 Deployment Notes

- **Platform**: Vercel (pre-configured)
- **Runtime**: Node.js 22.x
- **Build**: Automatic via Vercel
- **Environment Variables**: Must be set in Vercel dashboard
- **Database**: Turso (same database for all environments)

## 🐛 Common Issues

### "User is null" errors
- Check `hooks.server.ts` is running
- Verify session cookie is set
- Check database connection

### Type errors
- Run `npm run check` to see all errors
- Ensure `$types` imports are correct
- Check that types are exported from schema

### Database connection errors
- Verify `DATABASE_URL` is set
- Check `DATABASE_AUTH_TOKEN` in production
- Ensure Turso database is active

## 📚 Key Files Reference

- **Auth logic**: `src/lib/server/auth.ts`
- **Database connection**: `src/lib/server/db/index.ts`
- **Schema**: `src/lib/server/db/schema.ts`
- **Auth middleware**: `src/hooks.server.ts`
- **Type definitions**: `src/app.d.ts`
- **Global styles**: `src/app.css`
- **Drizzle config**: `drizzle.config.ts`
- **SvelteKit config**: `svelte.config.js`

## 💡 Quick Reference

**Import database**: `import { db } from '$lib/server/db';`
**Import auth**: `import * as auth from '$lib/server/auth';`
**Import schema**: `import * as table from '$lib/server/db/schema';`
**Get user**: `event.locals.user`
**Check auth**: `if (!event.locals.user) redirect(302, '/sign-in');`
**Type props**: `let { data }: { data: PageData } = $props();`
**State**: `let count = $state(0);`
**Derived**: `let doubled = $derived(count * 2);`
