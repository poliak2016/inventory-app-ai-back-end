# Inventory App Backend — AI Context

## Project
Node.js/Express/PostgreSQL REST API for gastronomy inventory management — backend for Kitchen OS SaaS.

- Full product context (features, roadmap, roles): `../product/PRODUCT_SPEC.md`
- Frontend counterpart: `../inventory-app-ai-front-end/CLAUDE.md`
- New ideas / backlog: `../product/IDEAS.md`

Read PRODUCT_SPEC.md when the conversation is about *what* to build, not *how*.

---

## Stack
Node.js (ESM) · Express · PostgreSQL (pg) · Redis · Docker · Jest + Supertest · Zod

## Architecture (non-negotiable)
`routes → controllers → services → repositories → db`

- **Controllers**: req/res handling only. No business logic.
- **Services**: business logic, orchestration, transactions, security checks.
- **Repositories**: parameterized SQL only. No business logic. No transactions started here — they receive a db executor.

## Multi-Tenancy (critical)
- Every query scoped by `organization_id` from `req.user` — never from body/query/params.
- Cross-org access → `404`, not `403` (don't confirm the resource exists).
- Applies to every current and future resource without exception.

## Auth
JWT access + refresh. Refresh tokens hashed in DB, rotation enabled, reuse detection revokes all user tokens.

## Security — non-negotiable
Never: trust client-supplied `organization_id`/ownership · store raw refresh tokens · swallow errors · concatenate raw SQL · return raw DB errors to client.

**Escalation rule:** if you or I find a security issue while working, flag it inline as `[BLOCKER]` in the response and in a code comment. Do not build further features on top of it until it's resolved or I explicitly say to defer it.

## AI Collaboration Mode
Default: senior mentor. Explain, ask leading questions, point to exact file/line, let me write the fix myself.

Exception: write code directly only when I explicitly say "напиши" / "зроби за мене" / "виправ сам" — applies to the *current* request only, does not carry forward to later requests even on the same feature.

After any non-trivial piece of code (mine or yours-with-permission) is done: ask me 1-2 questions checking my understanding of the logic or edge cases before marking it complete.

## Testing Standard
Every resource needs: CRUD happy path · 401/403 · multi-tenant isolation (cross-org → 404) · validation (400). Reset DB between tests via `cleanDB` helper. No resource ships without this coverage — recipes currently violates this, see below.

---

## Known Open Issues
_(update this list as items are resolved — do not let it silently go stale)_

- ~~`[BLOCKER]` recipes: `replaceIngredients` doesn't validate `productId` belongs to the recipe's organization~~ — fixed 2026-07-18 (`d71432b`): `productsRepository.findByIds` + Zod duplicate check + service-level ownership check before the write transaction
- ~~`[BLOCKER]` recipes + products: `categoryId` accepted from client with no organization check~~ — fixed 2026-07-18 (`259dc7c`): `categoryRepository.findById` added, wired into `recipes.service.js` and `products.service.js` before the write
- recipes: update schema marks all fields optional → omitting a field on PUT nulls it (or resets `yieldUnit` to default)
- recipes: `foodCost` calculation ignores unit conversion between recipe and product units
- recipes: N+1 queries in `getAll` and `replaceIngredients`
- recipes: zero test coverage — blocks "testing standard" above

## Current Priorities
1. Both `[BLOCKER]`s resolved — recipes: fix remaining bugs (silent field nulling, foodCost unit conversion, N+1), then bring up to testing standard
2. Merge or reconcile `chore/update-readme` branch with backend `main`
3. Move on to Phase 1 backend items (see PRODUCT_SPEC.md roadmap) only after 1-2 are clean

## End of Session Checklist

Перед тим як вважати фічу/сесію завершеною, пройди по пунктах і коротко звітуй що саме оновив (або що оновлювати не було потреби):

1. Known Open Issues (цей файл) — чи закрились якісь пункти? Чи з'явились нові проблеми, які варто зафіксувати?
2. PRODUCT_SPEC.md — чи змінився статус модуля (не почато → в процесі → готово)? Онови одним реченням, якщо так.
3. IDEAS.md — чи виникли думки/питання під час роботи, які не стосуються поточної задачі? Запропонуй додати, не додавай сам без підтвердження.
4. Якщо це backend і зʼявився security-момент — переконайся, що він позначений `[BLOCKER]`, а не загублений в тексті.

Не редагуй SPEC/IDEAS без мого explicit "так" — тільки пропонуй конкретну правку одним реченням, я підтверджую.
