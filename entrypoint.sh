#!/bin/bash
set -e

#install dependencies
echo "📦 Installing dependencies..."
npm install

echo "🗃️  Running database migrations..."
if node ace migration:run; then
    echo "✅ Migrations completed successfully"
else
    echo "❌ Migration failed"
    exit 1
fi

echo "🎯 Starting application..."
exec npm run dev
