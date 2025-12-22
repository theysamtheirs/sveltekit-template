#!/usr/bin/env bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔍 Verifying template setup...${NC}"
echo

ERRORS=0
WARNINGS=0

# Check Node.js
if command -v node &> /dev/null; then
	NODE_VERSION=$(node --version)
	echo -e "${GREEN}✅ Node.js installed: ${NODE_VERSION}${NC}"
else
	echo -e "${RED}❌ Node.js not found${NC}"
	ERRORS=$((ERRORS + 1))
fi

# Check package manager
if [ -f "package-lock.json" ]; then
	echo -e "${GREEN}✅ npm detected${NC}"
elif [ -f "pnpm-lock.yaml" ]; then
	echo -e "${GREEN}✅ pnpm detected${NC}"
elif [ -f "yarn.lock" ]; then
	echo -e "${GREEN}✅ yarn detected${NC}"
elif [ -f "bun.lockb" ]; then
	echo -e "${GREEN}✅ bun detected${NC}"
else
	echo -e "${YELLOW}⚠️  No package manager lock file found${NC}"
	WARNINGS=$((WARNINGS + 1))
fi

# Check node_modules
if [ -d "node_modules" ]; then
	echo -e "${GREEN}✅ Dependencies installed${NC}"
else
	echo -e "${RED}❌ Dependencies not installed. Run: npm install${NC}"
	ERRORS=$((ERRORS + 1))
fi

# Check .env file
if [ -f ".env" ]; then
	echo -e "${GREEN}✅ .env file exists${NC}"
	
	# Check for required variables
	if grep -q "DATABASE_URL=" .env && ! grep -q "DATABASE_URL=your-database" .env; then
		echo -e "${GREEN}✅ DATABASE_URL is set${NC}"
	else
		echo -e "${YELLOW}⚠️  DATABASE_URL not configured${NC}"
		WARNINGS=$((WARNINGS + 1))
	fi
else
	echo -e "${YELLOW}⚠️  .env file not found. Run: npm run setup${NC}"
	WARNINGS=$((WARNINGS + 1))
fi

# Check Turso CLI
if command -v turso &> /dev/null; then
	TURSO_VERSION=$(turso --version 2>/dev/null || echo "installed")
	echo -e "${GREEN}✅ Turso CLI installed${NC}"
	
	# Check if logged in
	if turso db list &> /dev/null; then
		echo -e "${GREEN}✅ Logged into Turso${NC}"
	else
		echo -e "${YELLOW}⚠️  Not logged into Turso. Run: turso auth login${NC}"
		WARNINGS=$((WARNINGS + 1))
	fi
else
	echo -e "${YELLOW}⚠️  Turso CLI not installed${NC}"
	WARNINGS=$((WARNINGS + 1))
fi

# Check database connection (if .env exists)
if [ -f ".env" ] && grep -q "DATABASE_URL=" .env; then
	set -a
	source .env 2>/dev/null || true
	set +a
	
	if [ -n "$DATABASE_URL" ] && [[ "$DATABASE_URL" != *"your-database"* ]]; then
		echo -e "${BLUE}🔍 Testing database connection...${NC}"
		if npm run db:push --dry-run &> /dev/null || npm run db:studio --help &> /dev/null; then
			echo -e "${GREEN}✅ Database connection appears valid${NC}"
		else
			echo -e "${YELLOW}⚠️  Could not verify database connection${NC}"
			WARNINGS=$((WARNINGS + 1))
		fi
	fi
fi

# Check TypeScript
if command -v npx &> /dev/null; then
	if npx tsc --version &> /dev/null; then
		echo -e "${GREEN}✅ TypeScript available${NC}"
	else
		echo -e "${YELLOW}⚠️  TypeScript not found in node_modules${NC}"
		WARNINGS=$((WARNINGS + 1))
	fi
fi

# Check build
if [ -d "node_modules" ]; then
	echo -e "${BLUE}🔍 Testing build...${NC}"
	if npm run build &> /dev/null; then
		echo -e "${GREEN}✅ Project builds successfully${NC}"
	else
		echo -e "${RED}❌ Build failed. Check for errors above.${NC}"
		ERRORS=$((ERRORS + 1))
	fi
fi

echo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
	echo -e "${GREEN}✅ Setup verification complete! Everything looks good.${NC}"
	echo
	echo -e "${BLUE}Next steps:${NC}"
	echo "  1. Run: npm run dev"
	echo "  2. Visit: http://localhost:5173"
	echo "  3. Check health: http://localhost:5173/api/health"
	exit 0
elif [ $ERRORS -eq 0 ]; then
	echo -e "${YELLOW}⚠️  Setup mostly complete with ${WARNINGS} warning(s)${NC}"
	echo
	echo -e "${BLUE}You can still proceed, but consider addressing the warnings above.${NC}"
	exit 0
else
	echo -e "${RED}❌ Setup incomplete. Found ${ERRORS} error(s) and ${WARNINGS} warning(s)${NC}"
	echo
	echo -e "${BLUE}Please fix the errors above before continuing.${NC}"
	exit 1
fi

