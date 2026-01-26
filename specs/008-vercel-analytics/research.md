# Research: Vercel Analytics Integration

**Feature**: 008-vercel-analytics
**Date**: 2026-01-26

## Research Tasks

### 1. Vercel Analytics Package Selection

**Question**: Which package(s) are needed for analytics and Web Vitals?

**Decision**: Use `@vercel/analytics` package only

**Rationale**:
- `@vercel/analytics` provides both page view tracking AND Web Vitals (LCP, FID, CLS) out of the box
- The separate `@vercel/speed-insights` package is for more detailed performance metrics but is NOT required for basic Web Vitals
- One package = simpler = aligns with Constitution Principle II (Simplicity)

**Alternatives Considered**:
- `@vercel/analytics` + `@vercel/speed-insights`: More detailed metrics but adds unnecessary complexity for current requirements
- Third-party analytics (Google Analytics, Plausible): Requires more configuration, may need cookie consent, doesn't integrate as seamlessly with Vercel dashboard

### 2. Integration Pattern for Next.js App Router

**Question**: How should analytics be integrated with Next.js 14 App Router?

**Decision**: Add `<Analytics />` component inside `<body>` in root layout.tsx

**Rationale**:
- Official Vercel documentation recommends this placement
- Component is a Client Component internally but works in Server Components via automatic boundary handling
- Placement in root layout ensures all routes are tracked automatically

**Alternatives Considered**:
- Script injection via `next/script`: Works but less idiomatic, doesn't get automatic route change detection
- Per-page import: Violates DRY principle, easy to miss pages

### 3. Privacy and Cookie Compliance

**Question**: Does Vercel Analytics require cookie consent banners?

**Decision**: No cookie consent banner required

**Rationale**:
- Vercel Analytics is privacy-friendly by design
- Does NOT use cookies
- Does NOT collect personal data or PII
- Uses privacy-preserving techniques (no cross-site tracking)
- Compliant with GDPR without requiring consent (no personal data processing)

**Alternatives Considered**:
- Adding cookie consent anyway: Unnecessary complexity, poor UX for no benefit

### 4. Local Development Behavior

**Question**: How does analytics behave in development mode?

**Decision**: Include component in all environments; analytics automatically disabled in dev

**Rationale**:
- Vercel Analytics automatically detects non-production environments
- In development, the component renders but doesn't send data
- No conditional logic needed (keep it simple)
- Production detection is automatic via Vercel deployment

**Alternatives Considered**:
- Environment variable toggle: Adds unnecessary code; Vercel handles this automatically
- Conditional import: Over-engineering for a solved problem

### 5. Performance Impact Assessment

**Question**: What is the performance overhead of adding analytics?

**Decision**: Accept ~1-2KB gzipped bundle size increase, async loading

**Rationale**:
- @vercel/analytics is ~1.3KB gzipped
- Loads asynchronously, does not block rendering
- Well within SC-003 target (<50ms additional load time)
- Vercel's own benchmarks show negligible impact

**Alternatives Considered**:
- Lazy loading with dynamic import: Unnecessary micro-optimization; package already loads async

## Summary

This is a straightforward integration with no open questions. The research confirms:

1. Single package (`@vercel/analytics`) meets all requirements
2. Add one import and one component to `layout.tsx`
3. No cookie consent needed
4. Works automatically in development without extra configuration
5. Performance impact is negligible

**Phase 0 Status**: ✅ Complete - No NEEDS CLARIFICATION items remain
