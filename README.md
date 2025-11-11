# SvelteKit Template

A modern, production-ready SvelteKit template with authentication, database, and beautiful UI components. Built with SvelteKit, Turso, Lucia Auth, Drizzle ORM, shadcn-svelte, and Tailwind CSS.

## Features

- 🔐 **Authentication** - Secure user authentication with Lucia Auth
- 🗄️ **Database** - Turso (LibSQL) database with Drizzle ORM
- 🎨 **UI Components** - shadcn-svelte components with Tailwind CSS v4
- 🚀 **Deployment Ready** - Configured for Vercel deployment
- 📱 **Responsive Design** - Mobile-first, modern UI
- 🔒 **Type Safe** - Full TypeScript support

## Prerequisites

Before you begin, make sure you have the following accounts set up:

- **Turso Account** - For the database ([Sign up here](https://turso.tech))
- **GitHub Account** - For version control and CI/CD
- **Vercel Account** - For deployment ([Sign up here](https://vercel.com))

You'll also need:
- Node.js 18+ installed
- npm, pnpm, or yarn package manager
- Turso CLI installed (`brew install tursodatabase/tap/turso` or see [Turso CLI docs](https://docs.turso.tech/cli/installation))

## Getting Started

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/theysamtheirs/sveltekit-template.git
cd sveltekit-template

# Install dependencies
npm install
```

### 2. Set Up Turso Database

1. **Install Turso CLI** (if not already installed):
   ```bash
   # macOS
   brew install tursodatabase/tap/turso
   
   # Linux
   curl -sSfL https://get.tur.so/install.sh | bash
   
   # Windows (using Scoop)
   scoop bucket add turso https://github.com/tursodatabase/scoop-turso.git
   scoop install turso
   ```

2. **Log in to Turso**:
   ```bash
   turso auth login
   ```

3. **Create a database**:
   ```bash
   turso db create <your-database-name>
   ```

4. **Get your database credentials**:
   ```bash
   # Get the database URL
   turso db show <your-database-name> --url
   
   # Get the auth token
   turso db tokens create <your-database-name>
   ```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then add your Turso credentials:

```env
DATABASE_URL=libsql://your-database-url.turso.io
DATABASE_AUTH_TOKEN=your-auth-token-here
```

> **Note**: In development, `DATABASE_AUTH_TOKEN` is optional. However, it's required for production deployments.

### 4. Run Database Migrations

Push the database schema to your Turso database:

```bash
npm run db:push
```

This will create the necessary tables (`user` and `session`) in your database.

### 5. Start Development Server

```bash
npm run dev

# or start with auto-open
npm run dev -- --open
```

Visit `http://localhost:5173` to see your application.

## Project Structure

```
sveltekit-template/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ui/          # shadcn-svelte components
│   │   │   └── Navigation.svelte
│   │   ├── server/
│   │   │   ├── auth.ts     # Lucia auth configuration
│   │   │   └── db/         # Database schema and connection
│   │   └── utils.ts
│   ├── routes/
│   │   ├── sign-in/        # Sign in page
│   │   ├── sign-up/        # Sign up page
│   │   ├── dashboard/      # Protected dashboard
│   │   └── +layout.svelte  # Root layout with navigation
│   └── app.css
├── drizzle.config.ts       # Drizzle ORM configuration
├── svelte.config.js        # SvelteKit configuration
└── package.json
```

## Database Commands

```bash
# Push schema changes to database
npm run db:push

# Generate migrations
npm run db:generate

# Run migrations
npm run db:migrate

# Open Drizzle Studio (database GUI)
npm run db:studio
```

## Deployment to Vercel

### 1. Push to GitHub

1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

### 2. Deploy to Vercel

1. **Import your GitHub repository**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**:
   - In the Vercel project settings, go to "Environment Variables"
   - Add the following variables:
     - `DATABASE_URL` - Your Turso database URL
     - `DATABASE_AUTH_TOKEN` - Your Turso auth token

3. **Deploy**:
   - Vercel will automatically detect SvelteKit
   - Click "Deploy" and wait for the build to complete

4. **Run Database Migrations** (if needed):
   - After deployment, you may need to run migrations
   - You can do this via Vercel's CLI or add a build script

### 3. Post-Deployment

After deployment, make sure to:
- Run database migrations: `npm run db:push` (or set up a migration script)
- Verify your environment variables are set correctly
- Test authentication flows

## Environment Variables

| Variable | Description | Required | Notes |
|----------|-------------|----------|-------|
| `DATABASE_URL` | Turso database URL | Yes | Format: `libsql://your-db.turso.io` |
| `DATABASE_AUTH_TOKEN` | Turso authentication token | Production | Optional in dev, required in production |

## Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Database
npm run db:push      # Push schema to database
npm run db:generate  # Generate migrations
npm run db:migrate   # Run migrations
npm run db:studio    # Open Drizzle Studio

# Code Quality
npm run check        # Type check
npm run lint         # Lint code
npm run format       # Format code
```

## Authentication

This template uses [Lucia Auth](https://lucia-auth.com) for authentication. The authentication system includes:

- User registration and login
- Secure password hashing with Argon2
- Session management
- Protected routes

### Protected Routes

To protect a route, add this to your `+page.server.ts`:

```typescript
import { redirect } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';

export const load = async () => {
  const { locals } = getRequestEvent();
  
  if (!locals.user) {
    return redirect(302, '/sign-in');
  }
  
  return {
    user: locals.user
  };
};
```

## UI Components

This template uses [shadcn-svelte](https://www.shadcn-svelte.com) components. To add more components:

```bash
npx shadcn-svelte@latest add <component-name>
```

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev)
- **Database**: [Turso](https://turso.tech) (LibSQL)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team)
- **Authentication**: [Lucia Auth](https://lucia-auth.com)
- **UI Components**: [shadcn-svelte](https://www.shadcn-svelte.com)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Deployment**: [Vercel](https://vercel.com)

## Troubleshooting

### Database Connection Issues

- Verify your `DATABASE_URL` and `DATABASE_AUTH_TOKEN` are correct
- Make sure your Turso database is active
- Check that you've run `npm run db:push` to create tables

### Authentication Not Working

- Ensure database tables (`user` and `session`) exist
- Check that environment variables are set correctly
- Verify session cookies are being set in your browser

### Build Errors

- Make sure all environment variables are set in Vercel
- Check that `DATABASE_AUTH_TOKEN` is set for production builds
- Verify Node.js version is 18+ in Vercel settings

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
