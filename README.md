# Inventory App AI — Backend

Simple Express + PostgreSQL backend providing a health check and CRUD for products, with integrated Winston logging.

Includes:
- Express 5 API with modular structure
- PostgreSQL with migration scripts (node-pg-migrate)
- Redis caching and rate limiting
- Zod validation and custom error handling
- Winston logging (console and file)
- Docker Compose for dev, test, and production
- Full Jest test suite (unit & integration)

## Requirements
- Node >=20
- npm >=9
- PostgreSQL 14+

## Quick Start

### Local Development
1. Install dependencies: `npm install`
2. Create `.env.dev` and `.env.test` files (use the example env block below as a template)
3. Run migrations: `npm run migrate:up:dev`
4. Start server: `npm run dev`

#### Scripts
- `npm run dev` — Start local dev server with hot reload
- `npm test` — Run all tests (Jest)
- `npm run lint` — Lint codebase
- `npm run migrate:up:dev` — Run DB migrations for dev
- See `package.json` for all available scripts


### Docker
- Dev: `npm run docker:dev` (uses docker-compose.yml + docker-compose.dev.yml)
- Prod: `npm run docker:prod` (uses docker-compose.yml)
- Tests: `npm run docker:test` (uses docker-compose.test.yml)

#### Production Docker Compose
- Use `docker-compose.prod.yml` at the project root for production deployments (API, PostgreSQL, Redis, health checks, persistent volumes).
- Run from project root:
  - `docker compose -f docker-compose.prod.yml up --build`
  - See the file for details on environment variables and service configuration.

## Database Migrations

- Create: `npm run migrate:create -- <name>`
- Up: `npm run migrate:up`
- Down: `npm run migrate:down`
- Test migrations: `npm run migrate:test`

## Running the Application

- **Dev (local):** `npm run dev`
- **Dev (Docker):** `npm run docker:dev`
- **Prod:** `npm start`
- **Prod (Docker):** `npm run docker:prod`
- **Tests:** `npm test`
- **Tests (Docker):** `npm run docker:test`
- **Lint:** `npm run lint`

## Logging

The application uses **Winston** for structured logging with the following features:

- **Console output:** Colored, human-readable in development; JSON format in production
- **File transports:** (optional, see logger config)
- **Exception & rejection handlers:** (optional, see logger config)
- **Environment configuration:** Set `LOG_LEVEL` in `.env` (default: `info`; choices: `error`, `warn`, `info`, `debug`)
- **Request logging:** Automatic logging of HTTP requests via middleware
- **Test logging:** Log level set to `error` during tests for cleaner output

### Logger Usage

```javascript
import { logger } from './config/logger.js';

logger.info('Information message');
logger.warn('Warning message');
logger.error(errorObject);  // Pass Error object to capture stack trace
logger.debug('Debug message', { metadata: 'value' });
```

## API Endpoints

- **Health:** `GET /health`
- Returns DB and Redis status, timestamp
- **Products** (prefix `/api/products`):
  - `GET /` — list all products
  - `GET /:id` — get product by ID
  - `POST /` — create product
  - `PUT /:id` — update product
  - `DELETE /:id` — delete product

## Features

- **Validation:** All input validated with Zod schemas
- **Error Handling:** Centralized error middleware, custom error classes.
- **Caching:** Product data cached in Redis (if enabled)
- **Rate Limiting:** Per-IP rate limiting using Redis (configurable via env)
- **Request ID:** (not currently implemented) — add a middleware to inject `x-request-id` if needed.
- **Testing:** Jest for unit/integration tests, with DB and API coverage

## Project Structure

```
src/
├── app.js                     # Express app setup
├── server.js                  # Server startup
├── config/                    # Configuration files
│   ├── env.js                 # Environment variables (envalid)
│   ├── logger.js              # Winston logger config
│   └── redis.js               # Redis client/config
├── controllers/               # Request handlers
├── services/                  # Business logic
├── routes/                    # Route definitions
├── middleware/                # Express middleware
│   ├── api/
│   │   ├── async-handler.middleware.js
│   │   └── rate-limit.middleware.js
│   ├── auth/
│   │   ├── authenticate.js
│   │   ├── authRequire.js
│   │   └── require-role.js
+│   ├── error/
│   │   └── error.middleware.js
│   ├── logger/
│   │   └── request-logger.middleware.js
│   └── validation/
│       └── validate.middleware.js
├── db/                        # Database utilities
└── errors/                    # Custom error classes

migrations/                     # Database migrations
tests/                          # Jest test suite

```

## Environment Variables

Create `.env.dev`, `.env.test`, and `.env.prod` files:

```env
NODE_ENV=development
APP_PORT=3000
LOG_LEVEL=info

DATABASE_URL=postgres://user:password@localhost:5432/inventory
REDIS_URL=redis://localhost:6379
REDIS_ENABLE=true
RATE_LIMIT_WINDOW_SEC=60
RATE_LIMIT_MAX=100
```

## Security / Secrets

- Do not commit `.env` files or real credentials
- Use the example env block above as a template for environment variables (there is no `.env.example` file in the repo)
- Ensure `uuid-ossp` extension is available (migration creates it if missing)
- Rotate secrets regularly in production

## Contributing

PRs and issues welcome! Please lint and test before submitting.
