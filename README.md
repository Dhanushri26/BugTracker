# BugTracker — Interview-Level Summary ✅

## Project Overview
A full-stack bug tracking application built with a Node.js + Express backend and a React + TypeScript frontend. It provides CRUD operations for bugs, user management, and uses Supabase for client-side authentication. The backend uses Sequelize ORM with migrations and seeders to manage database schema.

---

## Tech Stack & Tooling 🔧
- **Backend**: Node.js, Express, Sequelize ORM, PostgreSQL (dev), MySQL (test/prod placeholders), `pg` driver, `sequelize-cli` for migrations/seeders
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Axios
- **Auth**: Supabase client (`@supabase/supabase-js`) used in frontend via `AuthContext`
- **Dev tooling**: ESLint, Nodemon, PostCSS, Tailwind, TypeScript

---

## Key Files & Structure (high level) 📁
- backend/
  - `server.js` — Express app entry
  - `config/config.json` — DB connection configs (development uses Postgres)
  - `models/` — Sequelize models (`Bug`, `User`)
  - `migrations/`, `seeders/` — DB schema and example data
  - `controllers/` — Controller layer (HTTP handlers)
  - `services/` — Business logic / DB abstraction
  - `routes/` — Router endpoints (`bugs`, `users`)
- frontend/
  - `src/` — React app
  - `src/contexts/AuthContext.tsx` — Supabase auth provider
  - `src/hooks/useBugs.ts` — Core hook for CRUD operations with optimistic updates
  - `src/lib/supabase.ts` — Supabase client + `Bug` TypeScript type

---

## Data Models & DB Design 🗄️
- `Bug` model:
  - UUID primary key, title, description, difficulty (ENUM), status (ENUM), arrays for `tags` and `images`, `is_favorite` boolean
  - Manual `created_at` / `updated_at` fields (timestamps disabled in Sequelize model)
- `User` model: `name`, unique `email`, `password`, `isVerified`

Technical notes:
- Sequelize used for ORM and migrations; migrations show schema evolution
- DB config: development uses Postgres (`dialect: "postgres"`) as per `config/config.json`

---

## API Endpoints (backend routes) 🧭
- Bugs: `POST /bugs` (create), `GET /bugs` (list), `GET /bugs/:id`, `PUT /bugs/:id`, `DELETE /bugs/:id`
- Users: `POST /users/create` (create), `POST /users/verify` (verify by email), `GET /users/all`, `GET /users/:email`

---

## Frontend Patterns & UX Behaviors ⚛️
- `useBugs` hook implements: fetching via Axios, optimistic UI updates when adding/updating/toggling favorites, and rollback on failure for toggles
- Supabase auth integration for session management and sign-up / sign-in flows
- TypeScript types for API shapes are defined in `supabase.ts` and used across the frontend

---

## Architectural Patterns & Concepts Used 🧠
- **Layered architecture**: Controllers → Services → Models (separation of concerns)
- **ORM-based data modeling** (Sequelize): migrations, seeders, and model definitions
- **RESTful API design** for CRUD operations
- **Optimistic UI updates** on the client (improves perceived performance) with failure rollback
- **Authentication & session management** handled client-side by Supabase; frontend subscribes to auth state changes
- **Environment-based configuration**: DB in `config/config.json`, Supabase keys via `VITE_` env vars

---

## Security & Improvement Notes (important) ⚠️
- **Passwords are stored as plain text** in current `User` model/service flow — implement hashing (bcrypt/argon2) immediately.
- Add server-side input validation (e.g., Joi/Zod or express-validator) to prevent invalid data and injection attacks.
- Add authentication/authorization checks on protected backend endpoints (middleware) if the backend should enforce auth (currently Supabase is used client-side only).
- Implement secure storage of secrets (no secrets in repo), HTTPS in production, CORS configuration, rate limiting, and logging.

---

## Testing & CI Recommendations ✅
- Backend: add unit tests and integration tests (e.g., Jest + Supertest) for controllers and services
- Frontend: add component and hook tests (e.g., Vitest / React Testing Library)
- Add simple GitHub Actions CI: lint → test → build

---

## Running Locally (quick steps) ▶️
1. Backend:
   - cd `backend`
   - copy/update `config/config.json` or use env-based configs for production
   - `npm install`
   - Ensure Postgres is running and DB credentials match `config/config.json`
   - Run migrations: `npx sequelize-cli db:migrate`
   - Seed (optional): `npx sequelize-cli db:seed:all`
   - Start: `npm start` (nodemon)
2. Frontend:
   - cd `frontend`
   - `npm install`
   - Set env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
   - `npm run dev` and open `http://localhost:5173` (default Vite dev server)

---

## Scaling & Production Considerations 📈
- Use a managed DB (Postgres) with proper connection pooling
- Add pagination for large result sets (backend + frontend)
- Caching read-heavy endpoints (Redis) for performance
- Use background jobs for heavy work (file uploads, reports)
- Containerize app (Docker) and use cloud CI/CD for deployments

---

## Interview Talking Points / Talking Script 💬
- Explain why Sequelize was chosen (quick migrations, model-driven development).
- Discuss separation of concerns: controllers for request handling, services for business logic.
- Mention the optimistic UI pattern used in `useBugs` and how failure rollback is implemented.
- Identify the security gap (password hashing) and propose a fix (bcrypt + server-side validation + tests).
- Describe how Supabase is used on the frontend and trade-offs between client-only auth vs backend-enforced auth.

---

## Next Suggested Improvements (short list) 🔭
- Add password hashing + secure user flows and JWT/session checks on backend
- Add input validation and standard error handling middleware
- Add tests (unit + integration) and CI workflow
- Introduce consistent logging and request tracing
- Harden production config and add Docker support

---

If a shorter or more focused README is preferred (e.g., for a technical take-home readme vs. onboarding), specify the audience and the README can be tailored further.
