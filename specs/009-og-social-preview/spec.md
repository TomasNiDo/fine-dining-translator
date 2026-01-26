# Feature Specification: Open Graph Social Preview

**Feature Branch**: `009-og-social-preview`
**Created**: 2026-01-26
**Status**: Draft
**Input**: User description: "Let's add a title, description, and image preview when we share our app url to social media like facebook or twitter. Use the og-image-generation skill to generate the image for our open graph image preview"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Share App Link on Social Media (Priority: P1)

A user copies the Fine Dining Translator URL and shares it on social media platforms like Facebook, Twitter/X, or LinkedIn. When the link is posted, a rich preview card appears showing an eye-catching branded image, the app title, and a compelling description that encourages clicks.

**Why this priority**: This is the core feature - rich link previews directly impact click-through rates and brand perception when users share the app. Without this, shared links appear as plain text URLs with generic previews.

**Independent Test**: Can be fully tested by sharing the app URL on any social platform (or using a social preview debugger tool) and verifying the branded preview card appears with correct title, description, and image.

**Acceptance Scenarios**:

1. **Given** a user has copied the app URL, **When** they paste it into a Facebook post, **Then** a preview card displays showing the app's branded image, title "Fine Dining Translator", and description about transforming dishes into pretentious menu items.

2. **Given** a user shares the app URL on Twitter/X, **When** the tweet is posted, **Then** a large image card appears with the app branding and a compelling description.

3. **Given** a user shares the app URL on LinkedIn, **When** the post is created, **Then** the professional preview card displays the app's visual identity and clear value proposition.

---

### User Story 2 - Dynamic OG Image Generation (Priority: P2)

The app generates a visually appealing Open Graph image that represents the Fine Dining Translator brand. The image is dynamically generated at build/request time using the app's visual identity (colors, typography, elegant styling).

**Why this priority**: While static images work, a dynamically generated image ensures visual consistency with the app's branding and can be easily updated without manual design work.

**Independent Test**: Can be tested by accessing the OG image URL directly in a browser and verifying it renders a properly styled branded image.

**Acceptance Scenarios**:

1. **Given** a social platform requests the OG image URL, **When** the image is served, **Then** it displays a 1200x630 pixel image with the app's branding, title text, and elegant fine-dining aesthetic.

2. **Given** the app's visual design is updated, **When** the OG image is regenerated, **Then** it reflects the current brand colors and typography automatically.

---

### Edge Cases

- What happens when a social platform's cache holds an old preview? Users can use platform-specific cache refresh tools (Facebook Sharing Debugger, Twitter Card Validator).
- How does the preview appear on messaging apps like WhatsApp, iMessage, or Slack? Should display consistent preview using standard OG tags that these apps support.
- What happens if the image fails to load? Platforms fall back to displaying title and description text only.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST include Open Graph meta tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) in the page HTML head.
- **FR-002**: System MUST include Twitter Card meta tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`) for enhanced Twitter/X previews.
- **FR-003**: System MUST generate a branded Open Graph image (1200x630 pixels) using server-side image generation.
- **FR-004**: The OG image MUST visually represent the Fine Dining Translator brand with appropriate colors, typography, and elegant styling.
- **FR-005**: System MUST set the Twitter card type to "summary_large_image" for maximum visual impact.
- **FR-006**: The OG title MUST be "Fine Dining Translator" or a compelling variant that conveys the app's purpose.
- **FR-007**: The OG description MUST clearly communicate the app's value proposition (transforming simple dishes into pretentious menu descriptions).

### Key Entities

- **OG Metadata**: Title, description, image URL, site URL, and content type that social platforms parse from the page head.
- **OG Image**: A dynamically generated 1200x630 pixel branded image served via a dedicated image route.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: When the app URL is validated using Facebook's Sharing Debugger, all required OG tags are present and correctly parsed.
- **SC-002**: When the app URL is validated using Twitter's Card Validator, the large image card renders correctly with all metadata.
- **SC-003**: The OG image loads successfully and displays at the correct dimensions (1200x630 pixels) when accessed directly.
- **SC-004**: Social preview cards display consistently across Facebook, Twitter/X, and LinkedIn with branded imagery and clear messaging.

## Assumptions

- The app is deployed to a publicly accessible URL (required for social platforms to fetch OG metadata and images).
- The app's existing color scheme (cream background, charcoal text) and Playfair Display typography will be used for the OG image.
- Standard OG image dimensions (1200x630 pixels) will be used as they work well across most platforms.
- The OG image will be generated using Next.js's built-in `next/og` (ImageResponse API) for server-side rendering.
