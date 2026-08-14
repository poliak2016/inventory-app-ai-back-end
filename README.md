# Inventory App — Backend

REST API for inventory management in the gastronomy industry.

## Stack

- **Runtime** - Node.js 20 (ESM) + Express
- **Database** - PostgreSQL + node-pg-migrate
- **Cache / Rate limiting** - Redis
- **Auth** - JWT (access + refresh tokens)
- **Validation** - Zod
- **Logging** - Winston
- **Tests** - Jest + Supertest
- **Infrastructure** - Docker + Docker Compose

## Architecture

Routes → Controllers → Services → Repositories → Database

| Layer | Responsibility |
|---|---|
| Routes | Wire HTTP endpoints to controllers |
| Controllers | HTTP only — parse request, return response |
| Services | Business logic, orchestration, transactions |
| Repositories | Parameterized SQL queries only |

Transactions are owned by services. Repositories accept an optional DB client to participate in them.

## Authentication 

- Login: Validates email and password, generates access + refresh token pair, stores refresh token hash in DB, sets refresh token as httpOnly cookie, returns access token.
- Refresh: Verifies token signature, matches hash against DB, revokes old token, issues new access + refresh pair.
If a revoked token is presented, all user tokens are immediately revoked.
- Logout: revokes the refresh token by hash and clears cookie.

Security notes:
- Refresh tokens stored as hash in DB - never raw
- Cookie: httpOnly, sameSite: strict, secure in production
- Reuse detection - if a revoked token is presented, all user tokens are immediately revoked.

## API endpoints

Auth:

- `POST /api/auth/register` — creates organization + admin. 
- `POST /api/auth/login` — returns `accessToken` and sets `refreshToken` cookie.
- `POST /api/auth/refresh` — rotates refresh token, issues new access token.
- `POST /api/auth/logout` — revokes refresh token.
- `GET /api/auth/user`

Products:

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

Categories:

- `POST /api/categories`
- `GET /api/categories`
- `PATCH /api/categories/:id`
- `DELETE /api/categories/:id`

Organizations: 

- `PATCH /api/organizations/me`
- `GET /api/organizations/me`

Stock Movements:

- `POST /api/stock/movements`
- `GET /api/stock/movements/:productId/history`


## Testing

36 integration tests covering:

- Auth — login, registration, refresh rotation, RBAC
- Products — CRUD, pagination, validation, tenant isolation
- Categories — CRUD, validation
- Stock Movements — IN/OUT, insufficient stock, history
- Organizations — GET/PATCH profile

```bash
npm test
```

## Running locally

**Install:**
```bash
npm ci
```
**Environment:**
```bash
cp .env.example .env.dev
# fill in DATABASE_URL and JWT secrets
```

**Migrations + start:**

```bash
npm run migrate:up:local
npm run dev
```


**Docker (recommended):**

```bash
npm run docker:dev
```
<!-- redeploy-trigger: 2026-08-10T15:21:13Z -->

<!-- autodeploy-verify: 2026-08-14T16:16:51Z -->

<!-- wait-for-ci-verify: 2026-08-14T16:21:35Z -->
