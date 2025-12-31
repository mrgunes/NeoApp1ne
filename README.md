

# Neo React Starter ⚡

A production-ready React starter template built with modern tooling and strict defaults.
Designed for speed, scalability, and reuse across multiple projects.

This repo is intended to be used as a GitHub Template.

---

- ✨ What’s Included

-# Core

- React 19
- TypeScript (strict, modern config)
- Vite (fast dev + build)
- pnpm + Corepack (reproducible installs)
- Node 20 LTS

-# Styling

- Tailwind CSS v3
- PostCSS + Autoprefixer
- Clean global CSS setup

-# Routing & Data

- React Router (v7)
- TanStack React Query
- Centralized app providers

-# Quality & DX

- ESLint (modern flat config)
- Prettier (format-on-save ready)
- Absolute imports (`@/-`)
- Strict TypeScript (`verbatimModuleSyntax`)
- Clean folder architecture

---

- 📁 Project Structure

```
src/
  app/            # Global providers & app wiring
  pages/          # Route-level pages
  components/     # Reusable UI components
  lib/            # Utilities, api clients, helpers
  assets/         # Static assets
```

---

- 🚀 Getting Started

-# 1. Use the template

On GitHub, click “Use this template”
or clone directly:

```bash
git clone https://github.com/<your-username>/neo-react-starter.git
cd neo-react-starter
```

-# 2. Install dependencies

```bash
pnpm install
```

-# 3. Start development

```bash
pnpm dev
```

Open: `http://localhost:5173`

---

- 🧪 Scripts

| Command        | Description                   |
| -------------- | ----------------------------- |
| `pnpm dev`     | Start dev server              |
| `pnpm build`   | Type-check + production build |
| `pnpm preview` | Preview production build      |
| `pnpm lint`    | Run ESLint                    |
| `pnpm format`  | Format with Prettier          |
| `pnpm check`   | Lint + build (CI-style)       |

---

- 🌱 Environment Variables

Create a `.env` file (see `.env.example`):

```env
VITE_API_URL=http://localhost:8000
```

Access in code:

```ts
const API_URL = import.meta.env.VITE_API_URL;
```

---

- 🧠 Architecture Notes

-# App Providers

All global providers live in one place:

```ts
src/app/AppProviders.tsx
```

This is where you add:

- Router
- React Query
- Auth
- Theme
- Toasts
- Feature flags

-# Absolute Imports

```ts
import Button from "@/components/Button";
```

Configured via:

- `tsconfig.app.json`
- `vite.config.ts`

---

- 🔐 TypeScript Philosophy

- Strict by default
- Explicit `import type`
- No implicit runtime imports
- Clean separation of types vs values

This avoids subtle bugs and keeps bundles lean.

---

- 🧩 Extending the Template

Common next steps:

- Auth & protected routes
- API client (Axios / Fetch wrapper)
- UI kit (shadcn/ui)
- Testing (Vitest + Testing Library)
- Monorepo (pnpm workspaces)

This template is designed to grow without refactors.

---

- 📦 Recommended Versions

- Node: 20.x (LTS)
- pnpm: via Corepack
- Browser: Chrome / Edge

---

- 🏁 License

MIT — use it freely.

---

-# ✅ Next Step (important)

After updating the README:

```bash
git add README.md
git commit -m "docs: replace vite README with starter template docs"
```

Then push and mark the repo as a Template Repository on GitHub.

