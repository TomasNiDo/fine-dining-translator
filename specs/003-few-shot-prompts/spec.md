# Feature Specification: Few-Shot Prompt Examples

**Feature Branch**: `003-few-shot-prompts`
**Created**: 2026-01-26
**Status**: Draft
**Input**: User description: "Improve dish generation so it understands the joke using few-shot examples"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Generate Pretentious Description with Comedic Reveal (Priority: P1)

A user enters an ordinary dish name (like "corned beef" or "grilled cheese") and receives a humorously pretentious menu description that builds elaborate culinary prose before delivering a comedic reveal of what the dish actually is.

**Why this priority**: This is the core value proposition - the AI currently doesn't consistently understand the joke pattern (elaborate pretension → mundane reveal). Few-shot examples will teach it the comedic structure.

**Independent Test**: Enter "corned beef" with style "Tasting Menu (Unhinged)" and length "Excessive". The output should avoid the words "corned" and "beef" until the final reveal, use pretentious language throughout, and end with a comedic reveal like "Then the Reveal: corned beef".

**Acceptance Scenarios**:

1. **Given** user enters "grilled cheese" with Bistro style and Excessive length, **When** generation completes, **Then** the description uses pretentious terms like "butter-lacquered", "pan-coaxed", or similar without mentioning "grilled" or "cheese" until the reveal
2. **Given** user enters "tuna salad" with Café style and Medium length, **When** generation completes, **Then** the description describes the ingredients abstractly ("oceanic protein", "creamy brightness") with the reveal at the end
3. **Given** user enters any ordinary dish with Reveal toggle ON, **When** generation completes, **Then** the description withholds the literal dish name until the final phrase

---

### User Story 2 - Consistent Humor Tone Across Styles (Priority: P2)

Users selecting different restaurant styles receive descriptions that match both the style's tone AND the core comedic pattern (pretension building to mundane reveal).

**Why this priority**: Style variety is already supported, but the few-shot examples need to demonstrate the joke works across different tones (casual café vs unhinged tasting menu).

**Independent Test**: Generate descriptions for "hot dog" across Café, Bistro, and Tasting Menu styles - all should follow the same joke structure but with appropriate vocabulary and intensity for each style.

**Acceptance Scenarios**:

1. **Given** user selects "Café" style, **When** generation completes, **Then** the description uses casual-but-trying-too-hard vocabulary while maintaining the pretension-to-reveal structure
2. **Given** user selects "Tasting Menu (Unhinged)" style, **When** generation completes, **Then** the description reaches maximum absurdity with philosophical musings before the reveal

---

### User Story 3 - Length-Appropriate Few-Shot Guidance (Priority: P3)

The AI produces descriptions that match the requested length while maintaining the comedic structure - shorter lengths get punchier builds to the reveal, longer lengths get more elaborate pretension.

**Why this priority**: Length control already exists but few-shot examples should demonstrate how the joke works at different lengths.

**Independent Test**: Generate "PB&J" at Short vs Excessive length - both should have the reveal, but Excessive should have dramatically more pretentious buildup.

**Acceptance Scenarios**:

1. **Given** user selects "Short" length, **When** generation completes, **Then** the description is 1-2 sentences with a quick pretentious setup and immediate reveal
2. **Given** user selects "Excessive" length, **When** generation completes, **Then** the description is 3-4 sentences with elaborate pretension before the reveal

---

### Edge Cases

- What happens when the dish name itself sounds pretentious (e.g., "foie gras")? The AI should still add additional pretension and maintain the reveal structure.
- What happens when Reveal toggle is OFF? The description should still be pretentious but can reference the dish more directly throughout.
- What happens with very short dish names (e.g., "eggs")? Few-shot examples should guide appropriate treatment.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST include 2-3 few-shot examples in the prompt that demonstrate the comedic pattern
- **FR-002**: Few-shot examples MUST show the structure: elaborate pretentious description → plain reveal of actual dish
- **FR-003**: Examples MUST avoid using the literal dish name words until the final reveal phrase
- **FR-004**: Examples MUST demonstrate variety across different dish types (sandwich, salad, protein)
- **FR-005**: System MUST include at least two pretentious vocabulary words from the established word bank in each example (e.g., "heritage", "house", "slow", "coaxed", "aromatic", "reduction", "finished", "rested")
- **FR-006**: The prompt structure MUST present examples in Input/Output format so the AI learns the transformation pattern
- **FR-007**: Examples MUST vary by style and length to demonstrate how those parameters affect output

### Key Entities

- **Few-Shot Example**: A complete input-output pair showing dish name, style, length as input and the expected pretentious description as output
- **Pretentious Word Bank**: Collection of vocabulary terms that signal fine-dining pretension (used to guide AI and validate examples)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Generated descriptions withhold literal dish name words until the reveal phrase in 90%+ of outputs when Reveal is ON
- **SC-002**: Users rate the humor as "understood the joke" (versus "just generic fancy words") in subjective testing
- **SC-003**: Output consistently includes at least two pretentious vocabulary markers from the word bank
- **SC-004**: Description structure matches the few-shot pattern: buildup → reveal (when applicable)

## Assumptions

- The OpenAI API (or similar LLM) will respond well to few-shot prompting and learn the pattern from 2-3 examples
- The current prompt structure in `lib/prompts.ts` can be extended to include examples without major refactoring
- Few-shot examples can be hardcoded as they represent the "gold standard" for the joke format
- The existing style and length parameters will continue to work alongside the new examples
