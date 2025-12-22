# Contributing Guide

Thank you for your interest in improving this template! This guide will help you get started.

## 🚀 Quick Start

1. **Fork and clone** the repository
2. **Install dependencies**: `npm install`
3. **Set up your environment**: `npm run setup`
4. **Start developing**: `npm run dev`

## 📋 Development Workflow

### Before You Start

- Run `npm run verify-setup` to ensure everything is configured correctly
- Check existing issues and pull requests to avoid duplicate work
- For major changes, consider opening an issue first to discuss

### Making Changes

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the code style guidelines below

3. **Test your changes**:
   ```bash
   npm run lint      # Check linting
   npm run check     # Check types
   npm run build     # Ensure it builds
   npm run dev       # Test locally
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and create a PR**:
   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 Code Style

### TypeScript

- Use **strict mode** (already configured)
- Avoid `any` types - use proper types or `unknown`
- Use type inference where possible
- Export types from schema files

### Svelte

- Use **Svelte 5 runes syntax** (`$props()`, `$state()`, `$derived()`)
- Keep components focused and reusable
- Use shadcn-svelte components when possible
- Follow the existing component structure

### Formatting

- Run `npm run format` before committing
- Use tabs for indentation (configured in Prettier)
- Single quotes for JavaScript/TypeScript
- Double quotes for HTML attributes

### File Naming

- Components: `PascalCase.svelte`
- Utilities: `kebab-case.ts`
- Routes: Follow SvelteKit conventions (`+page.svelte`, `+page.server.ts`)

## 🧪 Testing

Before submitting a PR, ensure:

- ✅ Code passes linting: `npm run lint`
- ✅ TypeScript checks pass: `npm run check`
- ✅ Project builds successfully: `npm run build`
- ✅ No console errors in development
- ✅ Changes work in both dev and production builds

## 📦 Adding Features

### Adding a New Route

1. Create route directory: `src/routes/your-route/`
2. Add `+page.svelte` for the component
3. Add `+page.server.ts` if you need server-side logic
4. Update navigation if it should be accessible

### Adding a Database Table

1. Edit `src/lib/server/db/schema.ts`
2. Export the type: `export type YourTable = typeof yourTable.$inferSelect;`
3. Document the change in your PR

### Adding a UI Component

Use shadcn-svelte CLI:
```bash
npx shadcn-svelte@latest add component-name
```

## 🐛 Reporting Issues

When reporting issues, please include:

- **Description**: Clear description of the issue
- **Steps to reproduce**: Step-by-step instructions
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: Node version, OS, browser (if relevant)
- **Screenshots**: If applicable

## 💡 Pull Request Guidelines

### PR Title Format

Use conventional commits format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `style:` for formatting
- `refactor:` for code refactoring
- `test:` for tests
- `chore:` for maintenance

Examples:
- `feat: add user profile page`
- `fix: resolve database connection issue`
- `docs: update README with new setup steps`

### PR Description

Include:
- **What**: What changes you made
- **Why**: Why you made these changes
- **How**: How to test the changes
- **Screenshots**: If UI changes

### Review Process

- All PRs require review before merging
- Address review comments promptly
- Keep PRs focused - one feature/fix per PR
- Keep PRs small when possible for easier review

## 🎯 Areas for Contribution

We welcome contributions in these areas:

- **Documentation**: Improving README, adding examples
- **Examples**: Adding example routes, API endpoints
- **UI Components**: Adding more shadcn-svelte components
- **Error Handling**: Better error messages and handling
- **Developer Experience**: Improving setup scripts, tooling
- **Performance**: Optimizations and best practices
- **Accessibility**: Improving a11y features

## ❓ Questions?

- Open an issue for questions or discussions
- Check existing issues and PRs first
- Be respectful and constructive in all interactions

Thank you for contributing! 🎉

