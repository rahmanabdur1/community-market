# FantasyBuzz Frontend

A modern, type-safe **Next.js 15** app using the App Router, **TailwindCSS, shadcn/ui, Framer Motion, React Hook Form, Tanstack Query, Zustand, Zod, etc**, and strict TypeScript.
Designed with **clean architecture**, **scalable folder structure**, and **best practices for 2025**.

---

## 🚀 Quick Start

```bash
pnpm i    # install deps (or npm/yarn/bun)
pnpm dev  # start dev server → http://localhost:3000
```

Production build:

```bash
pnpm build && pnpm start
```

---

## 🧑‍💻 Code Style & Conventions

**TypeScript**

- `"strict": true`, `"noUncheckedIndexedAccess": true`, `"exactOptionalPropertyTypes": true`.
- Use `type` for objects, `interface` only for public library shapes.
- Avoid `any`; if needed, mark with `// TODO: refine type`.

**Naming**

- Variables/functions → `camelCase` → `playerName`, `fetchPlayer`.
- Components → `PascalCase` → `PlayerCard.tsx`.
- Hooks → `useCamelCase` → `usePlayerStore.ts`.
- Types → `*.type.ts`, Constants → `*.constant.ts`, Enums → `*.enum.ts`, Schemas → `*.schema.ts`.
- Services/API → `*.service.ts` (or `*.api.ts`).
- Utils/helpers → `*.util.ts`.
- Tests → `*.test.ts(x)`.

**Folders**

- Always `kebab-case` → `top-news/`, `player-stats/`.
- One component per file. Avoid >3 nesting levels.

**React**

- Use **Server Components** by default.
- `"use client"` only when necessary (state/effects/events).
- Use **Server Actions** or **route handlers** for mutations.
- Use **Suspense** for streaming boundaries.

**Styling**

- TailwindCSS for layout.
- Use `cn()` for merging classes.
- Extract UI primitives instead of repeating styles.

**State & Data**

- Prefer server fetch / React Query / SWR.
- Global state only in `stores/` if truly shared.
- Validate external calls with `zod`.

**Accessibility & UX**

- Semantic HTML + ARIA.
- Focus rings always visible.
- Respect `prefers-reduced-motion`.

**Imports**

- Path aliases: `@/app`, `@/components`, `@/lib`, `@/types`.
- Avoid deep relative imports (`../../../`).

**Commits**

- Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`).
- Small, focused PRs.

---

## 📂 Project Structure

```
src/
├─ app/
│  ├─ page.tsx
│  ├─ layout.tsx
│  ├─ globals.css
│  └─ components/        # page-scoped UI
│     ├─ news/
│     ├─ poll/
│     ├─ predictions/
│     ├─ ranking/
│     └─ top-news/
│
├─ components/           # shared UI
│  ├─ layout/            # app shell
│  ├─ parts/             # feature-level
│  ├─ providers/         # context providers
│  ├─ theme-ui/          # tokens, themed widgets
│  └─ ui/                # shadcn/ui wrappers
│
├─ constants/            # static values
│  ├─ player.constant.ts
│  └─ app.constant.ts
│
├─ lib/                  # utilities
│  ├─ fetch.util.ts
│  ├─ format.util.ts
│  ├─ env.util.ts
│  └─ cn.ts
│
├─ services/             # API services
│  ├─ player.service.ts
│  └─ news.service.ts
│
├─ stores/               # global state
│  ├─ usePlayerStore.ts
│  └─ useUIStore.ts
│
├─ hooks/                # custom hooks
│  ├─ usePlayers.ts
│  └─ useIsClient.ts
│
├─ schemas/              # zod schemas
│  ├─ player.schema.ts
│  └─ news.schema.ts
│
├─ types/                # global types
│  ├─ player.type.ts
│  └─ api.type.ts
│
├─ styles/               # CSS tokens
│  └─ tokens.css
│
└─ tests/                # unit/integration tests
```

---

## 📑 File Patterns

**Type** (`types/player.type.ts`)

```ts
export type PlayerId = string;

export type Player = {
  id: PlayerId;
  name: string;
  team: string;
  position: "QB" | "RB" | "WR" | "TE" | "K" | "DST";
};
```

**Constant** (`constants/player.constant.ts`)

```ts
export const PLAYER_POSITIONS = ["QB", "RB", "WR", "TE", "K", "DST"] as const;
```

**Service** (`services/player.service.ts`)

```ts
import { z } from "zod";
import { Player } from "@/types/player.type";
import { getJSON } from "@/lib/fetch.util";

const PlayerSchema = z.object({
  id: z.string(),
  name: z.string(),
  team: z.string(),
  position: z.enum(["QB", "RB", "WR", "TE", "K", "DST"]),
});

export async function listPlayers(): Promise<Player[]> {
  const data = await getJSON("/api/players");
  return z.array(PlayerSchema).parse(data);
}
```

---

## 🛠 Tooling

- **Linting**: ESLint (`next/core-web-vitals`, `@typescript-eslint`, `eslint-plugin-tailwindcss`).
- **Formatting**: Prettier (2 spaces, trailing commas, 100 width).
- **TSConfig** highlights:

  ```json
  {
    "compilerOptions": {
      "strict": true,
      "noUncheckedIndexedAccess": true,
      "exactOptionalPropertyTypes": true,
      "baseUrl": ".",
      "paths": { "@/*": ["src/*"] }
    }
  }
  ```

- **Env**: validate with zod in `lib/env.util.ts`.
- **CI**: run `pnpm typecheck && pnpm lint && pnpm test`.

---

## 🔀 Git Workflow

We follow **GitFlow Lite** with `develop` → feature branches → PR → `develop` → `master`.

### Branch Naming

- Features → `feat/add-player-form`
- Bug fixes → `fix/player-stats-bug`
- Refactors → `refactor/session-store`
- Chores → `chore/update-deps`

### Workflow

1. **Create branch from develop**

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feat/add-player-form
   ```

2. **Make changes** → edit files, run tests.

3. **Stage & commit** (Conventional Commits)

   ```bash
   git add .
   git commit -m "feat: add player form with validation"
   ```

4. **Sync with develop**

   ```bash
   git pull origin develop
   # resolve conflicts if any → test again
   ```

5. **Push branch**

   ```bash
   git push origin feat/add-player-form
   ```

6. **Open Pull Request** → `feat/add-player-form` → `develop`.

7. After review/merge:

   - `develop` eventually merges into `master` for production.
   - Release tags created on `master`.

### Conflict Handling

- Always pull `develop` before pushing.
- If conflicts: resolve locally, test, commit, then push.
- If unsure, **discuss with lead** before forcing changes.

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [TailwindCSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Conventional Commits](https://www.conventionalcommits.org/)
