# API Contracts: Option Tooltips

**Feature**: 006-option-tooltips

## Summary

This feature does not modify any API contracts. Tooltips are purely a frontend UI enhancement with static content.

## No Changes Required

- No new API endpoints
- No modifications to existing `/api/generate` endpoint
- No changes to request/response schemas

The tooltip content is hardcoded in `lib/types.ts` as static constants, following the same pattern as the existing `STYLE_LABELS` and `LENGTH_LABELS`.
