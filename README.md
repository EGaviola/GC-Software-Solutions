# GC Science Academy Game

A playable Grade 6 science campaign aligned to Tennessee standards and curriculum planning artifacts in docs.

## What is Included
- Web game client (React + Vite): apps/web
- API mission engine (Node.js + Express + TypeScript): apps/api
- Curriculum references and build plans: docs
- Shared curriculum package starter: packages/curriculum

## Game Features
- Multi-lab academy map with progression unlocks
- 12 standards-tagged missions including boss battles
- Coverage across Energy, Ecosystems, Earth Systems, Climate, and Human Activity
- Prediction-based gameplay loop with scientific explanations
- XP progression, achievement badges, and cloud save synchronization
- User accounts with JWT auth (student, teacher, parent, admin)
- Teacher dashboard for class creation, student enrollment, assignments, and mastery reports
- Parent dashboard for student linking, progress tracking, and goal management
- PostgreSQL-backed persistence for accounts, progress, classes, assignments, and goals

## Run Locally
1. Install dependencies
   - npm install
2. Start PostgreSQL
   - npm run db:up
   - If Docker is unavailable, install PostgreSQL locally and create database gc_science_game with user gc_admin / password gc_admin_pw, or update DATABASE_URL in apps/api/.env.
3. Create API env file
   - copy apps/api/.env.example apps/api/.env
4. Start full game stack (web + API)
   - npm run dev
5. Open:
   - http://localhost:5173/

API default URL: http://localhost:4000
PostgreSQL default URL from example: postgresql://gc_admin:gc_admin_pw@localhost:5432/gc_science_game

## Authentication Flow
1. Open Account tab
2. Register role-based users:
   - Student account for gameplay + cloud save
   - Teacher account for classes, assignments, and mastery reports
   - Parent account for linked students and goals
3. Sign in with each role and use the corresponding dashboard tab

## Build
- npm run build

## Key Files
- apps/api/src/server.ts
- apps/api/src/db.ts
- apps/api/src/auth.ts
- apps/api/src/content.ts
- apps/web/src/App.tsx
- docker-compose.yml
- docs/tn-grade6-curriculum-reference.md
- docs/science6-game-build-plan.md
