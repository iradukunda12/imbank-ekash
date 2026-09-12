# IMBank eKash

An electronic payment platform enabling swift and protected transactions among banks, mobile money services, and financial entities within Rwanda.

This repository holds the **web dashboard** for IMBank eKash — the interface account holders use to sign in, review balances and activity, manage transactions, and (soon) claim rebates and generate reports.

> **Status:** front-end prototype. Authentication and dashboard data are currently mocked (see [Current state](#current-state)) so the UI, flows and design system can be reviewed and iterated on independently of the backend.

---

## Table of contents

- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Environment variables](#environment-variables)
- [Project structure](#project-structure)
- [Features](#features)
- [Design system](#design-system)
- [Code quality & git hooks](#code-quality--git-hooks)
- [Current state](#current-state)

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) |
| Build tool | [Vite 8](https://vite.dev) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) (CSS-based `@theme` tokens) |
| Linting | [ESLint 10](https://eslint.org) with `typescript-eslint`, React Hooks and React Refresh plugins |
| Git hooks | [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/okonet/lint-staged) |
| Font | [Lato](https://fonts.google.com/specimen/Lato) (Google Fonts) |

## Getting started

### Prerequisites

- Node.js 20 or later
- npm

### Install

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default (Vite's default port) and starts on the sign-in screen.

### Build for production

```bash
npm run build
```

Output is written to `dist/`.

## Available scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server in development mode |
| `npm run build` | Type-check (`tsc -b`) and build for production |
| `npm run build:dev` | Type-check and build using the development environment config |
| `npm run preview` | Preview a production build locally |
| `npm run lint` | Run ESLint across the project |
| `npm run typecheck` | Run `tsc -b` with no emit |
| `npm run lint-staged` | Run lint-staged directly (this is what the pre-commit hook calls) |

## Environment variables

The app reads its runtime config through `src/environment/` (aliased as `@environment` in `vite.config.ts`), which picks `environment.dev.ts` or `environment.prod.ts` based on the Vite mode. Both fall back to sane defaults if a variable is unset, so a `.env` file is optional for local development.

| Variable | Default (dev) | Default (prod) | Purpose |
| --- | --- | --- | --- |
| `VITE_NAME` | `I&M Bank eKash` | `I&M Bank eKash` | Display name for the app |
| `VITE_URL` | `http://localhost:3000/api` | `/api` | Base URL the app will call once it's wired to a real backend |

Create a `.env` (or `.env.local`) file at the project root to override either value — it's already git-ignored.

## Project structure

```
src/
├─ app/
│  └─ routing/            # Lightweight in-memory router (useNavigation, AppRoutes)
├─ assets/                 # Logos and static images
├─ config/                 # App-wide constants (e.g. OTP length, resend cooldown)
├─ environment/            # Runtime config (dev/prod), read via @environment
├─ features/
│  ├─ auth/                # Sign in, OTP verification, forgot password
│  ├─ dashboard/           # Overview page: balances, activity, upcoming payments
│  ├─ design-system/       # Living style guide for every shared UI primitive
│  ├─ notifications/       # Notifications menu
│  ├─ payments/            # New payment modal
│  └─ theme/                # Light/dark theme hook
└─ shared/
   ├─ components/ui/       # Reusable primitives: Button, Table, Badge, Modal, Toast, …
   ├─ icons/                # Inline SVG icon set
   ├─ layouts/              # DashboardLayout (sidebar + header) and its nav config
   └─ lib/                  # Small utilities (e.g. `cn` for class merging)
```

## Features

**Authentication** — a three-page flow (`src/features/auth/pages`): sign in, one-time-code verification, and forgot password, all sharing one split-panel `AuthLayout`.

**Dashboard** (`/dashboard`) — account overview with a progress chart, weekly activity split, quick actions, highlights, and an upcoming payments table.

**Banking, Insights, Support** — accounts, transactions, rebates, reports, notifications and the help center are present in the sidebar navigation (`src/shared/layouts/DashboardLayout/navigation.ts`) and currently render a placeholder page until their real views are built.

**Design system** (`/design-system`) — a living reference for the shared UI kit: colors, typography, buttons, form controls, badges, the data table, toasts and more, so every screen draws from the same components rather than one-off markup.

## Design system

The visual language is intentionally restrictive: one indigo brand color (`#223D94` and its tints/shades) plus black, white and grey, with a small, fixed set of status colors (emerald/amber/rose/sky/slate) reserved for meaning — success, warning, danger, info, neutral. All tokens live in `src/index.css` under `@theme`, with a parallel `:root.dark` block so every component that reads a semantic token (`bg-canvas`, `text-ink`, `border-line`, …) works in both themes automatically.

## Code quality & git hooks

- **TypeScript** — strict project references (`tsconfig.app.json` / `tsconfig.node.json`), checked via `npm run typecheck`.
- **ESLint** — flat config (`eslint.config.js`) with recommended TypeScript, React Hooks and React Refresh rules.
- **Husky pre-commit hook** (`.husky/pre-commit`) runs, in order: `lint-staged` (ESLint `--fix` on staged `.ts`/`.tsx` files), a full `typecheck`, a dev build, and a production build — so nothing that fails to type-check or build reaches a commit.

After cloning, `npm install` sets up the hook automatically via the `prepare` script.

## Current state

This is a UI-first build: the dashboard's numbers and the auth flow's sign-in/OTP/reset behaviour (`src/features/auth/hooks/useAuth.ts`) are mocked with simulated latency so the experience can be reviewed end to end. Wiring it to a real backend means pointing `VITE_URL` at the API and replacing the mocked functions in `useAuth.ts` and `src/features/dashboard/data/mockDashboardData.ts` with real requests — the rest of the app (routing, layouts, components) doesn't need to change.
