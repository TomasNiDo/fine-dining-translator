# Metadata Contract: Open Graph Social Preview

**Feature**: 009-og-social-preview
**Date**: 2026-01-26

## Overview

This feature doesn't expose HTTP APIs. Instead, it defines the contract for HTML `<meta>` tags that social platforms parse when crawling the page.

## HTML Meta Tag Contract

When a social platform fetches the app URL, the HTML `<head>` must contain these meta tags:

### Open Graph Tags (Required)

```html
<meta property="og:title" content="Fine Dining Translator" />
<meta property="og:description" content="Turn your simple dish into a pretentious menu masterpiece." />
<meta property="og:image" content="https://{domain}/opengraph-image" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Fine Dining Translator - Transform dishes into pretentious descriptions" />
<meta property="og:url" content="https://{domain}/" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Fine Dining Translator" />
```

### Twitter Card Tags (Required)

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Fine Dining Translator" />
<meta name="twitter:description" content="Turn your simple dish into a pretentious menu masterpiece." />
<meta name="twitter:image" content="https://{domain}/twitter-image" />
<meta name="twitter:image:alt" content="Fine Dining Translator - Transform dishes into pretentious descriptions" />
```

## Image Endpoint Contract

### GET /opengraph-image

**Response**: PNG image (1200×630 pixels)

| Header | Value |
|--------|-------|
| Content-Type | image/png |
| Cache-Control | public, max-age=31536000, immutable |

**Visual Requirements**:
- Background: Cream (#F5F0E6)
- Primary text: Charcoal (#2D2A26)
- Heading font: Playfair Display
- Contains app title and tagline
- Elegant, fine-dining aesthetic

### GET /twitter-image

**Response**: PNG image (1200×630 pixels)

Same contract as `/opengraph-image`. May share the same implementation.

## Validation Checklist

Platforms will validate these meta tags. Use these tools to verify:

| Platform | Validation Tool | Expected Result |
|----------|-----------------|-----------------|
| Facebook | [Sharing Debugger](https://developers.facebook.com/tools/debug/) | All OG tags parsed correctly |
| Twitter/X | [Card Validator](https://cards-dev.twitter.com/validator) | Large image card displayed |
| LinkedIn | [Post Inspector](https://www.linkedin.com/post-inspector/) | Preview card rendered |

## Error Handling

| Scenario | Expected Behavior |
|----------|-------------------|
| Image fails to load | Platforms display title/description only |
| Missing og:image | Plain link displayed (no preview card) |
| Image wrong dimensions | Platform may crop or distort |
| Slow image response | Platform may timeout and skip image |
