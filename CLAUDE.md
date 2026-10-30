# CLAUDE.md

Guidance for working in this repo across sessions. Read this first; `README.md` holds the
evolving design notes (distance metrics, filters, ideas) and is the source of truth for *what*
the project is trying to do.

## What this project is

**lethologica** — an app that induces the "tip of your tongue" feeling. Take a sentence and
replace each word with the closest-matching *pseudo-word* (or wrong-but-near real word) using
some distance metric. The near-miss is the point.

It's a cross-disciplinary showcase: **computer science × linguistics, leaning linguistic.**
So the interesting substance lives in the metrics, phonology, and word-choice logic — not in
re-implementing plumbing. See `README.md` for the planned orthographic/phonological metrics,
filters, and lexical ideas.

## Who I'm working with (how to help)

The owner is using this as an **intro to TypeScript, JavaScript, and React**. So:

- **Don't write large chunks of code or build whole features.** Show the *shape* of a concept:
  the general structure, the key syntax, a small illustrative snippet, or a skeleton with gaps.
- **Explain the "why,"** especially for React: why a given hook fits here, what re-render or
  state-flow problem it solves, what the TS types buy us. A sentence of reasoning beats a wall
  of code.
- **Prefer a well-maintained npm package over hand-rolling algorithms.** We don't want to write
  Levenshtein by hand when `fastest-levenshtein` exists. When suggesting an approach, point to
  the package first, then explain how to wire it in.
- Default to guiding and pairing, not delivering. If a task genuinely needs a lot of code,
  pause and check scope first.

## Tech stack

- **Build/dev:** Vite 8 (`vite.config.ts`), `base: '/lethologica/'` because it deploys to
  GitHub Pages under that path. React 19 via `@vitejs/plugin-react`.
- **Language:** TypeScript 6 (strict project refs: `tsconfig.json` → `tsconfig.app.json` +
  `tsconfig.node.json`). ES modules (`"type": "module"`).
- **UI:** React 19 + shadcn-style components built on **Base UI** (`@base-ui/react`), styled
  with **Tailwind CSS v4** (configured in `src/index.css`, no `tailwind.config` file —
  v4 is CSS-first). Variants via `class-variance-authority`; `cn` helper merges classNames.
- **Icons:** Hugeicons. **Font:** Inter (`@fontsource-variable/inter`).
- **Lint:** oxlint (`.oxlintrc.json`).
- **Distance metric (current):** `fastest-levenshtein` (`distance` import).

## Layout

```
src/
  main.tsx            React entry — mounts <App/> in StrictMode
  App.tsx             the app UI (textarea → metric combobox → calculate button)
  index.css           Tailwind v4 setup + theme tokens (global styles live here)
  App.css             component-scoped styles for App
  lib/utils.ts        shared helpers (re-exports `cn`)
  components/ui/      shadcn/Base-UI primitives (button, input, textarea, combobox, input-group)
  assets/            images (hero.png, svgs)
public/              static files served as-is (favicon, icons.svg)
```

New app logic (metrics, filters, word lists) doesn't have a home yet — likely a `src/lib/`
module (e.g. `src/lib/metrics.ts`) so the algorithm layer stays separate from the React UI.

## Conventions

- **Import alias `@/` → `src/`** (set in both `vite.config.ts` and tsconfig). Use
  `@/components/ui/button`, `@/lib/utils`, etc. rather than long relative paths.
- Components come from `@/components/ui`; add new shadcn components with the shadcn CLI
  (config in `components.json`, style `base-mira`, icon library `hugeicons`) rather than
  copying by hand.
- Styling is Tailwind utility classes in JSX; reach for `cn()` when conditionally combining.

## Commands

```
npm run dev       # Vite dev server
npm run build     # tsc -b then vite build (type-checks the whole project)
npm run preview   # serve the production build
npm run lint      # oxlint
```

## Deploy

GitHub Pages via `.github/workflows/deploy.yml` (Node 24). The `base: '/lethologica/'` in
the Vite config must match the Pages subpath — don't change one without the other.
