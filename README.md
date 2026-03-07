# Fractal Kernel

A manifest-driven feature discovery engine for Node.js + Express. This repository demonstrates how to solve Context Explosion and Hallucination Bleed when coding with AI agents.

## 🎓 The Three-Branch Learning Path

This repository is split into three branches, designed progressively to show how the Fractal Architecture scales from a simple Backend API to a fully Orchestrated Control Plane.

### 1. The `main` Branch (Backend API Only)
The core of the Fractal Kernel. It features the `server/kernel.js` discovery engine. 
- **Concept:** One feature = One folder.
- **Why it matters:** AI agents are restricted to a single feature folder. They physically cannot see—and therefore cannot break—unrelated logic.
- **Setup:** `npm install` && `npm start`

### 2. The `with-frontend` Branch (Vanilla JS SPA)
Extends the architecture to the client side using zero build tools.
- **Concept:** The `client/index.html` shell fetches the active manifests from the Kernel and dynamically loads each feature's `app.js` into the sidebar.
- **Why it matters:** Proves the feature-per-folder concept works on the frontend without complex bundlers or build steps.
- **Setup:** `npm install` && `npm run dev`

### 3. The `with-admin-dashboard` Branch (You Are Here)
Introduces the **Parallel Admin Control** pattern. It adds a Vite/React application running on a separate port (`:5004`) to act as the Control Plane for the Feature Plane (`:3000`).
- **Concept:** While the LLM builds the Feature, it simultaneously builds the Admin Control. The Admin UI allows you to monitor and toggle features remotely.
- **Why it matters:** Runtime Kill-Switch. If an AI hallucination breaks a specific "Cell", the Admin Dashboard can disable it dynamically without dropping the entire platform or requiring a redeploy.

---

## 🛠️ Setting up the Admin Dashboard (Control Plane)

On this branch, the backend serves the API on port `3000` while a separate React app (the Control Plane) runs on port `5004`.

### 1. Start the Backend (Feature Plane)
```bash
# In the repository root
npm install
npm run dev:backend
```
The Kernel starts on `http://localhost:3000` and serves `GET /api/features` and `POST /api/features/:id/toggle`.

### 2. Start the Admin Dashboard (Control Plane)
```bash
# Open a new terminal and navigate to the admin-system folder
cd client/features/admin-system
npm install
npm run dev
```
Visit `http://localhost:5004` to open the Fractal Kernel Control Plane.

### 3. Test the Setup
1. Look at your Admin Dashboard on port `5004`. It queries the kernel dynamically.
2. Click the power button toggle on the `_example` feature.
3. The Admin dashboard fires a `POST` request to the Kernel to disable the feature.

---

## 🤖 Rules for AI Agents

Read `AI_RULES.md` before starting work.

**The Twin-Build Rule:** When creating a feature, the agent must define the logic in the `features/` folder AND (if applicable) its corresponding admin capabilities.

**No Cross-Talk:** Never import one feature's `service.js` into another. 

**Manifest First:** Every feature must declare its identity, routes, and "Enabled" status in its `feature.manifest.json`.
