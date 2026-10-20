# FormalCert-AI website

Organization homepage: https://formalcert-ai.github.io

LLM2Cert project page: https://formalcert-ai.github.io/llm2cert/

Runtime monitoring project page: https://formalcert-ai.github.io/runtime-barrier-monitor/

Statistical certification project page: https://formalcert-ai.github.io/statistical-barrier-certification/

Statistical certification paper repository: https://github.com/FormalCert-AI/statistical-barrier-certification

Runtime monitoring paper repository (PDF only): https://github.com/FormalCert-AI/runtime-barrier-monitor

Code and experiment records: https://github.com/FormalCert-AI/llm2cert

The site uses static HTML, CSS, and JavaScript. GitHub Pages publishes the `main` branch from the repository root. No build step is required.

- `index.html`: organization homepage, research projects, and publications.
- `llm2cert/index.html`: paper, benchmark, results, and citation.
- `runtime-barrier-monitor/index.html`: working paper, author, supervisor, and paper links. No code is included in this release.
- `statistical-barrier-certification/`: manuscript overview, interactive set-level PAC explainer, original experimental figures, selected results, and citation. Its `project.js` is presentation code for the website, not the research implementation.
- `assets/`: paper PDFs and the LLM2Cert framework figure. `barrier-like-reach-avoid.pdf` is the reach-avoid comparison paper on arXiv (2512.05348).

`assets/runtime-barrier-monitor.pdf` is an unchanged copy of the supplied 2026-10-19 manuscript. Keep it byte-identical to `runtime-barrier-monitor.pdf` in the paper repository when updating the public version.

The homepage uses `assets/runtime-barrier-monitor-framework.png`, rendered from the manuscript's `figure/framework_new.pdf`, as the runtime project thumbnail. Its full landscape composition is retained. Project cards and the research-direction links are ordered Runtime Barrier Monitoring, LLM2Cert, then Statistical Barrier Certification.

`assets/statistical-barrier-certification.pdf` is the 26-page preprint prepared on 2026-10-20. It must remain byte-identical to `paper/statistical-barrier-certification.pdf` in the project repository. Figures in `assets/statistical-barrier/` are unchanged copies of manuscript Figures 1–3; `overview.svg` is a separately labeled explanatory schematic.

When updating the statistical certification paper, replace both PDF copies together. Update the manuscript date, selected table values, and corresponding figures when the paper changes. The interactive explainer uses an illustrative region under a uniform reference measure and the scalar scenario sample bound; its controls are not numerical simulation or certification of a new system.

The organization homepage and project page share the transparent FC logo in `assets/formalcert-ai-fc-icon.png`, used in their headers and browser icons. The logo keeps its transparent background so the site's warm paper color shows through. The same square asset can be used for the GitHub organization avatar.

For a local preview, run `python3 -m http.server 8765` and open http://localhost:8765.
