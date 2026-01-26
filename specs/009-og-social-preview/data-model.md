# Data Model: Open Graph Social Preview

**Feature**: 009-og-social-preview
**Date**: 2026-01-26

## Overview

This feature is stateless and does not introduce persistent data entities. The "data" consists of static configuration values embedded in code.

## Configuration Values (Compile-Time Constants)

These values are defined in `layout.tsx` metadata and `opengraph-image.tsx`:

### OG Metadata

| Field | Type | Value |
|-------|------|-------|
| title | string | "Fine Dining Translator" |
| description | string | "Turn your simple dish into a pretentious menu masterpiece." |
| type | string | "website" |
| siteName | string | "Fine Dining Translator" |

### OG Image Configuration

| Field | Type | Value |
|-------|------|-------|
| width | number | 1200 |
| height | number | 630 |
| contentType | string | "image/png" |
| alt | string | "Fine Dining Translator - Transform dishes into pretentious descriptions" |

### Brand Colors (from tailwind.config.ts)

| Name | Hex Code | Usage |
|------|----------|-------|
| cream | #F5F0E6 | Image background |
| charcoal | #2D2A26 | Primary text |
| mint | #A8E6CF | Accent/decorative |
| blush | #F5B5C8 | Optional accent |

### Typography

| Font | Usage | Fallback |
|------|-------|----------|
| Playfair Display | Heading text | Georgia, serif |
| Inter | Subtext (if any) | system-ui, sans-serif |

## Relationships

```
┌─────────────────────────────────────────────────────────┐
│                    layout.tsx                           │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Metadata.openGraph → references opengraph-image   │  │
│  │ Metadata.twitter   → references twitter-image     │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│               opengraph-image.tsx                       │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Generates PNG using brand colors + fonts          │  │
│  │ Exports: alt, size, contentType, default function │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## State Transitions

N/A - This feature is stateless. The OG image is generated once at build time and cached.

## Validation Rules

| Rule | Description |
|------|-------------|
| Image dimensions | Must be exactly 1200×630 pixels |
| Title length | Should be ≤60 characters for full display |
| Description length | Should be ≤155 characters for full display |
| Image format | Must be PNG for transparency support |
