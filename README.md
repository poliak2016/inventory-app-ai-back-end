
# Inventory App — Backend (engineering brief)

This README focuses on implementation facts and design rationales rather than marketing. It documents how the service currently behaves, where to look in code, and concrete next steps an engineer can take.

## 1 — Purpose (short)

Provides a secure, auditable backend for inventory operations (products, categories, stock movements) and multi-organization user onboarding. Suitable as the backend for a web admin, POS, or mobile client.

## 2 — Stack (explicit)

- Node.js (ESM) + Express
- PostgreSQL (`pg`) + `node-pg-migrate`
- Redis (optional) via `redis` client
- JWTs (`jsonwebtoken`) — access + refresh; refresh tokens hashed server-side
- Zod for request validation; `bcrypt` for password hashing; Winston for logs
- Tests: Jest + Supertest; containers via Docker Compose

## 3 — Concrete architecture and responsibilities

- Routes: `src/routes` — wire request to controller
- Controllers: `src/controllers` — HTTP layer only (status codes, cookies)
- Services: `src/services` — orchestrate business flows and transactions (token rotation, registration)
- Repositories: `src/repositories` — parameterized SQL queries (see `src/model`)
- Infrastructure: `src/infrastructure` — Redis client, JWT sign/verify, hashing helpers

Use `src/db/transaction.js` (`transactionFunc(cb)`) for any multi-statement operation requiring atomicity.

## 4 — Authentication (exact behavior)

- Login: `loginUserService` validates credentials, signs an access token and a refresh token (`jti` added), hashes refresh token and stores hash in `refresh_tokens` table within a DB transaction, sets `refreshToken` as `httpOnly` cookie and returns `accessToken`.
- Refresh: `refreshUserService` verifies refresh JWT, hashes it and looks up a valid DB row (`revoked_at IS NULL` AND `expires_at > now()`). If valid and owner matches payload, the row is revoked, a new refresh token is issued and stored (rotation), and a new access token is issued. If a revoked token is presented (reuse), the service revokes all user tokens and rejects the request. All of this runs inside `transactionFunc`.
- Logout: revokes the refresh token by hash and clears cookie.

Key files: `src/services/auth.service.js`, `src/repositories/token.repository.js`, `src/infrastructure/auth/*`.

Security notes:
- Refresh tokens are never persisted raw. The hashing method is in `src/infrastructure/auth/helpers/tokenHash.js`.
- Cookie settings: `httpOnly`, `sameSite: strict`, `secure` in production, `path: /api/auth`.

## 5 — Database mappings (precise)

Primary tables and important constraints (refer to `migrations/`):

- `users` — `id UUID PK`, `email UNIQUE`, `password_hash`, `role`, timestamps
- `organizations` — `id UUID`, `name`, timestamps
- `products` — `id UUID`, `name`, `price NUMERIC`, `quantity INTEGER`, `category_id` → `categories(id)`
- `categories` — `id UUID`, `parent_id` (nullable), `slug`
- `stock_movements` — `product_id` → `products(id)`, `created_by` → `users(id)`, `type` CHECK `('in','out','adjustment')`, `quantity > 0`
- `refresh_tokens` — `id UUID`, `user_id UUID`, `token_hash TEXT`, `expires_at TIMESTAMPTZ`, `revoked_at TIMESTAMPTZ`, `created_at`

Operational note: `stock_movements` is the audit log; `products.quantity` is maintained as a cache/snapshot.

## 6 — Caching & Redis specifics

- Redis client wraps connection attempt and falls back to a noop client when disabled or unavailable (`src/infrastructure/redis/redis.client.js`).
- Product endpoints cache: TTL = 60s (see `src/services/products.service.js`), keys `products:all` and `products{id}`; cache invalidated on writes.

## 7 — Runbook (explicit commands)

Install:

```bash
npm ci
```

Run migrations (local .env.dev):

```bash
npm run migrate:up:local
```

Start (dev):

```bash
npm run dev
```

Run containerized dev stack (Postgres on host port `5433`, API on `3000`):

```bash
npm run docker:dev
```

Stop dev stack and remove volumes:

```bash
npm run docker:dev:down
```

Run containerized production stack (Postgres + Redis + API; requires `.env.prod` and `.env.docker`):

```bash
npm run docker:prod
```

Run tests (uses `.env.test`):

```bash
npm run test
```

## 8 — Required environment variables (validated by code)

- `DATABASE_URL` (required)
- `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` (required)
- `JWT_ACCESS_EXPIRES_IN` (e.g. `15m`), `JWT_REFRESH_EXPIRES_IN` (e.g. `30d`)
- `BCRYPT_SALT_ROUNDS` (default 10)
- `REDIS_URL`, `REDIS_ENABLE`
- `APP_PORT`

The app will fail fast if required env variables are missing (see `src/config/env.js`).

## 9 — API endpoints (engineer-focused)

Auth:

- `POST /api/auth/register` — creates organization + admin. Runs inside DB transaction.
- `POST /api/auth/login` — returns `accessToken` and sets `refreshToken` cookie.
- `POST /api/auth/refresh` — rotates refresh token, issues new access token.
- `POST /api/auth/logout` — revokes refresh token.

Products:

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id` — protected by `authenticate` & `requireRole('admin')`

Refer to `src/schemas` for request/response shapes.

## 10 — Short-term engineering improvements (concrete tasks)

1. Enforce `organization_id` filtering in every repository; add tests demonstrating cross-tenant access is rejected.
2. Add DB index on `refresh_tokens(expires_at)` and a scheduled job to `DELETE` expired rows (or `VACUUM` strategy in managed DB).
3. Add explicit rate limiter on auth endpoints (IP + account throttling); add `RATE_LIMIT_*` defaults in `.env.example`.
4. Implement smoke CI job: start Postgres+Redis, run migrations, execute a test that performs login → refresh → reuse-detection.
5. Add an `admin` inspection endpoint (protected) to list active refresh token counts per user for operational debugging.

---

Tell me which concrete follow-up you want: `.env.dev` template, GitHub Actions CI, or a small DB GC script. I can implement one next.
