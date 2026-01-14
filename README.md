# Inventory App AI — Backend

Simple Express + PostgreSQL backend providing a health check and CRUD for products, with integrated Winston logging.

## Requirements
- Node >=20
- npm >=9
- PostgreSQL 14+

## Quick Start

### Local Development
1. Install dependencies: `npm install`
2. Create `.env` files (`.env.dev`, `.env.test`) from `.env.example`
3. Run migrations: `npm run migrate:up:dev`
4. Start server: `npm run dev`

### Docker
- Dev: `npm run docker:dev`
- Prod: `npm run docker:prod`
- Tests: `npm run docker:test`

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
- **File transports:** Logs written to `logs/combined.log` and `logs/errors.log` with rotation (5 MB max per file, 5 files retained)
- **Exception & rejection handlers:** Separate logs for uncaught exceptions and unhandled promise rejections
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
- **Products** (prefix `/api/products`):
  - `GET /` — list all products
  - `GET /:id` — get product by ID
  - `POST /` — create product
  - `PUT /:id` — update product
  - `DELETE /:id` — delete product

## Project Structure

```
src/
├── app.js                     # Express app setup
├── server.js                  # Server startup
├── config/                    # Configuration files
│   ├── env.js                 # Environment variables (envalid)
│   ├── logger.js              # Winston logger config
│   └── config.js              # Additional config
├── controllers/               # Request handlers
├── services/                  # Business logic
├── routes/                    # Route definitions
├── middleware/                # Express middleware
│   ├── error.middleware.js    # Error handler
│   ├── requestLogger.middleware.js # Request logger
│   └── asyncHandler.js        # Async route wrapper
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

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=inventory
DATABASE_URL=postgres://user:password@localhost:5432/inventory
```

## Security / Secrets

- Do not commit `.env` files or real credentials
- Use `.env.example` as a template for environment variables
- Ensure `uuid-ossp` extension is available (migration creates it if missing)
- Rotate secrets regularly in production
