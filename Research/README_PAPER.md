# Fractal Kernel Research Paper & Submission Guide

This folder contains the complete academic paper for **Fractal Kernel**, formatted in standard IEEE double-column LaTeX (`IEEEtran`) for publication on preprint servers such as **TechRxiv (by IEEE)** or **arXiv (`cs.SE`)**.

---

## 📁 Included Files

- **[`main.tex`](file:///d:/FastMVPs/Research/main.tex)**: Main IEEE LaTeX document source containing Abstract, Introduction, System Architecture, Manifest Schema, Dynamic Discovery Engine, Empirical Benchmarks, Related Work, and Conclusion.
- **[`references.bib`](file:///d:/FastMVPs/Research/references.bib)**: BibTeX bibliography containing full citations for SWE-bench, LLM Context Windows, Model Context Protocol (MCP), Graph RAG, and Vertical Slice Architectures.

---

## 🛠️ How to Compile `main.tex` to PDF

### Option A: Using Overleaf (Easiest - 1 Minute)
1. Go to your project on [Overleaf.com](https://www.overleaf.com/).
2. Paste the contents of [`main.tex`](file:///d:/FastMVPs/Research/main.tex) directly into `main.tex` in Overleaf.
3. Create `references.bib` in Overleaf and paste the contents of [`references.bib`](file:///d:/FastMVPs/Research/references.bib).
4. Click **Recompile** to generate the final PDF.

### Option B: Local Compilation via CLI / LaTeX Engine
If you have `pdflatex` or `texlive` / `miktex` installed:
```bash
cd Research
pdflatex main.tex
bibtex main
pdflatex main.tex
pdflatex main.tex
```
This generates `main.pdf`.

---

## 🚀 How to Submit

### Route 1: Submit to TechRxiv (IEEE) — Recommended for Instant DOI & Zero Gatekeeping
**TechRxiv** is IEEE’s official open preprint server. It requires **no endorsement codes**, provides an official **IEEE DOI**, and indexes automatically on **Google Scholar**.

1. Go to **[TechRxiv.org](https://www.techrxiv.org/)** and click **Submit**.
2. Sign in with your IEEE account (or create a free account).
3. Fill in the submission details:
   - **Title:** *Fractal Kernel: Deterministic Context Isolation for LLM-Driven Feature Engineering in Node.js Applications*
   - **Author:** Mohammed Maqsood L
   - **Abstract:** Copy the abstract from `main.tex`.
   - **Keywords:** `Software Architecture`, `LLM Context Optimization`, `Agentic Workflows`, `Node.js`, `Vertical Slice`.
   - **Category:** *Software Engineering* / *Computer Science*.
4. Upload your compiled PDF (`Fractal_Kernel_Paper.pdf`).
5. Submit. It will be reviewed within 24–48 hours, assigned an IEEE DOI (`10.36227/techrxiv...`), and indexed on Google Scholar.

---

### Route 2: Submit to arXiv (`cs.SE`)
If you prefer submitting to arXiv under Computer Science -> Software Engineering (`cs.SE`):

1. Go to **[arXiv.org](https://arxiv.org/submit)** and click **Start New Submission**.
2. Select Category: **Computer Science -> Software Engineering (`cs.SE`)**.
3. **Endorsement Check:** If arXiv requests an endorsement code:
   - Copy your unique arXiv endorsement link.
   - Send `Fractal_Kernel_Paper.pdf` + the link to a colleague or author who has published papers in `cs.SE`.
   - Once endorsed, upload your `.tex` and `.bib` files (or compiled package).
4. arXiv will process and announce the paper on the next daily bulletin.

---

## 📊 Paper Summary & Key Metric Highlights

| Metric | Monolith Express | Fractal Kernel | Improvement |
| :--- | :--- | :--- | :--- |
| **Mean Prompt Tokens / Task** | 32,150 | 4,520 | **-85.9%** |
| **First-Pass Task Success Rate** | 62.0% | 91.3% | **+29.3%** |
| **Cross-Slice Regressions** | 38.4% | 0.0% | **-100.0%** |
| **Execution Time / Task** | 142.5s | 38.2s | **-73.2%** |

---

## 📄 License & Attribution
- Paper Author: **Mohammed Maqsood L**
- GitHub Repository: [https://github.com/Maqsood32595/fractal-kernel](https://github.com/Maqsood32595/fractal-kernel)
