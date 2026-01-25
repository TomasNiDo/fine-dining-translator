# Quickstart: Few-Shot Prompt Examples

**Feature**: 003-few-shot-prompts
**Date**: 2026-01-26

## Overview

This feature modifies the AI prompt in `lib/prompts.ts` to include few-shot examples that teach the model the comedic pattern.

## Prerequisites

- Node.js 18+
- OpenAI API key configured in environment
- Existing development environment set up

## Files to Modify

| File | Change Type | Description |
|------|-------------|-------------|
| `lib/prompts.ts` | Modify | Add FewShotExample type, examples array, and update buildPrompt() |

## Implementation Steps

### Step 1: Add FewShotExample Interface

Add the interface near the top of `lib/prompts.ts`:

```typescript
interface FewShotExample {
  dish: string;
  style: RestaurantStyle;
  length: DescriptionLength;
  output: string;
}
```

### Step 2: Add Examples Constant

Add the hardcoded examples array:

```typescript
const FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    dish: "grilled cheese",
    style: "bistro",
    length: "excessive",
    output: "Butter-Lacquered Rustic Bread Duo, Melted Dairy Embrace, Pan-Coaxed to Golden Confidence, With the Humble Reveal: grilled cheese"
  },
  {
    dish: "tuna salad",
    style: "cafe",
    length: "medium",
    output: "Oceanic Protein Folded with Creamy Brightness, Herb-Flecked and Leisurely Seasoned, Served with the Truth: tuna salad"
  },
  {
    dish: "corned beef",
    style: "tasting-menu",
    length: "excessive",
    output: "Pink-Salt Brined Heritage Protein, Peppercorn-Lifted and Bay-Leaf Haunted, Slow-Submerged Until It Softens Emotionally, Then the Reveal: corned beef"
  }
];
```

### Step 3: Add Helper Function

Create a function to format examples:

```typescript
function buildFewShotSection(): string {
  const examples = FEW_SHOT_EXAMPLES.map((ex, i) =>
    `Example ${i + 1}:
Input: dish = "${ex.dish}", style = "${ex.style}", length = "${ex.length}"
Output: "${ex.output}"`
  ).join("\n\n");

  return `\nLearn from these examples:\n\n${examples}\n`;
}
```

### Step 4: Update buildPrompt()

Insert the few-shot section into the prompt string, between toggle instructions and the final dish transformation.

## Testing

1. Start dev server: `npm run dev`
2. Test cases to verify:
   - **Corned beef** (Tasting Menu, Excessive): Should avoid "corned" and "beef" until reveal
   - **Grilled cheese** (Bistro, Excessive): Should use pretentious vocabulary, reveal at end
   - **Hot dog** (Café, Medium): Should follow the pattern even for dishes not in examples

## Success Verification

- [ ] Generated descriptions withhold dish name words until reveal
- [ ] Output includes pretentious vocabulary (heritage, coaxed, etc.)
- [ ] Response time remains under 2 seconds
- [ ] Humor pattern is consistent across multiple generations

## Rollback

If issues arise, revert `lib/prompts.ts` to the previous version. No other files are affected.
