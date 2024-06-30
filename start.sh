#!/bin/bash
set -e

# Load environment variables from .env file if it exists
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Install dependencies
npm install

# Generate Prisma Client
npm run generate

# Run database migrations
npx prisma migrate deploy

# Start the application
npm start
