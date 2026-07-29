# Fractal Kernel

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.21622791.svg)](https://doi.org/10.5281/zenodo.21622791)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-blue.svg)](https://creativecommons.org/licenses/by/4.0/)

A manifest-driven feature architecture for Node.js + Express, designed to optimize AI coding agent context windows and prevent cross-feature regressions.

> 📄 **Research Paper & Benchmarks:** Read the formal architecture paper and empirical benchmarks published on Zenodo: **[10.5281/zenodo.21622791](https://doi.org/10.5281/zenodo.21622791)**.

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
git clone https://github.com/Maqsood32595/fractal-kernel.git
cd fractal-kernel
npm install
npm run dev
```

Visit:
- `http://localhost:3000/api/example` — Example feature (copy `_example` to get started)
- `http://localhost:3000/api/features` — Lists all discovered and loaded features

---

## Empirical Benchmarks & Evaluation

Empirical benchmark testing across 15 sequential feature tasks demonstrates:
- **85.9% Reduction** in average prompt token consumption per task (from 32,150 to 4,520 tokens).
- **0.0% Cross-Slice Regressions** (completely eliminated vs 38.4% in standard monolith).
- **91.3% First-Pass Task Completion Rate** (up from 62.0%).
- **73.2% Faster Task Execution** (38.2s vs 142.5s).

For full benchmark scripts and raw telemetry data, see [`Research/benchmarks/`](./Research/benchmarks/).

---

## Citation

```bibtex
@article{mohammed2026fractalkernel,
  author    = {Mohammed, Maqsood L},
  title     = {Fractal Kernel: Deterministic Context Isolation for LLM-Driven Feature Engineering in Node.js Applications},
  journal   = {Zenodo Preprint},
  year      = {2026},
  version   = {v1.0.0},
  doi       = {10.5281/zenodo.21622791},
  url       = {https://doi.org/10.5281/zenodo.21622791}
}
```
