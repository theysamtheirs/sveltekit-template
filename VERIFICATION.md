# Verification Guide

This guide helps you verify that all template features are working correctly.

## 🚀 Quick Verification

Run the automated verification script:

```bash
npm run verify
```

This checks:
- ✅ Node.js installation
- ✅ Package manager
- ✅ Dependencies
- ✅ Environment variables
- ✅ Database connection
- ✅ TypeScript
- ✅ Build process

## 📋 Step-by-Step Verification

### 1. Verify Setup Script

```bash
# Make sure you're logged into Turso
turso auth login

# Run setup (or verify existing setup)
npm run setup
```

**Expected output:**
- ✅ Database created or found
- ✅ Credentials generated
- ✅ `.env` file updated
- ✅ Schema pushed successfully
- ✅ Vercel environment variables displayed

### 2. Verify Environment Variables

```bash
# Check .env file exists
cat .env

# Should contain:
# DATABASE_URL=libsql://...
# DATABASE_AUTH_TOKEN=...
```

### 3. Verify Health Check Endpoint

```bash
# Start dev server
npm run dev

# In another terminal, test health endpoint
curl http://localhost:5173/api/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "checks": {
    "database": true,
    "environment": {
      "databaseUrl": true,
      "databaseToken": true
    },
    "timestamp": "2024-..."
  }
}
```

Or visit in browser: `http://localhost:5173/api/health`

### 4. Verify Example API Route

```bash
# GET request (no auth required)
curl "http://localhost:5173/api/example?name=Test&count=3"

# Expected response:
# {
#   "message": "Hello, Test!",
#   "count": 3,
#   "user": null,
#   "timestamp": "..."
# }

# POST request (requires auth - sign in first)
curl -X POST http://localhost:5173/api/example \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}' \
  --cookie "auth-session=YOUR_SESSION_TOKEN"
```

### 5. Verify Error Pages

Visit these URLs in your browser:

```bash
# 404 Error Page
http://localhost:5173/nonexistent-page

# Should show custom 404 page with:
# - "404" heading
# - "Page Not Found" message
# - "Go Home" button
```

### 6. Verify Authentication Flow

1. **Sign Up:**
   - Visit: `http://localhost:5173/sign-up`
   - Create an account
   - Should redirect to home page

2. **Sign In:**
   - Visit: `http://localhost:5173/sign-in`
   - Log in with created account
   - Should redirect to home page

3. **Protected Route:**
   - Visit: `http://localhost:5173/dashboard`
   - Should show dashboard if logged in
   - Should redirect to sign-in if not logged in

4. **Sign Out:**
   - Click sign out in navigation
   - Should redirect to home page
   - Dashboard should no longer be accessible

### 7. Verify Database Connection

```bash
# Open Drizzle Studio
npm run db:studio
```

**Expected:**
- Browser opens with Drizzle Studio
- Can see `user` and `session` tables
- Can query data

### 8. Verify TypeScript

```bash
# Type check
npm run check

# Should complete without errors
```

### 9. Verify Linting

```bash
# Run linter
npm run lint

# Should pass without errors
```

### 10. Verify Build

```bash
# Build for production
npm run build

# Should complete successfully
# Output in .svelte-kit directory

# Preview build
npm run preview

# Should start preview server
```

### 11. Verify VS Code Settings

If using VS Code:

1. **Open any `.svelte` file**
   - Should have syntax highlighting
   - Should auto-format on save

2. **Open any `.ts` file**
   - Should have TypeScript IntelliSense
   - Should show type errors inline

3. **Check recommended extensions:**
   - VS Code should prompt to install recommended extensions
   - Or check: View → Command Palette → "Extensions: Show Recommended Extensions"

### 12. Verify GitHub Actions (CI/CD)

If you've pushed to GitHub:

1. **Check Actions tab:**
   - Go to your GitHub repository
   - Click "Actions" tab
   - Should see workflow runs

2. **Trigger a workflow:**
   - Make a small change and push
   - Should trigger CI workflow
   - Should show lint, type check, and build jobs

### 13. Verify All Scripts

```bash
# Development
npm run dev          # Should start dev server

# Database
npm run db:push      # Should push schema (no-op if already synced)
npm run db:studio    # Should open Drizzle Studio

# Code Quality
npm run check        # Should type check
npm run lint         # Should lint
npm run format       # Should format code

# Build
npm run build        # Should build successfully
npm run preview      # Should preview build
```

## ✅ Complete Checklist

- [ ] Setup script runs successfully
- [ ] `.env` file created with credentials
- [ ] Health check endpoint returns `healthy`
- [ ] Example API route responds correctly
- [ ] 404 error page displays correctly
- [ ] Can sign up new user
- [ ] Can sign in existing user
- [ ] Protected routes work (dashboard)
- [ ] Can sign out
- [ ] Database connection works (Drizzle Studio)
- [ ] TypeScript checks pass
- [ ] Linting passes
- [ ] Build succeeds
- [ ] VS Code settings work (if using VS Code)
- [ ] GitHub Actions run (if pushed to GitHub)

## 🐛 Troubleshooting

If something doesn't work:

1. **Run verification script:**
   ```bash
   npm run verify
   ```

2. **Check health endpoint:**
   ```bash
   curl http://localhost:5173/api/health
   ```

3. **Check logs:**
   - Look at terminal output
   - Check browser console (F12)
   - Check network tab for API calls

4. **Re-run setup:**
   ```bash
   npm run setup
   ```

5. **Clear and reinstall:**
   ```bash
   rm -rf node_modules .svelte-kit
   npm install
   ```

## 🎯 Quick Test Commands

Run these all at once to verify everything:

```bash
# 1. Verify setup
npm run verify

# 2. Start dev server (in background or new terminal)
npm run dev

# 3. Test health endpoint
curl http://localhost:5173/api/health

# 4. Test example API
curl "http://localhost:5173/api/example?name=World"

# 5. Type check
npm run check

# 6. Lint
npm run lint

# 7. Build
npm run build
```

If all commands succeed, your template is fully functional! 🎉

