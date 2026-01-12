# Inventory App AI — Backend

Simple Express + PostgreSQL backend providing a health check and CRUD for products.

Requirements
- Node >=20
- npm >=9
- PostgreSQL 14+

Quick start
1. Install: `npm install`
2. Create `.env` files (`.env.dev`, `.env.test`) from `.env.example`
3. Run (dev): `npm run dev`
4. Run (prod): `npm start`

Migrations
- Create: `npm run migrate:create -- <name>`
- Up: `npm run migrate:up`
- Down: `npm run migrate:down`
- Test migrations: `npm run migrate:test`

Run
- Dev: `npm run dev`
- Prod: `npm start`

Tests
- `npm test` (runs test migrations and Jest)

API
- GET /health
- Products (prefix `/api/products`): GET /, GET /:id, POST /, PUT /:id, DELETE /:id

Project structure
- `src/` — app, server, routes, controllers, services, db
- `migrations/` — database migrations
- `tests/` — tests

## Security / Secrets
- Do not commit `.env` or real credentials.
- Use placeholders in docs and `.env.example`.
- Ensure `uuid-ossp` extension is available (migration creates it if missing).
