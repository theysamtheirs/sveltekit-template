#!/usr/bin/env bash
set -e

# 1. Ask for a db name (or generate one)
read -p "Turso DB name (e.g. my-app-dev): " DB_NAME

# 2. Create DB (no-op if it already exists, you can tweak)
turso db create "$DB_NAME" || echo "DB may already exist, continuing..."

# 3. Get URL
DB_URL=$(turso db show "$DB_NAME" --url)

# 4. Create token
DB_TOKEN=$(turso db tokens create "$DB_NAME" --expiration 30d | tr -d '\n')

# 5. Write/update .env
if [ ! -f ".env" ]; then
  cp .env.example .env 2>/dev/null || touch .env
fi

# Remove old lines if they exist
sed -i '' '/DATABASE_URL/d' .env 2>/dev/null || true
sed -i '' '/DATABASE_AUTH_TOKEN/d' .env 2>/dev/null || true

{
    echo "DATABASE_URL=$DB_URL"
    echo "DATABASE_AUTH_TOKEN=$DB_TOKEN"
} >> .env

echo
echo "✅ Updated .env with Turso credentials for $DB_NAME"
echo
echo "🔗 For Vercel, copy the block below and paste into the Environment Variables UI:"
echo "-----------------------------------------------------"
echo "DATABASE_URL=$DB_URL"
echo "DATABASE_AUTH_TOKEN=$DB_TOKEN"
echo "-----------------------------------------------------"
echo "Then choose the appropriate environment (Development/Preview/Production)."
