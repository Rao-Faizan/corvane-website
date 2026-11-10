# Project Audit — Corvane Consulting Website

**Audit date:** 2026-11-11
**Status:** Completed

## 1. Working directory

| Item | Finding |
| --- | --- |
| Working directory | `C:\Users\Faizan\Downloads\documentation\New folder` |
| State at audit time | **Empty** — no source code, no `package.json`, no assets |
| Existing framework | None |
| Existing components / UI | None |
| Existing CMS configuration | None |
| Existing routes | None |
| Logos, fonts, images | None supplied |

Because the directory was empty, the project was initialised with the recommended stack (Next.js App Router + TypeScript + Tailwind CSS). Nothing was overwritten or deleted.

## 2. Git

| Item | Finding |
| --- | --- |
| Repository root | `C:\Users\Faizan\Downloads\documentation` (the **parent** folder) |
| Branch | `main`, **no commits yet** |
| Remote | None configured |
| Staged files (pre-existing) | 11 documents (`.docx`, `.pdf`, `.jpeg`, `PROJECT_TRACKER.md`) in the parent folder |

### Important observation about the parent folder

The pre-existing staged files belong to **other organisations and engagements** (bld.ai proposals and briefs, a Kai Consulting portal tracker, a banking AI diagram, RFP responses). None mention Corvane.

Decisions:

- These files were **not** read for content, reused, or referenced anywhere on the website.
- The parent repository's index was **not modified**. No commits were made.
- **Recommendation:** give the Corvane website its own repository (for example `git init` inside this folder, or move this folder out of `documentation/`) so it isn't tracked together with unrelated client documents. This decision is left to the team (see `IMPLEMENTATION_PROGRESS.md` → Pending decisions).

## 3. Toolchain found

| Tool | Version |
| --- | --- |
| Node.js | 26.13.0 |
| npm | 11.20.0 |
| OS | Windows 10 Pro |

## 4. Corvane products — what was available to inspect

The brief requires every product capability to be verified against the actual software before publication.

**No Corvane product source code, demo environment, screenshots, documentation, or videos were available in the workspace.** Therefore:

- Every product is classified as **unverified** (see `PRODUCT_INVENTORY.md`).
- No product feature, integration, deployment option, screenshot, metric or certification is published.
- Product pages are built from a data model that renders verified sections automatically once management supplies verified content.

## 5. Business information available

| Information | Available? | Source |
| --- | --- | --- |
| Company name | Yes | Brief |
| Positioning / tagline | Yes (proposed) | Brief |
| Brand colours | Yes (proposed) | Brief |
| Hero and CTA copy | Yes | Brief |
| Target markets (Pakistan, GCC) | Yes | Brief |
| Product family names | Yes (proposed, not confirmed as commercial products) | Brief |
| Logo | **No** — a provisional wordmark was created | — |
| Contact email / phone / address | **No** | — |
| Social media accounts | **No** | — |
| Client names, logos, testimonials | **No** | — |
| Case studies | **No** | — |
| Company statistics | **No** | — |
| Leadership / team | **No** | — |
| Legal entity name, registered address | **No** | — |
| Production domain | **No** | — |
| Hosting environment | **No** (VPS assumed possible; build is portable) | — |
| Sanity / email credentials | **No** | — |

## 6. Assumptions

1. The website is a new build. No existing site has to be migrated.
2. The production domain is unknown. It is configured through `NEXT_PUBLIC_SITE_URL`.
3. The hosting target may be a VPS. The app is built as a Node.js `standalone` server so it runs on a VPS, in a container or on a managed platform.
4. Pakistan and GCC audiences read English, so the site is English-only for launch.
5. The supplied colours, tagline and product names are approved for use in **design**. Product names are shown as product families, not as confirmed commercial availability, until management confirms.

## 7. Missing information (blocking for launch, not for development)

See `PRODUCT_CONTENT_REQUIREMENTS.md` for the full content checklist. In summary:

- Final logo and brand assets
- Approved company contact details and social profiles
- Product verification and commercialisation approval per product
- Approved case studies (with client consent)
- Legal review of the Privacy Policy and Terms
- Production domain, hosting details and email (Resend/SMTP) credentials
- Sanity project ID and dataset (optional: the site runs on local typed content without it)
