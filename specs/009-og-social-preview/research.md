# Research: Open Graph Social Preview

**Feature**: 009-og-social-preview
**Date**: 2026-01-26

## Research Summary

This feature has minimal unknowns due to clear requirements and well-documented Next.js conventions. Research focused on three areas: Next.js OG image generation patterns, font handling in ImageResponse, and OG metadata best practices.

---

## 1. Next.js OG Image Generation

**Decision**: Use Next.js file-based conventions with `opengraph-image.tsx`

**Rationale**:
- Built into Next.js 14 - no additional dependencies required
- File-based routing automatically configures OG meta tags
- Images are generated at build time (static) or cached at the edge (dynamic)
- Simpler than manual API routes or external image services

**Alternatives Considered**:

| Alternative | Why Rejected |
|-------------|--------------|
| Static PNG image | Requires manual design work; harder to maintain consistency with app branding |
| External service (Cloudinary, imgix) | Adds dependency; overkill for single static image |
| Manual API route with canvas | More complex; `next/og` provides same result with less code |
| Vercel OG library (separate package) | `next/og` is the same thing, already bundled with Next.js |

---

## 2. Font Handling in ImageResponse

**Decision**: Use Google Fonts URL fetch for Playfair Display

**Rationale**:
- ImageResponse requires font files to be loaded explicitly
- Google Fonts provides direct TTF/WOFF2 URLs that can be fetched at build time
- Playfair Display matches the app's existing heading typography
- Inter (body font) can use system fallback since it's similar to system sans-serif

**Implementation Pattern**:
```typescript
// Fetch font at build time
const playfairFont = fetch(
  new URL('https://fonts.gstatic.com/s/playfairdisplay/v30/...', import.meta.url)
).then((res) => res.arrayBuffer());
```

**Alternatives Considered**:

| Alternative | Why Rejected |
|-------------|--------------|
| Local font files | Requires bundling font files; adds repo size |
| System fonts only | Loses brand consistency with Playfair Display |
| No custom fonts | Acceptable fallback but reduces visual polish |

---

## 3. OG Metadata Configuration

**Decision**: Use Next.js Metadata API with `openGraph` and `twitter` objects

**Rationale**:
- Metadata API automatically generates correct `<meta>` tags
- Type-safe configuration with TypeScript
- File-based OG images are automatically linked
- Single source of truth in `layout.tsx`

**Required Tags** (per spec FR-001 and FR-002):

| Tag | Value |
|-----|-------|
| `og:title` | "Fine Dining Translator" |
| `og:description` | "Turn your simple dish into a pretentious menu masterpiece." |
| `og:image` | Auto-generated from `opengraph-image.tsx` |
| `og:url` | Site URL (from environment or hardcoded) |
| `og:type` | "website" |
| `twitter:card` | "summary_large_image" |
| `twitter:title` | Same as og:title |
| `twitter:description` | Same as og:description |
| `twitter:image` | Auto-generated from `twitter-image.tsx` or shared with OG |

---

## 4. ImageResponse Styling Constraints

**Decision**: Use inline Flexbox styles with brand colors

**Key Constraints Documented**:
- All elements must use `display: flex` (default) or `display: none`
- Only inline styles work - no Tailwind classes
- Supported: flexbox, colors, fonts, borders, border-radius, shadows
- NOT supported: CSS Grid, calc(), CSS variables, pseudo-elements, animations

**Brand Assets to Replicate**:

| Element | Value | Source |
|---------|-------|--------|
| Background | `#F5F0E6` (cream) | tailwind.config.ts |
| Text | `#2D2A26` (charcoal) | tailwind.config.ts |
| Accent | `#A8E6CF` (mint) | tailwind.config.ts |
| Heading font | Playfair Display | layout.tsx |
| Image size | 1200×630px | OG standard |

---

## 5. Testing & Validation

**Decision**: Manual validation using platform debugger tools

**Validation Steps**:
1. Local: Visit `/opengraph-image` directly in browser
2. Facebook: Use [Sharing Debugger](https://developers.facebook.com/tools/debug/)
3. Twitter: Use [Card Validator](https://cards-dev.twitter.com/validator)
4. LinkedIn: Use [Post Inspector](https://www.linkedin.com/post-inspector/)

**Note**: Platform validators require publicly accessible URL - test after deployment to Vercel.

---

## Resolved Clarifications

No NEEDS CLARIFICATION markers were present in the spec. All technical decisions were informed by:
- Existing codebase analysis (layout.tsx, tailwind.config.ts)
- Next.js 14 documentation and conventions
- OG image generation best practices

---

## References

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js OG Image Generation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
