$ErrorActionPreference = "Stop"

Write-Host "Setting up Monolith Platform..."

if (-not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
  Write-Host "Created .env from .env.example"
}

pnpm install
pnpm db:generate

Write-Host "Setup complete. Run 'pnpm dev' or 'pnpm docker:up'."
