# Inventory App AI - Backend

Express + PostgreSQL service for inventory: health-check and CRUD for products.

## Stack
- Node.js (ESM), Express 5
- PostgreSQL (`pg`, `node-pg-migrate`)
- Jest + Supertest
- ESLint

## Requirements
- Node.js 18+
- PostgreSQL 14+ (local or Docker)

## Environment
Create `.env` for dev/prod and `.env.test` for tests. Never commit real `.env`; commit `.env.example` with placeholders.

Example `.env.example`:
```env
NODE_ENV=development
APP_PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=inventory_app

# Optional DSN form (use placeholders, no real creds)
DATABASE_URL=postgres://postgres:your_password@localhost:5432/inventory_app
```

Test example (`.env.test`, keep local only):
```env
NODE_ENV=test
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=inventory_app_test
DATABASE_URL=postgres://postgres:your_password@localhost:5432/inventory_app_test
```

`src/config/config.js` requires `DB_PASSWORD` or it throws on startup.

## Install
```bash
npm install
```

## Migrations
- Create: `npm run migrate:create -- name_of_migration`
- Up: `npm run migrate:up`
- Down: `npm run migrate:down`
- Test DB: `npm run migrate:test` (reads `.env.test`)

Base migration creates `products` with `id`, `name`, `price`, `quantity`, `created_at`.

## Run
- Dev (nodemon): `npm run dev`
- Prod: `npm start`

On start, `src/db/testDB.js` runs a simple `SELECT NOW()` to log DB connectivity.

## Tests
```bash
npm test
```
Runs test migrations then Jest + Supertest.

## API
### Health
- `GET /health` - `{ status: "OK", timestamp, db: { status: "connected", now } }`

### Products (prefix `/api/products`)
- `GET /` - list products
- `GET /:id` - product details
- `POST /` - create product; body `{ name: string, price: number, quantity: integer }`
- `PUT /:id` - update product (expects all fields)
- `DELETE /:id` - delete product

Success: `{ status: "success", data: ... }`. Errors flow through `errorMiddleware` and return `{ status: "error", message }` with proper HTTP status.

## Structure
- `src/app.js` - middleware/routes
- `src/server.js` - server start
- `src/routes/*` - routers
- `src/controllers/*` - controllers
- `src/services/*` - DB access
- `src/db/*` - pool/config/migrations
- `tests/*` - API and integration tests

## Lint
```bash
npm run lint
```

## Security / Secrets
- Do not commit `.env` or real credentials.
- Use placeholders in docs and `.env.example`.
- Ensure `uuid-ossp` extension is available (migration creates it if missing).
