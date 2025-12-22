# Using This Template

This guide explains how GitHub template repositories work and how to use this template for your projects.

## 📚 Understanding Template Repositories

### What is a GitHub Template Repository?

A **template repository** is a special type of GitHub repository that allows users to create a new repository from it. Unlike forking or cloning, using a template:

- ✅ Creates a **brand new repository** (not connected to the template)
- ✅ Starts with a **fresh git history** (no template commit history)
- ✅ Gives you **full ownership** (you can do anything with it)
- ✅ **No connection** to the original template (won't show "forked from")

### Template vs Fork vs Clone

| Method | Use Case | Git History | Connection to Original |
|--------|---------|-------------|----------------------|
| **Template** | Starting new projects | Fresh history | None - completely independent |
| **Fork** | Contributing back | Full history | Shows "forked from" |
| **Clone** | Local development | Full history | Remote connection |

## 🎯 How to Use This Template

### Option 1: Use GitHub's "Use This Template" Button (Recommended)

This is the easiest and recommended way:

1. **Go to the template repository** on GitHub
2. **Click the green "Use this template" button** (top right, next to "Code")
3. **Select "Create a new repository"**
4. **Choose:**
   - Repository name (e.g., `my-awesome-app`)
   - Description
   - Visibility (Public/Private)
   - **DO NOT** check "Include all branches" (you only need `main`)
5. **Click "Create repository"**

**What happens:**
- ✅ GitHub creates a new repository with all the template files
- ✅ Fresh git history (no template commits)
- ✅ You own it completely
- ✅ Ready to clone and start coding

### Option 2: Manual Setup (Alternative)

If you prefer more control:

1. **Create a new empty repository** on GitHub
2. **Clone this template:**
   ```bash
   git clone https://github.com/your-username/sveltekit-template.git my-new-project
   cd my-new-project
   ```

3. **Remove the existing git history:**
   ```bash
   rm -rf .git
   ```

4. **Initialize new git repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit from template"
   ```

5. **Connect to your new repository:**
   ```bash
   git remote add origin https://github.com/your-username/my-new-project.git
   git branch -M main
   git push -u origin main
   ```

## 🚀 After Creating from Template

Once you've created your repository from the template:

### 1. Clone Your New Repository

```bash
git clone https://github.com/your-username/my-new-project.git
cd my-new-project
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
# or
bun install
```

### 3. Run Setup

```bash
# Make sure you're logged into Turso
turso auth login

# Run automated setup
npm run setup
```

### 4. Customize for Your Project

Update these files with your project details:

- **`package.json`**: Change `name` and `version`
- **`README.md`**: Update with your project description
- **`src/routes/+page.svelte`**: Customize landing page
- **`src/lib/components/Navigation.svelte`**: Update app name
- **`.env.example`**: Add any additional environment variables you need

### 5. Start Building!

```bash
npm run dev
```

## 🔧 Setting Up This Repository as a Template

If you want to make this repository a GitHub template:

### Step 1: Enable Template Repository

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Template repository** section
4. Check **"Template repository"**
5. Click **Save**

### Step 2: Add Template Badge (Optional)

Add this to your README to show it's a template:

```markdown
[![Use this template](https://img.shields.io/badge/Use%20this%20template-000000?style=for-the-badge&logo=github)](https://github.com/your-username/sveltekit-template/generate)
```

### Step 3: Update README

Make sure your README clearly indicates it's a template and includes:
- Clear "Use this template" instructions
- What the template includes
- Quick start guide
- Customization instructions

## 📝 What Gets Copied?

When someone uses your template, they get:

✅ **All files and folders**
✅ **All code and configurations**
✅ **GitHub Actions workflows** (`.github/workflows/`)
✅ **VS Code settings** (`.vscode/`)
✅ **Documentation** (README, CONTRIBUTING, etc.)

❌ **NOT copied:**
- Git history (fresh start)
- Issues and pull requests
- GitHub Actions run history
- Repository settings
- Environment variables/secrets
- `.env` files (they're gitignored)

## 🎨 Best Practices for Template Users

### 1. Update Project Identity

After creating from template, immediately update:

```bash
# package.json
{
  "name": "your-project-name",
  "version": "0.1.0"
}

# README.md - Update title and description
# Navigation.svelte - Update app name
# Landing page - Customize for your project
```

### 2. Remove Template-Specific Content

Consider removing or updating:
- Template documentation (like this file) if not needed
- Example/demo routes if not using them
- Template-specific scripts if customizing

### 3. Set Up Your Environment

```bash
# Create your .env file
cp .env.example .env

# Run setup
npm run setup

# Verify everything works
npm run verify
```

### 4. Initialize Your Own Git History

```bash
# Make your first commit
git add .
git commit -m "Initial commit: project setup from template"

# Push to your repository
git push origin main
```

## 🔄 Updating from Template

**Important:** Once you create a repository from a template, it's completely independent. You won't automatically get updates from the template.

If you want to pull in updates:

1. **Add template as a remote:**
   ```bash
   git remote add template https://github.com/original-owner/sveltekit-template.git
   ```

2. **Fetch template updates:**
   ```bash
   git fetch template
   ```

3. **Merge specific updates:**
   ```bash
   git merge template/main --allow-unrelated-histories
   ```

   Or cherry-pick specific commits you want.

## ❓ FAQ

### Q: Should I fork or use as template?

**A:** Use as template if you're starting a new project. Fork if you want to contribute back to the template.

### Q: Can I use this template for commercial projects?

**A:** Check the LICENSE file. Most templates are MIT licensed and allow commercial use.

### Q: Will my repository show "forked from"?

**A:** No! Template repositories create completely independent repositories.

### Q: Can I update my project from the template later?

**A:** Not automatically. You'd need to manually merge changes (see "Updating from Template" above).

### Q: What if I want to contribute to the template?

**A:** Fork the repository, make changes, and submit a pull request.

## 🎯 Quick Reference

**For Template Users:**
1. Click "Use this template" on GitHub
2. Create new repository
3. Clone your new repository
4. Run `npm install && npm run setup`
5. Start building!

**For Template Maintainers:**
1. Enable "Template repository" in Settings
2. Keep template up to date
3. Write clear documentation
4. Make it easy to customize

---

**Need help?** Open an issue on the template repository or check the main README for setup instructions.

