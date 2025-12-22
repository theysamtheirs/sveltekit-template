#!/usr/bin/env bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if turso CLI is installed
if ! command -v turso &> /dev/null; then
    echo -e "${RED}❌ Error: Turso CLI is not installed.${NC}"
    echo "Install it with:"
    echo "  macOS:   brew install tursodatabase/tap/turso"
    echo "  Linux:   curl -sSfL https://get.tur.so/install.sh | bash"
    echo "  Windows: scoop bucket add turso https://github.com/tursodatabase/scoop-turso.git && scoop install turso"
    exit 1
fi

# Check if user is logged in to Turso
if ! turso db list &> /dev/null; then
    echo -e "${YELLOW}⚠️  You're not logged in to Turso.${NC}"
    echo "Please run: turso auth login"
    exit 1
fi

# 1. Ask for a db name
read -p "Turso DB name (e.g. my-app-dev): " DB_NAME

if [ -z "$DB_NAME" ]; then
    echo -e "${RED}❌ Error: Database name cannot be empty.${NC}"
    exit 1
fi

# 2. Create DB (no-op if it already exists)
echo "Creating database '$DB_NAME'..."
if turso db create "$DB_NAME" 2>/dev/null; then
    echo -e "${GREEN}✅ Database created successfully.${NC}"
else
    echo -e "${YELLOW}⚠️  Database may already exist, continuing...${NC}"
fi

# 3. Get URL
echo "Fetching database URL..."
DB_URL=$(turso db show "$DB_NAME" --url)

if [ -z "$DB_URL" ]; then
    echo -e "${RED}❌ Error: Failed to get database URL.${NC}"
    exit 1
fi

# 4. Create token
echo "Creating database token..."
DB_TOKEN=$(turso db tokens create "$DB_NAME" --expiration 30d 2>/dev/null | tr -d '\n' | tr -d '\r')

if [ -z "$DB_TOKEN" ]; then
    echo -e "${RED}❌ Error: Failed to create database token.${NC}"
    exit 1
fi

# 5. Write/update .env
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "Created .env from .env.example"
    else
        touch .env
        echo "Created new .env file"
    fi
fi

# Cross-platform sed to remove old lines
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' '/^DATABASE_URL=/d' .env 2>/dev/null || true
    sed -i '' '/^DATABASE_AUTH_TOKEN=/d' .env 2>/dev/null || true
else
    # Linux
    sed -i '/^DATABASE_URL=/d' .env 2>/dev/null || true
    sed -i '/^DATABASE_AUTH_TOKEN=/d' .env 2>/dev/null || true
fi

# Append new values
{
    echo "DATABASE_URL=\"$DB_URL\""
    echo "DATABASE_AUTH_TOKEN=\"$DB_TOKEN\""
} >> .env

echo -e "${GREEN}✅ Updated .env with Turso credentials${NC}"

# Export variables for current session
export DATABASE_URL="$DB_URL"
export DATABASE_AUTH_TOKEN="$DB_TOKEN"

# Clear any potential drizzle-kit cache to avoid stale schema comparisons
if [ -d ".drizzle" ]; then
    echo "Clearing Drizzle cache..."
    rm -rf .drizzle
fi

# Run database push with explicit environment variables
# This ensures the new database URL is used, not any cached values
echo "Pushing database schema to new database..."
if command -v bun &> /dev/null; then
    DATABASE_URL="$DB_URL" DATABASE_AUTH_TOKEN="$DB_TOKEN" bun db:push
elif command -v npm &> /dev/null; then
    DATABASE_URL="$DB_URL" DATABASE_AUTH_TOKEN="$DB_TOKEN" npm run db:push
elif command -v pnpm &> /dev/null; then
    DATABASE_URL="$DB_URL" DATABASE_AUTH_TOKEN="$DB_TOKEN" pnpm db:push
elif command -v yarn &> /dev/null; then
    DATABASE_URL="$DB_URL" DATABASE_AUTH_TOKEN="$DB_TOKEN" yarn db:push
else
    echo -e "${YELLOW}⚠️  Could not find package manager. Please run 'npm run db:push' manually.${NC}"
fi

echo
echo -e "${GREEN}✅ Setup complete!${NC}"
echo
echo "🔗 For Vercel deployment, add these environment variables:"
echo "-----------------------------------------------------"
echo "DATABASE_URL=$DB_URL"
echo "DATABASE_AUTH_TOKEN=$DB_TOKEN"
echo "-----------------------------------------------------"
echo "Go to: Project Settings → Environment Variables"
echo "Then choose the appropriate environment (Development/Preview/Production)."
echo

# Ask if user wants to create GitHub repository
read -p "Would you like to create a GitHub repository? (y/n): " CREATE_REPO

if [[ "$CREATE_REPO" =~ ^[Yy]$ ]]; then
	# Check if GitHub CLI is installed
	if ! command -v gh &> /dev/null; then
		echo -e "${YELLOW}⚠️  GitHub CLI (gh) is not installed.${NC}"
		echo "Install it with:"
		echo "  macOS:   brew install gh"
		echo "  Linux:   See https://cli.github.com/manual/installation"
		echo "  Windows: winget install --id GitHub.cli"
		echo
		echo "You can create a repository manually at: https://github.com/new"
		exit 0
	fi

	# Check if user is logged in to GitHub
	if ! gh auth status &> /dev/null; then
		echo -e "${YELLOW}⚠️  You're not logged in to GitHub.${NC}"
		echo "Please run: gh auth login"
		echo
		echo "You can create a repository manually at: https://github.com/new"
		exit 0
	fi

	echo
	echo -e "${BLUE}🚀 Creating GitHub repository...${NC}"
	echo "This will open an interactive prompt. Select:"
	echo "  • 'Push an existing local repository to github.com'"
	echo "  • Use current directory (.)"
	echo "  • Follow the prompts for name, visibility, etc."
	echo

	# Temporarily disable exit on error for gh repo create
	# (user might cancel, which is fine)
	set +e
	gh repo create
	GH_EXIT_CODE=$?
	set -e

	if [ $GH_EXIT_CODE -eq 0 ]; then
		echo
		echo -e "${GREEN}✅ GitHub repository created successfully!${NC}"
		echo
		echo "Next steps:"
		echo "  1. Your code is now on GitHub"
		echo "  2. Deploy to Vercel: https://vercel.com/new"
		echo "  3. Add the environment variables shown above to Vercel"
	else
		echo
		echo -e "${YELLOW}⚠️  Repository creation was cancelled or failed.${NC}"
		echo "You can create a repository manually at: https://github.com/new"
		echo "Or try again later with: gh repo create"
	fi
elif [[ "$CREATE_REPO" =~ ^[Nn]$ ]]; then
	echo
	echo "You can create a repository later with:"
	echo "  gh repo create"
	echo "Or manually at: https://github.com/new"
else
	echo
	echo -e "${YELLOW}⚠️  Invalid response. Skipping repository creation.${NC}"
	echo "You can create a repository later with:"
	echo "  gh repo create"
fi
