# AI Rules — Fractal Kernel

These rules define how AI coding agents (Cursor, Copilot, Antigravity, etc.) should work in this codebase.

Read this before starting any work.

---

## The One Rule

Every new capability is a **Feature**. A Feature is a folder inside `server/features/` that contains a `feature.manifest.json`.

That is the entire rule. Everything else follows from it.

---

## Feature Structure

```
server/features/my-feature/
├── feature.manifest.json   ← REQUIRED. Without this, the Kernel ignores the folder.
├── routes.js               ← HTTP layer only. No business logic here.
└── service.js              ← Business logic only. No HTTP here.
```

Optional files (add only if needed):
- `cron.js` — Scheduled tasks. Declare as `"boot": "./cron.js"` in the manifest.
- `README.md` — What this feature does and why it exists.

---

## Manifest Fields

```json
{
  "id": "my-feature",          // Unique. snake-case or kebab-case.
  "name": "My Feature",        // Human-readable name.
  "description": "...",        // What it does. One sentence.
  "version": "1.0.0",
  "enabled": true,             // Set to false to disable without deleting.
  "basePath": "/api/my-feature", // All routes in routes.js are relative to this.
  "routes": "./routes.js"
}
```

---

## Rules for the AI Agent

1. **Never modify `kernel.js`** — It is stable infrastructure. Do not touch it.
2. **Never modify `index.js`** — The boot file is stable. Do not touch it.
3. **One task = one feature folder** — Do not spread a feature across multiple folders.
4. **Routes call Service. Service does work.** Keep the separation strict.
5. **Use `_example` as your template** — Copy it, rename the folder, update the manifest.
6. **Create the manifest first** — The Kernel finds features by manifest. No manifest = no feature.
7. **Set `enabled: false` to disable**, not delete. Delete only when certain.
8. **Update `task.todo` as you work** — Track progress so context resets don't lose state.

---

## Step-by-Step: Adding a New Feature

```bash
# 1. Copy the template
cp -r server/features/_example server/features/my-feature

# 2. Update the manifest
#    Change id, name, description, basePath

# 3. Write your logic in service.js

# 4. Expose it via routes.js

# 5. Restart the server — Kernel auto-discovers it
```

---

## What NOT to Do

- Do not add routes directly to `index.js`
- Do not import one feature directly into another — use events or HTTP calls
- Do not store shared state between features in memory
- Do not skip the manifest — without it, the folder is invisible to the Kernel
- Do not put business logic in `routes.js`

---

## Sub-Features (Fractal Depth)

A Feature can have child Features. The Kernel stops recursion at the first manifest it finds — so a parent feature owns its own directory. If you need sub-features, they live inside the parent's folder and have their own manifests.

The parent feature is responsible for managing its own children. The Kernel only discovers the parent.
