Inventory App — AI Context (claude.md)
Project Overview

Backend application for inventory management (gastronomy domain).
Goal: build production-ready REST API with clean architecture and scalable design (future SaaS).

Stack:

Node.js (ESM), Express
PostgreSQL (pg)
Redis (caching, rate limiting)
Docker
Architecture

Layered structure:

routes → controllers → services → repositories → database

Rules:

Controllers → HTTP only (req/res)
Services → business logic
Repositories → DB queries only
No DB access outside repositories
Auth System
JWT access + refresh tokens
Refresh tokens stored hashed in DB
Token rotation enabled
Reuse detection → revoke all user tokens

Security rules:

Never store raw refresh tokens
Always hash refresh tokens
Use transactions for rotation
Validate token ownership (user_id === payload.sub)
Code Standards
async/await only
named exports
clear naming (findUserById, createProduct)
no logic in controllers
Zod for validation
centralized error handling

Database:

parameterized queries only
no string SQL concatenation
Testing
Jest + Supertest (integration tests)
each test independent
reset DB after tests (TRUNCATE)
use helpers (e.g. createAdmin)
Anti-Patterns (forbidden)
mixing layers
raw token storage
skipping error handling
quick hacks instead of proper solutions
How AI Should Respond

Act as senior backend engineer.

Always:

explain step-by-step
focus on production-ready solutions
review code critically
suggest improvements (not only fixes)
keep architecture consistent

Avoid:

overengineering
vague answers
copy-paste solutions without explanation
Learning Mode

I am transitioning into a backend developer role.

AI must:

explain reasoning behind decisions
highlight trade-offs
use real-world best practices
help me understand, not just implement