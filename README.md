# Inventory App — Backend

Production-ready REST API for inventory management built with Node.js and PostgreSQL.  
Designed with a strong focus on clean architecture, security, and real-world backend practices.

---

## 🚀 Key Features

- JWT authentication (access + refresh tokens with rotation & reuse detection)
- Secure refresh token storage (hashed in database)
- Clean architecture (controller → service → repository)
- PostgreSQL with migrations (node-pg-migrate)
- Redis caching + graceful fallback
- Rate limiting (Redis-based)
- Input validation with Zod
- Integration tests (Jest + Supertest)
- Dockerized development environment

---

## 🎯 Purpose

Backend API for managing:
- products
- categories
- stock movements (audit log)

Supports multi-organization setup and secure user authentication.  
Designed to be used by web apps, POS systems, or mobile clients.

---

## 🧠 Why this project

Built to simulate a real production backend, not just a tutorial project.

Focus areas:
- secure authentication (token rotation, reuse detection)
- scalable architecture
- separation of concerns
- SaaS-ready foundation (multi-organization support)

---

## 🏗 Architecture

Routes → Controllers → Services → Repositories → Database

**Responsibilities:**

- Routes — define endpoints and connect to controllers  
- Controllers — handle HTTP (request/response, cookies, status codes)  
- Services — business logic and orchestration (auth flows, transactions)  
- Repositories — database queries (parameterized SQL)  
- Infrastructure — Redis, JWT, hashing utilities  

---

## 🔐 Authentication (Detailed Flow)

### Login
- Validate credentials  
- Generate access + refresh token (with jti)  
- Hash refresh token and store in DB  
- Set refresh token in httpOnly cookie  
- Return access token  

### Refresh
- Verify refresh token  
- Hash and match against DB  
- Check: not revoked and not expired  
- Rotate token:
  - revoke old token  
  - issue new one  
- Detect reuse → revoke all user tokens  

### Logout
- Revoke refresh token  
- Clear cookie  

### 🔒 Security Notes

- Refresh tokens are never stored raw  
- Cookie config:
  - httpOnly  
  - sameSite: strict  
  - secure (production)  
- Token rotation prevents replay attacks  

---

## 🗄 Database Design

Main tables:

- users — authentication + roles  
- organizations — multi-tenant structure  
- products — inventory state  
- categories — hierarchical categories  
- stock_movements — audit log of all changes  
- refresh_tokens — hashed tokens with expiration & revocation  

**Important concept:**
- stock_movements = source of truth (audit log)  
- products.quantity = cached snapshot  

---

## ⚡ Caching (Redis)

- Product endpoints cached (TTL: 60s)  
- Keys:
  - products:all  
  - products:{id}  
- Cache invalidated on write operations  
- Fallback to noop client if Redis unavailable  

---

## 🧪 Testing

- Integration tests with Jest + Supertest  
- Covers authentication and API endpoints  
- Uses separate test environment (.env.test)  

---

## 📡 API Endpoints

### Auth

POST /api/auth/register  
POST /api/auth/login  
POST /api/auth/refresh  
POST /api/auth/logout  

### Products

GET    /api/products  
GET    /api/products/:id  
POST   /api/products  
PUT    /api/products/:id  
DELETE /api/products/:id  

---

## ▶️ Run the Project

### Install
npm ci

### Run migrations
npm run migrate:up:local

### Start (dev)
npm run dev

### Docker
npm run docker:dev

### Tests
npm run test

---

## ⚙️ Environment Variables

Required:

DATABASE_URL  
JWT_ACCESS_SECRET  
JWT_REFRESH_SECRET  

Optional:

JWT_ACCESS_EXPIRES_IN=15m  
JWT_REFRESH_EXPIRES_IN=30d  
BCRYPT_SALT_ROUNDS=10  
REDIS_URL  
REDIS_ENABLE  
APP_PORT  

App fails fast if required variables are missing.

---

## 🔧 Next Improvements

- Enforce organization-level isolation in all queries  
- Add DB index on refresh_tokens(expires_at)  
- Add cleanup job for expired tokens  
- Add rate limiting for auth endpoints  
- Add CI pipeline (test + migrations)  
- Add admin endpoint for token inspection  

---

## 📁 Key Files

- src/services/auth.service.js  
- src/repositories/token.repository.js  
- src/infrastructure/auth/*  
- src/db/transaction.js  

---

## 📌 Summary

This project demonstrates:
- real backend architecture  
- secure authentication design  
- database-driven thinking  
- production-oriented development approach  
