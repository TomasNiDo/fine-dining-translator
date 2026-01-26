# Quickstart: Open Graph Social Preview

**Feature**: 009-og-social-preview
**Date**: 2026-01-26

## What We're Building

Adding rich social media previews so when someone shares the Fine Dining Translator URL on Facebook, Twitter, or LinkedIn, it displays a beautiful branded preview card with our image, title, and description.

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `app/layout.tsx` | Modify | Add OG and Twitter metadata |
| `app/opengraph-image.tsx` | Create | Generate dynamic OG image |
| `app/twitter-image.tsx` | Create | Twitter card image (can re-export OG) |

## Implementation Steps

### Step 1: Update Metadata in layout.tsx

Add Open Graph and Twitter metadata to the existing `Metadata` export:

```typescript
export const metadata: Metadata = {
  title: "Fine Dining Translator",
  description: "Turn your simple dish into a pretentious menu masterpiece.",
  openGraph: {
    title: "Fine Dining Translator",
    description: "Turn your simple dish into a pretentious menu masterpiece.",
    url: "https://your-domain.vercel.app",
    siteName: "Fine Dining Translator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fine Dining Translator",
    description: "Turn your simple dish into a pretentious menu masterpiece.",
  },
};
```

### Step 2: Create opengraph-image.tsx

Create `app/opengraph-image.tsx` using Next.js conventions:

```typescript
import { ImageResponse } from "next/og";

export const alt = "Fine Dining Translator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Fetch Playfair Display font
  const playfairData = await fetch(
    new URL("https://fonts.gstatic.com/s/playfairdisplay/v30/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgA.ttf")
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          background: "#F5F0E6",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        {/* Title */}
        <div
          style={{
            fontFamily: "Playfair Display",
            fontSize: 72,
            color: "#2D2A26",
            marginBottom: "24px",
          }}
        >
          Fine Dining Translator
        </div>
        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: "#2D2A26",
            opacity: 0.8,
          }}
        >
          Turn your simple dish into a pretentious menu masterpiece.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Playfair Display",
          data: playfairData,
          style: "normal",
        },
      ],
    }
  );
}
```

### Step 3: Create twitter-image.tsx

The simplest approach is to re-export the OG image:

```typescript
export { default, alt, size, contentType } from "./opengraph-image";
```

Or create a separate file with identical content if different styling is needed.

## Local Testing

1. Run the dev server: `npm run dev`
2. Visit `http://localhost:3000/opengraph-image` to see the generated image
3. Visit `http://localhost:3000/twitter-image` to see the Twitter card image

## Production Validation

After deploying to Vercel:

1. **Facebook**: https://developers.facebook.com/tools/debug/
   - Enter your URL and click "Debug"
   - Verify all OG tags are present

2. **Twitter**: https://cards-dev.twitter.com/validator
   - Enter your URL and click "Preview card"
   - Should display "summary_large_image" card

3. **LinkedIn**: https://www.linkedin.com/post-inspector/
   - Enter your URL and click "Inspect"
   - Verify preview renders correctly

## Brand Colors Reference

From `tailwind.config.ts`:

| Color | Hex | Usage |
|-------|-----|-------|
| cream | #F5F0E6 | Background |
| charcoal | #2D2A26 | Text |
| mint | #A8E6CF | Accent (optional) |
| blush | #F5B5C8 | Accent (optional) |

## Common Issues

| Issue | Solution |
|-------|----------|
| Image not updating | Clear platform cache using their debugger tools |
| Font not rendering | Verify font URL is accessible; check `fonts` array in ImageResponse |
| Image dimensions wrong | Ensure `size` export matches ImageResponse options |
| Metadata not appearing | Check that layout.tsx exports `metadata` (not `Metadata`) |
