# Fractal Kernel: Deterministic Context Isolation for LLM-Driven Feature Engineering in Node.js Applications

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.21622791.svg)](https://doi.org/10.5281/zenodo.21622791)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-blue.svg)](https://creativecommons.org/licenses/by/4.0/)
[![GitHub Repository](https://img.shields.io/badge/GitHub-fractal--kernel-green.svg)](https://github.com/Maqsood32595/fractal-kernel)

**Author:** Mohammed Maqsood L  
**Affiliation:** Software Architecture & AI Systems Research, Fractal Kernel Project  
**Contact:** maqsoodlmohammed@gmail.com  
**Zenodo DOI:** [10.5281/zenodo.21622791](https://doi.org/10.5281/zenodo.21622791)  

---

## 📌 Abstract

As Large Language Model (LLM) coding agents are increasingly integrated into commercial software development workflows, scaling codebase size introduces severe performance bottlenecks. Central among these is context window saturation and agentic regression cascades: as a codebase grows beyond 10–15 modules, agents operating under global context frameworks expend excessive prompt tokens and suffer high error rates by modifying non-relevant files. 

This paper introduces **Fractal Kernel**, a manifest-driven architecture for Node.js and Express applications designed specifically for AI agent context window optimization. By enforcing strict physical directory boundaries around features and utilizing a central kernel for zero-registration dynamic runtime discovery, Fractal Kernel caps an LLM agent’s operational context footprint to $O(1)$ complexity relative to application growth. 

We empirically evaluate Fractal Kernel against a standard monolithic Express architecture across 15 sequential feature implementation tasks using state-of-the-art coding agents. Our results demonstrate an **85.9% reduction** in average prompt token consumption per task (from 32,150 to 4,520 tokens), an increase in first-pass task completion rates from **62% to 91%**, and the **complete elimination (0%)** of cross-feature regression bugs.

---

## 📖 Citation

If you use or reference Fractal Kernel in your research or applications, please cite:

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

```text
Mohammed, M. L. (2026). Fractal Kernel: Deterministic Context Isolation for LLM-Driven Feature Engineering in Node.js Applications (Version v1.0.0). Zenodo. https://doi.org/10.5281/zenodo.21622791
```

---

## 📁 Repository & Source Files

- **Manuscript PDF:** [`Fractal_Kernel_Paper.pdf`](./Fractal_Kernel_Paper.pdf)
- **LaTeX Source Archive:** [`fractal_kernel_paper_source.zip`](./fractal_kernel_paper_source.zip)
- **Code & Benchmark Snapshot:** [`fractal-kernel-v1.0.0.zip`](./fractal-kernel-v1.0.0.zip)
- **Empirical Telemetry Report:** [`BENCHMARK_REPORT.md`](./BENCHMARK_REPORT.md)
- **Real Gemini API Telemetry:** [`REAL_API_GEMINI_TOKEN_BENCHMARK_REPORT.md`](./REAL_API_GEMINI_TOKEN_BENCHMARK_REPORT.md)
