# Feature Specification: Copy Feature & Sentence Case Formatting

**Feature Branch**: `004-copy-sentence-case`
**Created**: 2026-01-26
**Status**: Draft
**Input**: User description: "Let's add a copy feature so user can copy the generated fancy dish. Aside from that, let's make the generated text to sentence case instead of capitalizing almost each word"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Copy Generated Description (Priority: P1)

A user has generated a fancy menu description for their dish and wants to share it with friends, post it on social media, or use it elsewhere. They need a quick way to copy the generated text to their clipboard without manually selecting the text.

**Why this priority**: This is the primary requested feature. Users generate descriptions specifically to use them elsewhere, so copy functionality directly enables the core value proposition of sharing and using the generated content.

**Independent Test**: Can be fully tested by generating a dish description, clicking the copy button, and pasting into any text field. Delivers immediate value by enabling the sharing workflow.

**Acceptance Scenarios**:

1. **Given** a generated menu description is displayed, **When** the user clicks the copy button, **Then** the full description text is copied to their clipboard
2. **Given** the user has clicked the copy button, **When** the copy action completes successfully, **Then** visual feedback confirms the text was copied (e.g., button text changes to "Copied!" temporarily)
3. **Given** a generated menu description is displayed, **When** the user hovers over the copy button, **Then** the button shows appropriate hover state indicating it's interactive

---

### User Story 2 - Sentence Case Formatting (Priority: P2)

A user generates a fancy menu description and sees text that uses sentence case (first word capitalized, rest lowercase except proper nouns) rather than title case (each word capitalized). This makes the text read more naturally and feel more like authentic fine dining menu prose.

**Why this priority**: This is a formatting improvement that enhances the quality and authenticity of all generated content. It doesn't enable new functionality but improves the existing experience.

**Independent Test**: Can be fully tested by generating any dish description and verifying the output uses sentence case formatting. Delivers value by producing more natural, readable descriptions.

**Acceptance Scenarios**:

1. **Given** a user enters any dish name, **When** they generate a description, **Then** the resulting text uses sentence case (first letter capitalized, subsequent words lowercase unless grammatically required)
2. **Given** a dish with multiple sentences in the description, **When** generated, **Then** each sentence begins with a capital letter
3. **Given** the description contains proper nouns or terms that should be capitalized (e.g., "French", "Chef [Name]"), **When** generated, **Then** those terms remain appropriately capitalized

---

### Edge Cases

- What happens when clipboard access is denied by the browser? The system should show a user-friendly message explaining the copy failed.
- What happens if the user clicks copy multiple times rapidly? Each click should work independently without causing issues.
- What happens on browsers that don't support the Clipboard API? A graceful fallback or error message should be shown.
- How does sentence case handle acronyms or intentionally stylized terms? The AI should use contextual judgment for terms that need special capitalization.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a copy button within the result card when a generated description is visible
- **FR-002**: System MUST copy the full generated description text to the user's clipboard when the copy button is clicked
- **FR-003**: System MUST provide visual feedback (e.g., "Copied!" state) after successful copy action
- **FR-004**: Copy button MUST revert to its default state after a brief delay (approximately 2 seconds)
- **FR-005**: System MUST handle clipboard access failures gracefully with a user-friendly message
- **FR-006**: System MUST generate descriptions in sentence case format (first word capitalized, subsequent words lowercase except for proper nouns and sentence beginnings)
- **FR-007**: System MUST update few-shot examples to demonstrate sentence case formatting pattern
- **FR-008**: System MUST update prompt instructions to explicitly request sentence case output

### Key Entities

- **Generated Description**: The AI-generated menu description text; key attributes include the description content, associated dish name, and formatting style
- **Copy State**: Transient UI state tracking whether copy is in default, success, or error state

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can copy generated descriptions with a single click
- **SC-002**: 100% of generated descriptions display a visible, accessible copy button
- **SC-003**: Visual copy confirmation appears within 500ms of clicking the copy button
- **SC-004**: All newly generated descriptions use sentence case formatting instead of title case
- **SC-005**: Copy functionality works across all major browsers (Chrome, Firefox, Safari, Edge)

## Assumptions

- The browser supports the modern Clipboard API (navigator.clipboard.writeText); fallback behavior for unsupported browsers is handled gracefully with an error message
- Users understand the clipboard icon (📋) or "Copy" text as the standard copy action indicator
- Sentence case is defined as: capitalize only the first letter of the first word in each sentence, plus proper nouns and acronyms that conventionally use capitals
- The existing MenuCard component is the appropriate location for the copy button
