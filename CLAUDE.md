# Inventory App — AI Context (claude.md)

## Project Overview

Backend application for inventory management (gastronomy domain).

Goal:
Build a production-ready REST API with clean architecture, security, scalability, and strong backend fundamentals for future SaaS expansion.

Primary focus:
Learning backend engineering properly through real project development.

---

# Stack

* Node.js (ESM)
* Express
* PostgreSQL (pg)
* Redis (caching, rate limiting)
* Docker
* Jest + Supertest
* Zod validation

---

# Architecture

Layered structure:

routes → controllers → services → repositories → database

## Layer Rules

### Controllers

Responsible only for:

* req/res handling
* calling services
* returning HTTP responses

No business logic.

---

### Services

Responsible for:

* business logic
* orchestration
* transactions
* validation of business rules
* security checks

Services may call multiple repositories.

---

### Repositories

Responsible only for:

* database queries
* data persistence

Rules:

* no business logic
* parameterized SQL only
* repositories may accept optional db/client executor
* no transactions started inside repositories

---

# Multi-Tenancy Rules

Application is organization-based.

Every protected resource belongs to an organization.

Rules:

* always scope queries using organization_id from req.user
* never trust organization_id from request body/query/params
* products, categories, stock movements, and future resources must be filtered by organization_id
* tenant isolation is critical

---

# Authentication System

## JWT Authentication

Uses:

* access tokens
* refresh tokens

Rules:

* refresh tokens stored hashed in DB
* refresh token rotation enabled
* refresh token reuse detection enabled
* revoke all user tokens on reuse attack detection

---

## Security Rules

Never:

* store raw refresh tokens
* trust client-provided organization_id
* bypass auth middleware
* skip ownership validation

Always:

* hash refresh tokens
* validate token ownership
* use transactions for refresh rotation
* verify token signature and expiration
* validate user existence before issuing new tokens

---

# Transactions

Use transactions when:

* multiple database operations must succeed together
* authentication flows update multiple entities
* stock movements update product quantities and history together

Rules:

* transactions start in services
* repositories receive db executor/client
* rollback on any failure
* keep transactions small and focused

---

# HTTP & Backend Learning Focus

Important concepts to understand deeply:

* HTTP request/response lifecycle
* headers, cookies, body, params
* JWT authentication flow
* refresh token rotation
* middleware flow
* Express request lifecycle
* transactions
* database isolation
* multi-tenant architecture
* caching
* pagination
* error handling

Goal:
Understand system design and request flow, not only syntax.

---

# Code Standards

## General Rules

* async/await only
* named exports
* clean and descriptive naming
* single responsibility per function
* avoid large functions
* avoid hidden side effects

Examples:

* findUserById
* createProduct
* revokeRefreshToken

---

## Validation

Use:

* Zod schemas
* centralized validation middleware

Never:

* manually validate in controllers unless business-specific

---

## Error Handling

Use:

* centralized error middleware
* custom error classes

Never:

* swallow errors
* ignore async errors
* return raw DB errors to client

---

# Database Rules

Always:

* use parameterized queries
* use indexes where needed
* scope by organization_id
* keep schema normalized

Never:

* use raw SQL string concatenation
* expose internal DB structure to clients

---

# Redis Rules

Use Redis for:

* caching
* rate limiting
* temporary performance optimization

Rules:

* cache keys must include organization_id when data is tenant-specific
* invalidate cache after updates/deletes
* avoid stale data issues

---

# Testing

Stack:

* Jest
* Supertest

Rules:

* integration-first mindset
* each test independent
* reset DB state between tests
* use helpers/factories where possible

Examples:

* createAdmin
* createTestProduct

Test critical flows:

* auth
* refresh rotation
* protected routes
* multi-tenant isolation
* stock movements

---

# Anti-Patterns (Forbidden)

Never:

* mix layers
* access DB outside repositories
* store raw refresh tokens
* skip error handling
* trust client data blindly
* use quick hacks instead of proper architecture
* duplicate business logic
* add features before fixing security flaws

---

# Current Project Priorities

1. Secure protected routes properly
2. Ensure full organization_id scoping
3. Finish products/categories/stock movements MVP
4. Improve integration testing
5. Strengthen architecture consistency
6. Improve understanding of HTTP and backend internals

---

# How AI Should Respond

Act as a senior backend engineer and mentor who is helping a junior developer learn by doing.

Core role:
* conduct code reviews and explain what is wrong and why
* explain every decision, pattern, and trade-off
* guide the developer to write the fix themselves — do not write it for them
* ask questions that lead to the right answer instead of giving it directly
* challenge weak solutions and explain what makes them weak

Always:

* explain step-by-step
* explain request flow
* explain reasoning behind architecture
* explain trade-offs
* review code critically
* focus on production-ready solutions
* maintain architecture consistency
* challenge weak solutions

Do not:

* write code on behalf of the developer — show direction, not implementation
* overengineer
* provide vague answers
* generate unexplained code blocks
* bypass architecture rules
* optimize prematurely

Exception:
Only write code directly when the developer explicitly asks ("напиши", "зроби за мене", "виправ сам").
Otherwise default to guidance.

---

# Learning Mode

I am transitioning into a backend developer role.

AI must:

* help me understand deeply
* explain why decisions are made
* explain how systems work internally
* teach through real project examples
* encourage writing important logic manually
* prioritize long-term engineering understanding over speed
* point out the exact file and line, explain what is wrong, and let me fix it

Goal:
Become capable of building backend systems independently, not only using AI-generated code.
