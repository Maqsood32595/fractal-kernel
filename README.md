# Fractal Kernel — with-frontend branch

This branch adds a **vanilla JS frontend** to the backend-only `main` branch.

The same feature-per-folder pattern applies to both sides:

```
fractal-kernel/
├── server/
│   ├── kernel.js                        ← Backend discovery engine
│   ├── index.js                         ← Serves API + static frontend
│   └── features/
│       └── _example/
│           ├── feature.manifest.json    ← Declares the feature
│           ├── routes.js                ← Backend HTTP routes
│           └── service.js              ← Backend business logic
│
└── client/
    ├── index.html                       ← SPA shell — auto-builds nav from /api/features
    └── features/
        └── _example/
            └── app.js                   ← Frontend page — calls backend API, registers itself
```

**One feature = one folder on the server + one folder in the client.**

The Kernel handles the backend. The client shell calls `/api/features` at load time and builds the sidebar nav automatically — just like the Kernel auto-discovers backend features.

---

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` — you'll see the frontend shell with the Example feature in the sidebar.

---

## Adding a Full-Stack Feature

```bash
# Backend
cp -r server/features/_example server/features/my-feature

# Frontend
cp -r client/features/_example client/features/my-feature
```

Then:
1. Update `server/features/my-feature/feature.manifest.json` — change `id`, `name`, `basePath`
2. Write backend logic in `server/features/my-feature/service.js`
3. Expose it in `server/features/my-feature/routes.js`
4. Write frontend UI in `client/features/my-feature/app.js` — call `FractalKernel.register('my-feature', renderFn)`
5. Add `'/features/my-feature/app.js'` to the `featureScripts` array in `client/index.html`
6. Restart the server

The backend is auto-discovered. The frontend self-registers. Both sides follow the same pattern.

---

## How the Frontend Works

The `client/index.html` is a minimal SPA shell. On load:
1. It fetches `/api/features` to get the list of backend features
2. It loads each script in `featureScripts` — each feature registers its own page via `window.FractalKernel.register()`
3. Navigation is hash-based (`#/feature-id`) — no build step, no router library

Feature scripts live at `client/features/your-feature/app.js` and self-register. Adding a feature to the frontend is as simple as adding a script tag and calling `register()`.

---

## For AI Coding Agents

Read `AI_RULES.md` before starting any work. The pattern for full-stack features:

- Backend: one feature folder with manifest, routes, service
- Frontend: mirror folder in `client/features/` with `app.js`
- Both are independent — the frontend calls the backend via `fetch()`
- Never import one feature's `app.js` into another

---

## Limitations

- No build step, no TypeScript. This is intentional — zero toolchain complexity.
- If you need React or Vue, create your own frontend in `client/` and keep the backend pattern as-is.
- The client is a demonstration of the pattern, not a production UI framework.
