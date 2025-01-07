#!/bin/bash
set -e

# Wait for database to be ready
echo "Waiting for database..."
while ! nc -z db 5432; do
  sleep 1
done

# Run database migrations
echo "Running database migrations..."
alembic upgrade head || {
    echo "Migration failed, checking if tables exist..."
    if psql $DATABASE_URL -c '\dt' | grep -q 'photos\|posts\|tags'; then
        echo "Tables already exist, skipping migrations"
    else
        echo "Migration failed and tables don't exist"
        exit 1
    fi
}

# Start the application
echo "Starting FastAPI application..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
