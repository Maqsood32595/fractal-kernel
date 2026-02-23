# Fractal Kernel

A manifest-driven feature architecture for Node.js + Express, designed to work cleanly with AI coding agents.

> **Note:** This is a pattern extracted from a personal production project. It is not academically validated. It worked well for me — I'm sharing it to get feedback.

---

## The Problem

When building with AI agents, codebases tend to hit a wall around feature 8-15. The AI starts breaking existing code while adding new features, because it has to read the entire codebase to understand context. As the project grows, the signal-to-noise ratio drops and mistakes increase.

## How This Helps

Features are isolated into self-contained folders. A central Kernel auto-discovers and mounts them. The AI only needs to work inside one folder per task — it cannot accidentally touch code it shouldn't.

```
server/
├── kernel.js                        ← Never modify this
├── index.js                         ← Never modify this
└── features/
    ├── auth/
    │   ├── feature.manifest.json    ← Declares this folder as a feature
    │   ├── routes.js                ← HTTP only
    │   └── service.js              ← Business logic only
    ├── payments/
    │   ├── feature.manifest.json
    │   ├── routes.js
    │   └── service.js
    └── _example/                    ← Copy this to add a new feature
```

When a new feature folder is added with a manifest, the Kernel finds and mounts it automatically on next boot. No registration needed.

---

## Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/fractal-kernel.git
cd fractal-kernel
npm install
npm run dev
```

Visit:
- `http://localhost:3000/api/example` — Example feature (copy `_example` to get started)
- `http://localhost:3000/api/features` — Lists all discovered and loaded features

---

## Adding a Feature

1. Copy `server/features/_example/` to `server/features/your-feature/`
2. Update `feature.manifest.json` — change `id`, `name`, `basePath`
3. Write logic in `service.js`, expose it in `routes.js`
4. Restart the server

The Kernel discovers and mounts it. No other files change.

---

## Disabling a Feature

Set `"enabled": false` in the manifest. The Kernel will skip it on next boot. No code deletion needed.

---

## File Structure Explained

| File | Purpose |
|---|---|
| `kernel.js` | Recursive discovery and mounting engine. Do not modify. |
| `index.js` | Express setup and server boot. Do not modify. |
| `feature.manifest.json` | Declares a folder as a feature. Required for discovery. |
| `routes.js` | HTTP layer. Call service functions. No business logic. |
| `service.js` | Business logic. No HTTP. Testable in isolation. |
| `AI_RULES.md` | Instructions for AI coding agents about this codebase. |

---

## For AI Coding Agents

Read `AI_RULES.md` before making any changes. The rules are short and the pattern is straightforward. The `_example` folder is the authoritative template.

---

## Honest Limitations

- Designed for solo or small-team development. Not tested at enterprise scale.
- Addresses AI context management and development complexity, not traffic or infrastructure scaling.
- Similar patterns exist (Vertical Slice Architecture, Plugin Systems). This is a practical implementation, not a new concept.
- Team workflows (concurrent feature development, merge conflicts) not formally tested.

---

## What the Production App Looks Like

This pattern powers [shortshub.app](https://shortshub.app) — a video tools SaaS built and maintained by one developer using AI agents.

---

## License

MIT
