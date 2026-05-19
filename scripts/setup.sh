#!/usr/bin/env sh
set -e

echo "Setting up Monolith Platform..."

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example"
fi

pnpm install
pnpm db:generate

echo "Setup complete. Run 'pnpm dev' or 'pnpm docker:up'."
