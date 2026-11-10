# Development Plan

| Phase | Scope | Exit criteria |
| --- | --- | --- |
| 1. Repository audit | Inspect workspace, git, assets, toolchain | `PROJECT_AUDIT.md` |
| 2. Technical planning | Stack, structure, content model, publication rules | `TECHNICAL_ARCHITECTURE.md`, `PRODUCT_INVENTORY.md` |
| 3. Design system | Tokens (colour, type, spacing), layout primitives, buttons, section headings, reveal motion | Tokens in `globals.css`; shared components |
| 4. Homepage | 10 sections from the brief | Renders, no console errors, responsive |
| 5. Product portfolio | `/products`, `/products/[slug]`, data-driven template | Every published product prerendered; unverified sections hidden |
| 6. Remaining pages | Solutions, industries, about, case studies, insights, contact, legal | All routes return 200; detail routes 404 for unknown slugs |
| 7. CMS | Sanity schemas, GROQ client, local fallback | Works with and without env vars |
| 8. Lead generation | Contact + demo forms, API, spam protection, delivery | Validation + submission tested end-to-end |
| 9. SEO & performance | Metadata, OG, sitemap, robots, JSON-LD, fonts, images | Metadata present on every route |
| 10. QA | typecheck, lint, unit, e2e, responsive overflow, link crawl | All green, results recorded |
| 11. Production prep | `.env.example`, deployment guide, launch checklist | Docs complete |

## Design direction (art direction notes)

- **Editorial enterprise.** Large Manrope display type with tight tracking, generous whitespace and a 12-column grid. Thin hairline rules divide sections instead of card-heavy layouts.
- **Ink and paper.** Ink `#101827` for authority sections, white and mist `#F4F5F7` for reading surfaces. Teal `#16A6A1` is used sparingly as a signal colour, never as a gradient wash. Teal text on white fails WCAG contrast at small sizes, so links and small text use a darker teal (`#0B7F7B`).
- **Subtle 3D.** One architectural CSS-3D composition in the hero: stacked translucent slabs representing integrated systems layers, with slow drift. Nothing else on the page competes with it.
- **Product visuals** are abstract schematic illustrations, not fake screenshots. They make no implied claims about the real UI.
- **Motion** is restrained: reveal-on-scroll (progressive enhancement), hover underlines, and the hero drift. Everything is disabled under `prefers-reduced-motion`.
