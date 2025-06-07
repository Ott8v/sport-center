#!/bin/bash
set -e

#install dependencies
echo "Installing dependencies..."
npm install

# Run migrations
echo "Running migrations..."
node ace migration:run

echo "Starting application..."
exec npm run dev
