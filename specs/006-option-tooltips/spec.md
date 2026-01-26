# Feature Specification: Option Tooltips

**Feature Branch**: `006-option-tooltips`
**Created**: 2026-01-26
**Status**: Draft
**Input**: User description: "Let's add a tooltip to each style options, verbosity, and the extra options as well so user's have ideas which one to choose."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Discover Style Option Meanings (Priority: P1)

A new user lands on the Fine Dining Translator and sees multiple restaurant style options (Cafe, Gastropub, Bistro, Steakhouse, Michelin, Tasting Menu) but isn't sure what tone or output each one produces. They hover over or tap on an option to see a brief description explaining what kind of menu language that style generates.

**Why this priority**: This is the primary use case—users need to understand what each style produces before making a selection. Without this context, users make blind choices and may be disappointed with results.

**Independent Test**: Can be fully tested by hovering/tapping each style option and verifying a tooltip appears with helpful description text.

**Acceptance Scenarios**:

1. **Given** the user is viewing the style selector, **When** they hover over a style option (desktop), **Then** a tooltip appears within 200ms showing a brief description of that style's output tone
2. **Given** the user is on a touch device, **When** they long-press or tap a style option, **Then** a tooltip appears showing the style description
3. **Given** a tooltip is visible, **When** the user moves away from the option, **Then** the tooltip disappears within 150ms

---

### User Story 2 - Understand Verbosity Levels (Priority: P2)

A user wants to control how long their generated description will be but isn't sure what "Excessive" or "Absolutely Unnecessary" actually means in practice. They hover over the verbosity options to see example lengths or explanations of each level.

**Why this priority**: Verbosity directly affects output length, which is a key user expectation. Understanding these options prevents confusion about why some outputs are very long or short.

**Independent Test**: Can be fully tested by hovering/tapping each verbosity option and verifying tooltips explain the relative length or example output.

**Acceptance Scenarios**:

1. **Given** the user is viewing the verbosity selector, **When** they hover over a length option, **Then** a tooltip appears explaining what that length means (e.g., "1-2 sentences" or "A full paragraph of culinary theater")
2. **Given** the user is comparing options, **When** they move between different verbosity options, **Then** each tooltip accurately reflects the relative length difference

---

### User Story 3 - Learn About Extra Options (Priority: P2)

A user sees toggle options like "Add the reveal at the end" or "Extra chef ego" but doesn't understand what effect these have on the output. They hover over or interact with these toggles to see explanations.

**Why this priority**: These toggles add comedic elements but their effect isn't obvious from the labels alone. Tooltips reduce trial-and-error experimentation.

**Independent Test**: Can be fully tested by hovering/tapping each toggle option and verifying tooltips explain the effect on output.

**Acceptance Scenarios**:

1. **Given** the user is viewing the extra options toggles, **When** they hover over "Add the reveal at the end", **Then** a tooltip explains this adds "(It's just [dish name])" at the end
2. **Given** the user hovers over "Extra chef ego", **When** the tooltip appears, **Then** it explains this adds self-congratulatory chef attribution phrases
3. **Given** the user hovers over the techniques toggle, **When** the tooltip appears, **Then** it explains this injects fancy cooking technique terminology

---

### Edge Cases

- What happens when user rapidly moves between options? Tooltips should not stack or flicker
- How does the tooltip behave when an option is at the screen edge? Tooltip should reposition to stay visible
- What happens on very small screens where tooltips may not fit? Tooltip should scale appropriately or use a modal/popover approach

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a tooltip when users hover over any style option (Cafe, Gastropub, Bistro, Steakhouse, Michelin, Tasting Menu)
- **FR-002**: System MUST display a tooltip when users hover over any verbosity option (Short, Medium, Excessive, Absolutely Unnecessary)
- **FR-003**: System MUST display a tooltip when users hover over any extra option toggle (Reveal, Chef Ego, Techniques)
- **FR-004**: Each tooltip MUST contain descriptive text unique to that specific option explaining its effect on the generated output
- **FR-005**: Tooltips MUST appear on hover (desktop) and on long-press or tap (touch devices)
- **FR-006**: Tooltips MUST disappear when the user moves away from the option or taps elsewhere
- **FR-007**: Tooltips MUST remain fully visible within the viewport (auto-repositioning if near screen edges)
- **FR-008**: Tooltips MUST not interfere with the ability to select/toggle the underlying option

### Tooltip Content

| Option Type | Option                  | Tooltip Text                                                                      |
|-------------|-------------------------|-----------------------------------------------------------------------------------|
| Style       | Cafe                    | "Casual and approachable—your avocado toast gets a trendy twist"                  |
| Style       | Gastropub               | "Elevated pub fare—hearty dishes with pretentious adjectives"                     |
| Style       | Bistro                  | "French-inspired charm—simple dishes sound très sophistiqué"                      |
| Style       | Steakhouse              | "Bold and masculine—everything sounds like it was aged and seared to perfection"  |
| Style       | Michelin                | "Peak pretension—your dish becomes an artistic meditation"                        |
| Style       | Tasting Menu            | "Maximum theater—expect 'journeys' and 'experiences'"                             |
| Verbosity   | Short                   | "1-2 concise sentences"                                                           |
| Verbosity   | Medium                  | "A modest paragraph of culinary description"                                      |
| Verbosity   | Excessive               | "Multiple sentences of increasingly unnecessary detail"                           |
| Verbosity   | Absolutely Unnecessary  | "A full theatrical monologue about your humble dish"                              |
| Toggle      | Reveal                  | "Ends with a dramatic reveal: '(It's just [dish name])'"                          |
| Toggle      | Chef Ego                | "Adds self-congratulatory phrases like 'Chef's signature interpretation'"         |
| Toggle      | Techniques              | "Sprinkles in fancy technique words like 'sous vide', 'deconstructed', 'foam'"    |

### Key Entities

- **TooltipContent**: Mapping of option identifiers to their descriptive tooltip text
- **TooltipPosition**: Calculated position ensuring viewport visibility (top, bottom, left, right of trigger element)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of style, verbosity, and toggle options display a tooltip on user interaction
- **SC-002**: Users can read and understand tooltip content within 3 seconds (text is concise and scannable)
- **SC-003**: Tooltip appearance does not delay option selection—users can still click/tap to select while tooltip is showing
- **SC-004**: Tooltips remain fully visible on all supported screen sizes (mobile, tablet, desktop)
- **SC-005**: Zero tooltip-related visual glitches (no flickering, stacking, or off-screen positioning)

## Assumptions

- Tooltip trigger behavior follows platform conventions: hover on desktop, long-press or contextual tap on mobile
- Tooltip styling will match the existing playful, pastel aesthetic of the application
- Tooltip content is static and does not change based on user selections or generated output
- Touch device support assumes standard mobile browsers (Safari iOS, Chrome Android)
