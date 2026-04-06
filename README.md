# SvelteKit Template

> **A production-ready SvelteKit template that gets you from zero to deployed in under 5 minutes.**

This template provides everything you need to build and deploy a modern web application: authentication, database, beautiful UI components, and deployment configuration—all pre-configured and ready to use.

## Table of Contents

- [Features](#-features)
- [Requirements](#-requirements)
- [Getting Started](#-getting-started)
  - [Using This Template](#using-this-template)
  - [Quick Start](#quick-start)
  - [Verify Your Setup](#verify-your-setup)
- [Detailed Setup Guide](#-detailed-setup-guide)
  - [Automated Setup (Recommended)](#automated-setup-recommended)
  - [Manual Setup (Alternative)](#manual-setup-alternative)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment-to-vercel)
- [Development](#-development)
  - [Available Scripts](#-available-scripts)
  - [Database Commands](#database-commands)
  - [Environment Variables](#environment-variables)
- [Features & Guides](#-features--guides)
  - [Authentication](#-authentication)
  - [UI Components](#-ui-components)
  - [Icons with Iconify](#icons-with-iconify)
  - [API Routes](#-api-routes)
- [Tech Stack](#tech-stack)
- [Troubleshooting](#-troubleshooting)
- [Additional Resources](#-additional-resources)
- [Support](#support)

## ✨ Features

- 🔐 **Complete Authentication System** - User registration, login, secure password hashing (Argon2), and session management
- 🗄️ **Database Ready** - Turso (LibSQL) with Drizzle ORM, automated setup script, and type-safe queries
- 🎨 **Beautiful UI Components** - shadcn-svelte components with Tailwind CSS v4, dark mode, and 275k+ icons
- ⚡ **Lightning Fast** - Built on SvelteKit with server-side rendering and optimized builds
- 🚀 **Deploy Ready** - Pre-configured for Vercel with automated environment variable setup
- 🔒 **Type Safe** - Full TypeScript support with strict type checking
- 📱 **Responsive Design** - Mobile-first, modern UI that works on all devices
- 🛠️ **Developer Experience** - ESLint, Prettier, and comprehensive tooling included

## 📋 Requirements

Before getting started, make sure you have the following installed and set up:

### Required Software

- **Node.js 22+** - [Download here](https://nodejs.org/)
  - Verify installation: `node --version` (should be 22.0.0 or higher)
- **Bun** (recommended) - [Install here](https://bun.sh/)
  - This project uses bun as its primary package manager
  - Alternatives: npm, pnpm, or yarn also work
- **Turso CLI** - Install with one command:

  ```bash
  # macOS
  brew install tursodatabase/tap/turso

  # Linux
  curl -sSfL https://get.tur.so/install.sh | bash

  # Windows (Scoop)
  scoop bucket add turso https://github.com/tursodatabase/scoop-turso.git
  scoop install turso
  ```

  Verify installation: `turso --version`

### Required Accounts

- **Turso Account** - Free tier available ([Sign up here](https://turso.tech))
  - You'll need this for the database
  - Free tier includes generous limits for development
- **Vercel Account** - Free tier available ([Sign up here](https://vercel.com))
  - Required for deployment (optional for local development)
- **GitHub Account** - For version control (optional but recommended)
  - Useful for deploying to Vercel and version control

### Quick Verification

Run these commands to verify your setup:

```bash
# Check Node.js version
node --version  # Should be 22.0.0 or higher

# Check bun
bun --version

# Check Turso CLI (only needed for production/cloud setup)
turso --version
```

> **💡 Tip**: If you encounter any issues with the requirements, see the [Troubleshooting](#-troubleshooting) section below.

## 🚀 Getting Started

### Using This Template

**The easiest way to use this template:**

1. Click the **"Use this template"** button on GitHub (or [here](https://github.com/your-username/sveltekit-template/generate))
2. Create a new repository with your project name
3. Clone your new repository: `git clone <your-new-repo-url>`
4. Follow the setup steps below

> **📖 New to GitHub templates?** See [TEMPLATE_USAGE.md](./TEMPLATE_USAGE.md) for a complete guide on how template repositories work.

### Quick Start

#### Option A: Local dev (no Turso account needed)

Get running in under a minute — no database setup required:

```bash
git clone <your-repo-url>
cd sveltekit-template
bun install
bun run db:push   # creates a local SQLite file (local.db)
bun run dev
```

Visit `http://localhost:5173`. The template uses a local SQLite file automatically when `DATABASE_URL` isn't set.

#### Option B: With Turso (for production-ready setup)

```bash
git clone <your-repo-url>
cd sveltekit-template
bun install

# Log in and run the setup script — it handles everything
turso auth login
bun run setup
bun run dev
```

The setup script will:

- ✅ Create your Turso database
- ✅ Generate database credentials
- ✅ Configure your `.env` file automatically
- ✅ Push the database schema
- ✅ Show you exactly what to copy for Vercel deployment

### Verify Your Setup

After setup, you can verify everything is configured correctly:

```bash
bun run verify
```

This will check:

- ✅ Node.js and package manager
- ✅ Dependencies installation
- ✅ Environment variables
- ✅ Database connection
- ✅ TypeScript configuration
- ✅ Build process

You can also check the health endpoint: `http://localhost:5173/api/health`

For a complete verification guide, see [VERIFICATION.md](./VERIFICATION.md).

## 📖 Detailed Setup Guide

### Automated Setup (Recommended)

The automated setup is the fastest way to get started:

1. **Log in to Turso**:

   ```bash
   turso auth login
   ```

2. **Run the setup script**:

   ```bash
   bun run setup
   ```

   The script will:
   - ✅ Check if Turso CLI is installed
   - ✅ Verify you're logged in
   - ✅ Prompt for a database name
   - ✅ Create the database (or use existing)
   - ✅ Generate and save credentials to `.env`
   - ✅ Push the database schema
   - ✅ Display Vercel environment variables to copy

3. **Start developing**:
   ```bash
   bun run dev
   ```

### Manual Setup (Alternative)

If you prefer manual setup or need more control:

1. **Create a database**:

   ```bash
   turso db create <your-database-name>
   ```

2. **Get credentials**:

   ```bash
   # Get database URL
   turso db show <your-database-name> --url

   # Create auth token (30-day expiration)
   turso db tokens create <your-database-name> --expiration 30d
   ```

3. **Create `.env` file**:

   ```bash
   # Create from example (if it exists)
   cp .env.example .env

   # Or create manually
   touch .env
   ```

4. **Add credentials to `.env`**:

   ```env
   DATABASE_URL=libsql://your-database-url.turso.io
   DATABASE_AUTH_TOKEN=your-auth-token-here
   ```

5. **Push schema**:
   ```bash
   bun run db:push
   ```

> **Note**: `DATABASE_AUTH_TOKEN` is optional in development but required for production deployments.

## 📁 Project Structure

```
sveltekit-template/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ui/              # shadcn-svelte components
│   │   │   │   ├── button/
│   │   │   │   ├── card/
│   │   │   │   ├── input/
│   │   │   │   └── ...          # More UI components
│   │   │   └── Navigation.svelte
│   │   ├── server/
│   │   │   ├── auth.ts          # Authentication logic
│   │   │   └── db/
│   │   │       ├── index.ts     # Database connection
│   │   │       └── schema.ts    # Database schema
│   │   └── utils.ts             # Utility functions
│   ├── routes/
│   │   ├── +layout.svelte       # Root layout
│   │   ├── +page.svelte         # Landing page
│   │   ├── sign-in/             # Sign in page
│   │   ├── sign-up/             # Sign up page
│   │   ├── sign-out/            # Sign out endpoint
│   │   └── dashboard/           # Protected dashboard
│   ├── hooks.server.ts           # Server hooks (auth middleware)
│   └── app.css                  # Global styles
├── scripts/
│   └── setup-turso.sh           # Automated setup script
├── drizzle.config.ts            # Drizzle ORM configuration
├── svelte.config.js             # SvelteKit configuration
└── package.json
```

## 🚀 Deployment to Vercel

Deploying to Vercel is straightforward with this template. The setup script even provides the exact environment variables you need!

### Step 1: Push to GitHub

```bash
# Create a new repository on GitHub, then:
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Import Repository**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository

2. **Add Environment Variables**:
   - The setup script displays these when it completes
   - Go to Project Settings → Environment Variables
   - Add both variables for all environments (Production, Preview, Development):
     ```
     DATABASE_URL=libsql://your-database-url.turso.io
     DATABASE_AUTH_TOKEN=your-auth-token-here
     ```

3. **Deploy**:
   - Vercel automatically detects SvelteKit
   - Click "Deploy" and wait for the build
   - Your app will be live in ~2 minutes!

### Step 3: Verify Deployment

After deployment:

- ✅ Test the authentication flow (sign up, sign in)
- ✅ Verify database connections work
- ✅ Check that protected routes redirect correctly

> **💡 Tip**: The database schema is already pushed during setup, so no additional migrations are needed unless you modify the schema later.

## 🛠️ Development

### Available Scripts

#### Development

```bash
bun run dev          # Start development server (with hot reload)
bun run build        # Build for production
bun run preview      # Preview production build locally
```

#### Testing

```bash
bun run test         # Run tests in watch mode
bun run test:run     # Run tests once (used in CI)
```

#### Setup & Database

```bash
bun run setup        # Automated setup (installs deps + configures database)
bun run verify       # Verify your setup is correct
bun run db:push      # Push schema changes to database
bun run db:generate  # Generate migration files
bun run db:migrate   # Run migrations
bun run db:studio    # Open Drizzle Studio (database GUI)
```

#### Code Quality

```bash
bun run check        # TypeScript type checking
bun run lint         # Lint code (ESLint + Prettier check)
bun run format       # Format code with Prettier
bun run check:watch  # Type check in watch mode
```

### Database Commands

```bash
# Push schema changes to database
bun run db:push

# Generate migrations
bun run db:generate

# Run migrations
bun run db:migrate

# Open Drizzle Studio (database GUI)
bun run db:studio
```

### Environment Variables

| Variable                 | Description                | Required   | Notes                                                        |
| ------------------------ | -------------------------- | ---------- | ------------------------------------------------------------ |
| `DATABASE_URL`           | Turso database URL         | Production | Falls back to `file:local.db` in dev if not set              |
| `DATABASE_AUTH_TOKEN`    | Turso authentication token | Production | Optional in dev, required in production                      |
| `TEMPLATE_SHOWCASE_MODE` | Hides auth UI              | No         | Set to `true` on your live demo deployment (see below)       |

## 🔐 Authentication

This template includes a complete authentication system with secure password hashing and session management.

### Features

- ✅ User registration with validation
- ✅ Secure login
- ✅ Argon2 password hashing (industry standard)
- ✅ Session-based authentication
- ✅ Automatic session renewal
- ✅ Hardened session cookies (`HttpOnly`, `SameSite=Lax`, `Secure` in production)
- ✅ Persistent rate limiting on sign-in/sign-up (database-backed, survives serverless cold starts)
- ✅ Protected route helpers
- ✅ Sign out functionality

### How It Works

Authentication is handled in `src/hooks.server.ts`, which validates sessions on every request. User data is available in `event.locals.user` throughout your application.

### Security Hardening

- **Security headers**: Set globally in `src/hooks.server.ts` (e.g. `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, COOP/CORP, and HSTS in production).
- **Cookie policy**: Centralized in `src/lib/server/security.ts` and applied by `src/lib/server/auth.ts`.
- **Rate limiting**: Implemented in `src/lib/server/rate-limit.ts` and enforced in:
  - `src/routes/sign-in/+page.server.ts`
  - `src/routes/sign-up/+page.server.ts`

> Rate limiting uses the same Turso database as the rest of the app, so limits are shared across all serverless instances and survive cold starts. The `rate_limit` table is cleaned up automatically on ~2% of requests via `hooks.server.ts`.

### Protecting Routes

To protect a route, add this to your `+page.server.ts`:

```typescript
import { redirect } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const { locals } = getRequestEvent();

  if (!locals.user) {
    redirect(302, '/sign-in');
  }

  return {
    user: locals.user
  };
};
```

### Accessing User Data

In any server-side code (load functions, actions, API routes):

```typescript
// User is available in event.locals
const user = event.locals.user;
const session = event.locals.session;
```

In Svelte components:

```svelte
<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

{#if data.user}
	<p>Welcome, {data.user.username}!</p>
{/if}
```

## 🎨 UI Components

This template uses [shadcn-svelte](https://www.shadcn-svelte.com) components built on top of [bits-ui](https://bits-ui.com) and styled with Tailwind CSS v4.

### Included Components

- Button
- Card
- Input
- Label
- Alert
- Dropdown Menu

### Adding More Components

Add any component from the shadcn-svelte library:

```bash
npx shadcn-svelte@latest add <component-name>
```

Popular components to add:

- `dialog` - Modal dialogs
- `select` - Select dropdowns
- `table` - Data tables
- `form` - Form handling
- `toast` - Toast notifications
- `tabs` - Tabbed interfaces

### Customization

All components are in `src/lib/components/ui/` and can be customized to match your brand. The design system uses CSS variables for easy theming (see `src/app.css`).

## Icons with Iconify

This template includes [Iconify](https://iconify.design) support for Tailwind CSS 4, giving you access to over 275,000 icons from popular icon sets.

### Basic Usage

Use icons with the dynamic selector syntax:

```html
<!-- Material Design Light icons -->
<span class="icon-[mdi-light--home]"></span>
<span class="icon-[mdi-light--user]"></span>

<!-- Lucide icons -->
<span class="icon-[lucide--search]"></span>
<span class="icon-[lucide--heart]"></span>

<!-- Heroicons -->
<span class="icon-[heroicons--bars-3]"></span>
<span class="icon-[heroicons--x-mark]"></span>
```

### Finding Icons

1. Browse icons at [Iconify icon sets website](https://icon-sets.iconify.design/)
2. Search for the icon you want
3. Click on the icon
4. In code options, select "CSS" → "Tailwind CSS"
5. Copy the generated class name

### Icon Syntax

The syntax follows this pattern: `icon-[{prefix}--{name}]`

- `{prefix}`: Icon set prefix (e.g., `mdi-light`, `lucide`, `heroicons`)
- `{name}`: Icon name with hyphens instead of spaces

### Styling Icons

Icons inherit text color and can be styled like text:

```html
<!-- Colored icons -->
<span class="icon-[lucide--heart] text-red-500"></span>
<span class="icon-[mdi-light--home] text-blue-600"></span>

<!-- Sized icons -->
<span class="icon-[lucide--search] text-lg"></span>
<span class="icon-[heroicons--bars-3] text-2xl"></span>

<!-- Combined styling -->
<span class="text-xl text-green-500 icon-[mdi-light--user]"></span>
```

### Popular Icon Sets

- **Lucide** (`lucide--*`) - Clean, consistent icons
- **Material Design Light** (`mdi-light--*`) - Google's Material Design
- **Heroicons** (`heroicons--*`) - Tailwind UI's icon set
- **Tabler** (`tabler--*`) - Free SVG icons
- **Phosphor** (`ph--*`) - Flexible icon family

### Example in Components

```svelte
<!-- Navigation.svelte -->
<nav class="flex items-center gap-4">
	<a href="/" class="flex items-center gap-2">
		<span class="icon-[lucide--home] text-lg"></span>
		Home
	</a>
	<a href="/dashboard" class="flex items-center gap-2">
		<span class="icon-[lucide--layout-dashboard] text-lg"></span>
		Dashboard
	</a>
	<button class="flex items-center gap-2">
		<span class="icon-[lucide--user] text-lg"></span>
		Profile
	</button>
</nav>
```

## 🔌 API Routes

This template includes example API routes to demonstrate common patterns:

### Health Check Endpoint

Check if your setup is working correctly:

```bash
curl http://localhost:5173/api/health
```

Returns database connection status and environment configuration. Useful for verifying your setup after running `bun run setup`.

### Example API Route

See `src/routes/api/example/+server.ts` for a complete example showing:

- GET endpoint with query parameters
- POST endpoint with authentication
- Error handling
- Type-safe responses

You can test it:

```bash
# GET request
curl http://localhost:5173/api/example?name=World&count=5

# POST request (requires authentication)
curl -X POST http://localhost:5173/api/example \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev)
- **Database**: [Turso](https://turso.tech) (LibSQL)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team)
- **Authentication**: Custom implementation with Argon2 password hashing
- **UI Components**: [shadcn-svelte](https://www.shadcn-svelte.com)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Deployment**: [Vercel](https://vercel.com)

## 🎭 Showcase Deployment

You can run two separate deployments from one codebase:

| | GitHub Template | Live Demo |
|---|---|---|
| **Purpose** | What people clone | What you link to publicly |
| **Auth UI** | Visible | Hidden (no real user auth) |
| **DB** | Not required for dev | Real Turso DB |
| **Setup** | None | `TEMPLATE_SHOWCASE_MODE=true` in Vercel |

**How to set up the live demo:**

1. Deploy to Vercel normally
2. In Vercel → Project Settings → Environment Variables, add:
   ```
   TEMPLATE_SHOWCASE_MODE=true
   ```
3. The navigation auth buttons disappear, making the UI safe to showcase without a working login flow

The GitHub template repo stays clean — users who clone it get the full auth experience.

## 🐛 Troubleshooting

### Database Connection Issues

**Problem**: Can't connect to database

**Solutions**:

- ✅ In dev with no `.env` — run `bun run db:push` once to create `local.db`
- ✅ In production — verify `DATABASE_URL` and `DATABASE_AUTH_TOKEN` are set in Vercel
- ✅ Ensure your Turso database is active: `turso db list`
- ✅ Verify tables exist: `bun run db:push`
- ✅ Test connection: `bun run db:studio`

### Authentication Not Working

**Problem**: Users can't sign in or sessions don't persist

**Solutions**:

- ✅ Ensure database tables exist (`user` and `session`)
- ✅ Check environment variables are loaded correctly
- ✅ Verify cookies are enabled in your browser
- ✅ Check browser console for errors
- ✅ Ensure `hooks.server.ts` is properly configured

### Setup Script Issues

**Problem**: Setup script fails

**Solutions**:

- ✅ Verify Turso CLI is installed: `turso --version`
- ✅ Check you're logged in: `turso auth login`
- ✅ Ensure you have write permissions in the project directory
- ✅ Try running manually (see Manual Setup section)

### Build Errors

**Problem**: Build fails on Vercel or locally

**Solutions**:

- ✅ Set all environment variables in Vercel (Production, Preview, Development)
- ✅ Verify `DATABASE_AUTH_TOKEN` is set for production builds
- ✅ Check Node.js version is 22+ in Vercel settings
- ✅ Review build logs for specific error messages
- ✅ Run `bun run check` locally to catch TypeScript errors

### Common Issues

**Port already in use**:

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

**Module not found errors**:

```bash
# Clear cache and reinstall
rm -rf node_modules .svelte-kit
bun install
```

## Additional Resources

- **[TEMPLATE_USAGE.md](./TEMPLATE_USAGE.md)** - Complete guide on using GitHub templates
- **[VERIFICATION.md](./VERIFICATION.md)** - Detailed verification guide for all features
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Guidelines for contributing to this template
- **[ACCESSIBILITY_SEO.md](./ACCESSIBILITY_SEO.md)** - Accessibility and SEO best practices

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
