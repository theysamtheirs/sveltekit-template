#!/usr/bin/env bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

# Run database push
echo "Pushing database schema..."
if command -v bun &> /dev/null; then
    bun db:push
elif command -v npm &> /dev/null; then
    npm run db:push
elif command -v pnpm &> /dev/null; then
    pnpm db:push
elif command -v yarn &> /dev/null; then
    yarn db:push
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
