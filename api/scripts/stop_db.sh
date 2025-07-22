#!/bin/bash

echo "Stopping local PostgreSQL database..."
docker compose --file api/docker-compose.yml down -v db

if [ $? -eq 0 ]; then
  echo "PostgreSQL database stopped successfully."
else
  echo "Error stopping PostgreSQL database."
  exit 1
fi
