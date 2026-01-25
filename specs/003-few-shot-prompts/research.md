# Research: Few-Shot Prompt Examples

**Feature**: 003-few-shot-prompts
**Date**: 2026-01-26

## Research Questions

### 1. Few-Shot Prompting Best Practices

**Question**: What's the optimal structure for few-shot examples in this context?

**Decision**: Use Input/Output format with 3 examples demonstrating the pattern across different dish types.

**Rationale**:
- User provided excellent example format in their input (Option C)
- Input/Output format makes the transformation pattern explicit
- 2-3 examples is the sweet spot: enough to establish pattern, not so many as to bloat the prompt
- Examples should vary by dish type (sandwich, salad, protein) and style/length to show flexibility

**Alternatives Considered**:
- Single system prompt instruction (current approach) - insufficient for model to learn the joke
- 5+ examples - diminishing returns, increases latency and token cost
- Dynamic example selection based on dish type - over-engineering for this use case

### 2. Example Selection Strategy

**Question**: Which specific examples should we include?

**Decision**: Use the 3 examples from user input, covering:
1. **Grilled cheese** (Bistro, Excessive) - sandwich category
2. **Tuna salad** (Café, Medium) - salad category
3. **Corned beef** (Tasting Menu Unhinged, Excessive) - protein category

**Rationale**:
- User explicitly provided these as the target "gold standard"
- They demonstrate the core joke pattern: pretentious buildup → mundane reveal
- They cover different styles and lengths, showing how parameters affect output
- Each uses vocabulary from the pretentious word bank (coaxed, heritage, etc.)

**Alternatives Considered**:
- Creating entirely new examples - unnecessary when user provided perfect ones
- More examples for each style - over-engineering, increases prompt size

### 3. Prompt Structure Integration

**Question**: Where in the prompt should examples appear?

**Decision**: Insert examples between the instructions and the user's dish transformation request.

**Structure**:
```
[System persona - existing]
[Style/Length instructions - existing]
[Toggle instructions - existing]
[NEW: Few-shot examples section]
[Transform this dish: "{dishName}" - existing]
```

**Rationale**:
- Examples should come after rules so the model understands the constraints first
- Examples should come immediately before the task so the pattern is fresh
- This mirrors standard few-shot prompting conventions

### 4. Token Budget Impact

**Question**: Will adding examples affect response latency?

**Decision**: Acceptable impact - estimated 300-400 additional tokens for 3 examples.

**Rationale**:
- Current prompt is ~200-300 tokens
- Adding 3 examples adds ~100-150 tokens each
- Total prompt stays under 1000 tokens, well within fast completion range
- GPT-4 class models handle this without noticeable latency increase
- Constitution requires <2 second response; this should still be achievable

**Monitoring**: Verify response time after implementation; if >2s, consider reducing to 2 examples.

## Key Findings

1. **User provided the solution**: The examples in Option C from user input are production-ready
2. **Minimal code changes**: Only `buildPrompt()` in `lib/prompts.ts` needs modification
3. **No new dependencies**: This is purely a prompt engineering change
4. **Risk is low**: Worst case is reverting to current prompt if examples don't improve output

## Implementation Approach

Add a `FEW_SHOT_EXAMPLES` constant array containing the 3 example objects, then modify `buildPrompt()` to format and include them in the prompt string.

```typescript
// Pseudocode structure
interface FewShotExample {
  dish: string;
  style: RestaurantStyle;
  length: DescriptionLength;
  output: string;
}

const FEW_SHOT_EXAMPLES: FewShotExample[] = [
  // 3 examples from user input
];

function buildFewShotSection(): string {
  // Format examples as Input/Output pairs
}
```
