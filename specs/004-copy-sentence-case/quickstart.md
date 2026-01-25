# Quickstart: Copy Feature & Sentence Case Formatting

**Feature**: 004-copy-sentence-case
**Date**: 2026-01-26

## Prerequisites

- Node.js 18+ installed
- Repository cloned and dependencies installed (`npm install`)
- OpenAI API key configured in `.env.local`

## Development Setup

```bash
# 1. Ensure you're on the feature branch
git checkout 004-copy-sentence-case

# 2. Install dependencies (if not already done)
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
open http://localhost:3000
```

## Files to Modify

| File | Change Type | Purpose |
|------|-------------|---------|
| `components/MenuCard.tsx` | Add code | Copy button UI and state management |
| `lib/prompts.ts` | Modify | Update few-shot examples to sentence case |

## Testing the Feature

### Copy Button
1. Generate a dish description
2. Click the copy button (clipboard icon)
3. Verify "Copied!" feedback appears
4. Paste in another application to confirm

### Sentence Case
1. Generate several dish descriptions
2. Verify text starts with capital letter
3. Verify subsequent words are lowercase (except proper nouns)
4. Compare with old Title Case: "Butter-Lacquered" → "Butter-lacquered"

## Verification Commands

```bash
# Lint check
npm run lint

# Build check
npm run build
```

## Key Implementation Notes

### Copy Button Pattern
```tsx
const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(description);
    setCopyState('copied');
    setTimeout(() => setCopyState('idle'), 2000);
  } catch {
    setCopyState('error');
  }
};
```

### Sentence Case in Prompts
Update `FEW_SHOT_EXAMPLES` from:
> "Butter-Lacquered Rustic Bread Duo"

To:
> "Butter-lacquered rustic bread duo"

## Success Criteria Checklist

- [ ] Copy button visible on generated description card
- [ ] Click copies text to clipboard
- [ ] Visual feedback shows "Copied!" for ~2 seconds
- [ ] Error message appears if clipboard access denied
- [ ] New generations use sentence case
- [ ] Proper nouns remain capitalized (e.g., "French")
