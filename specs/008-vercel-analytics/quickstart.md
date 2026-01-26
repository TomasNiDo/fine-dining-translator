# Quickstart: Vercel Analytics Integration

**Feature**: 008-vercel-analytics
**Date**: 2026-01-26

## Overview

This feature adds Vercel Analytics to track page views and Web Vitals performance metrics. The implementation is minimal: one package installation and one file modification.

## Prerequisites

- Vercel account with project deployed
- Analytics enabled in Vercel project settings (Project → Analytics → Enable)

## Implementation Steps

### Step 1: Install Package

```bash
npm install @vercel/analytics
```

### Step 2: Add Analytics Component

Modify `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

// ... existing font configuration ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-cream font-body text-charcoal min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Step 3: Deploy and Verify

1. Deploy to Vercel (push to main branch or manual deploy)
2. Visit the deployed application
3. Check Vercel Dashboard → Project → Analytics
4. Verify page views appear within 24 hours

## Verification Checklist

| Check | Expected Result |
|-------|-----------------|
| Build succeeds | No TypeScript errors |
| Local dev works | App loads normally (analytics silent) |
| Production page view | Appears in Vercel Analytics dashboard |
| Web Vitals | LCP, FID, CLS metrics visible in dashboard |
| No console errors | Browser console clean |

## Troubleshooting

**Analytics not showing in dashboard:**
- Ensure Analytics is enabled in Vercel project settings
- Wait up to 24 hours for first data to appear
- Verify deployment is on Vercel (not local or other host)

**Build errors:**
- Ensure `@vercel/analytics` is installed (check package.json)
- Import path should be `@vercel/analytics/react` for App Router

## Files Changed

| File | Change |
|------|--------|
| `package.json` | Add `@vercel/analytics` dependency |
| `app/layout.tsx` | Import and render `<Analytics />` component |

## Related Documentation

- [Vercel Analytics Documentation](https://vercel.com/docs/analytics)
- [Next.js App Router Analytics Guide](https://vercel.com/docs/analytics/quickstart)
