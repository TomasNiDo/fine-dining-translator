# Implementation Plan: Open Graph Social Preview

**Branch**: `009-og-social-preview` | **Date**: 2026-01-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/009-og-social-preview/spec.md`

## Summary

Add Open Graph and Twitter Card metadata to enable rich social media previews when sharing the Fine Dining Translator URL. Implement a dynamically generated OG image using Next.js's `next/og` ImageResponse API that renders the app's branding (cream/charcoal colors, Playfair Display typography, elegant styling) as a 1200×630 pixel image.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 14 (App Router)
**Primary Dependencies**: `next/og` (built into Next.js, no additional install needed)
**Storage**: N/A (stateless - no persistence required)
**Testing**: Manual validation via Facebook Sharing Debugger and Twitter Card Validator; visual inspection of `/opengraph-image` route
**Target Platform**: Web (Vercel deployment)
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: OG image generation <500ms; cached at build/edge
**Constraints**: Image must work across Facebook, Twitter/X, LinkedIn, and messaging apps
**Scale/Scope**: Single static OG image for the app homepage

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| **I. User Delight** | ✅ PASS | Rich previews enhance shareability and brand perception |
| **II. Simplicity** | ✅ PASS | Uses Next.js built-in `next/og` - no new dependencies |
| **III. Accessibility** | ✅ PASS | OG images include alt text; metadata improves link previews for all users |
| **Visual Polish** | ✅ PASS | OG image matches app's playful aesthetic |
| **Mobile-First** | N/A | OG images are platform-rendered, not mobile UI |
| **Performance** | ✅ PASS | Images cached at build time; no runtime impact on page load |
| **No Silent Failures** | ✅ PASS | Fallback to title/description if image fails |

**Gate Result**: ✅ PASS - No violations

## Project Structure

### Documentation (this feature)

```text
specs/009-og-social-preview/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (minimal - no data entities)
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
app/
├── layout.tsx           # UPDATE: Add OG metadata to existing Metadata export
├── opengraph-image.tsx  # NEW: Dynamic OG image generation
└── twitter-image.tsx    # NEW: Twitter card image (can re-export OG image)
```

**Structure Decision**: Minimal footprint - only 2-3 new/modified files in the existing `app/` directory. Uses Next.js file-based conventions for automatic OG image routing.

## Complexity Tracking

> No violations - table not needed.

---

## Post-Design Constitution Re-Check

*Re-evaluated after Phase 1 design completion.*

| Principle | Status | Design Verification |
|-----------|--------|---------------------|
| **I. User Delight** | ✅ PASS | OG image uses Playfair Display and brand colors for elegant preview |
| **II. Simplicity** | ✅ PASS | Only 2-3 files; no external dependencies; uses built-in Next.js APIs |
| **III. Accessibility** | ✅ PASS | Alt text defined for all images; metadata improves context for assistive tech |
| **Visual Polish** | ✅ PASS | Design matches app's cream/charcoal aesthetic with serif typography |
| **Performance** | ✅ PASS | Image generated at build time; ~0ms runtime impact |
| **No Dead Code** | ✅ PASS | All code serves a purpose; no unused exports |

**Post-Design Gate Result**: ✅ PASS - Ready for task generation

---

## Generated Artifacts

| Artifact | Path | Status |
|----------|------|--------|
| Implementation Plan | `specs/009-og-social-preview/plan.md` | ✅ Complete |
| Research | `specs/009-og-social-preview/research.md` | ✅ Complete |
| Data Model | `specs/009-og-social-preview/data-model.md` | ✅ Complete |
| Contracts | `specs/009-og-social-preview/contracts/metadata-schema.md` | ✅ Complete |
| Quickstart | `specs/009-og-social-preview/quickstart.md` | ✅ Complete |
| Tasks | `specs/009-og-social-preview/tasks.md` | ⏳ Pending `/speckit.tasks` |

## Next Steps

Run `/speckit.tasks` to generate the implementation task breakdown.
