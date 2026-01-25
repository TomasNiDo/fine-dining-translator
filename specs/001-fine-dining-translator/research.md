# Research: Fine Dining Translator

**Date**: 2026-01-26
**Feature**: [spec.md](./spec.md)

## Research Tasks

### 1. Next.js 14 App Router Best Practices

**Decision**: Use Next.js 14 App Router with client components for interactive UI

**Rationale**:
- App Router is the recommended approach for new Next.js projects
- Single-page app with no data fetching = all components can be client-side
- `'use client'` directive at page level simplifies state management
- No need for Server Components since there's no backend data

**Alternatives Considered**:
- Pages Router: More mature but App Router is the future; no benefit for this use case
- Vite + React: Simpler setup but loses Next.js benefits like automatic code splitting and optimized fonts

**Implementation Notes**:
- Mark `app/page.tsx` with `'use client'` since entire page is interactive
- Use `next/font` for optimized font loading (Playfair Display, Inter)
- Static export possible (`output: 'export'`) for simple hosting

---

### 2. Tailwind CSS Custom Design System

**Decision**: Extend Tailwind config with custom color palette and typography

**Rationale**:
- Tailwind's `extend` allows adding custom colors without losing defaults
- CSS custom properties work well with Tailwind for dynamic theming
- Built-in responsive utilities match the mobile-first requirement

**Alternatives Considered**:
- CSS Modules: More isolation but loses Tailwind's utility-first benefits
- Styled Components: Runtime overhead not justified for this simple app
- Plain CSS: Harder to maintain responsive design

**Implementation Notes**:
```javascript
// tailwind.config.js colors
colors: {
  cream: '#FFFDF5',
  charcoal: '#333333',
  mint: '#C1E1C1',
  blush: '#FFD1DC',
  butter: '#FDFD96',
}
```
- Use `rounded-2xl` for card corners, `shadow-lg` for soft shadows
- Custom `border-2` or `border-3` class for hand-drawn feel

---

### 3. Mock Translation Logic Architecture

**Decision**: Template-based system with string interpolation and modifier functions

**Rationale**:
- Simple, predictable, and instantly testable
- No external dependencies or API calls
- Easy to expand with more templates later
- Humor quality depends on template writing, not algorithm complexity

**Alternatives Considered**:
- Random word combination: Less coherent, harder to ensure humor quality
- Markov chains: Overkill for MVP, unpredictable output
- Pre-written full responses: Limited variety, doesn't scale

**Implementation Notes**:
```typescript
// Structure
interface TranslationTemplate {
  style: RestaurantStyle;
  patterns: string[]; // e.g., "Artisanal {adjective} {noun} with {sauce}"
}

// Modifier functions
const addReveal = (text: string, dish: string) => `${text} (It's ${dish})`;
const addChefEgo = (text: string) => `${text} — curated by Chef ${randomChefName()}`;
const addTechnique = (text: string) => insertRandomTechnique(text);
```
- 3-5 templates per style minimum for variety
- Length determined by template selection + optional extension phrases

---

### 4. Accessible Toggle Switch Implementation

**Decision**: Custom toggle using native checkbox with ARIA attributes

**Rationale**:
- Native `<input type="checkbox">` provides built-in keyboard and screen reader support
- Visual styling via CSS `appearance: none` + custom pseudo-elements
- No JavaScript required for core toggle functionality

**Alternatives Considered**:
- Radix UI Switch: Good accessibility but adds dependency
- Button with aria-pressed: More complex state management
- Pure div with role="switch": Requires manual keyboard handling

**Implementation Notes**:
```tsx
<label className="flex items-center gap-3 cursor-pointer">
  <input
    type="checkbox"
    className="sr-only peer"
    checked={enabled}
    onChange={(e) => setEnabled(e.target.checked)}
  />
  <span className="w-12 h-6 rounded-full bg-gray-300 peer-checked:bg-mint transition-colors" />
  <span className="text-charcoal">Toggle label</span>
</label>
```
- Visible focus ring required (WCAG 2.4.7)
- Color change alone insufficient; add thumb position indicator

---

### 5. Pill Button Selection Pattern

**Decision**: Radio button group with visual pill styling

**Rationale**:
- Native radio buttons provide single-selection semantics
- Screen readers announce selection state automatically
- Keyboard arrow keys navigate between options

**Alternatives Considered**:
- Button group with state: Requires manual aria-pressed management
- Select dropdown: Less visual appeal, breaks the playful aesthetic
- Tabs: Semantically incorrect for configuration options

**Implementation Notes**:
```tsx
<fieldset>
  <legend className="sr-only">Restaurant Style</legend>
  <div className="flex gap-2 overflow-x-auto">
    {styles.map((style) => (
      <label key={style} className="...">
        <input
          type="radio"
          name="style"
          value={style}
          className="sr-only peer"
        />
        <span className="px-4 py-2 rounded-full border-2 peer-checked:bg-mint">
          {style}
        </span>
      </label>
    ))}
  </div>
</fieldset>
```
- Horizontal scroll container with `overflow-x-auto` for mobile
- Visual feedback on hover and focus states

---

### 6. Menu Card Decorative Styling

**Decision**: CSS-only decorative corners using pseudo-elements

**Rationale**:
- No additional images or SVG files needed
- Performant and scalable
- Matches "hand-drawn" aesthetic with CSS border-radius variations

**Alternatives Considered**:
- SVG corner images: More design control but adds assets
- CSS clip-path: Limited browser support for complex shapes
- Border-image: Less flexible for the desired effect

**Implementation Notes**:
```css
.menu-card {
  position: relative;
  border: 3px solid #333333;
  border-radius: 1rem;
  background: white;
}
.menu-card::before,
.menu-card::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 3px solid #333333;
}
/* Position corners with top/left/right/bottom */
```
- Serif font (Playfair Display) for menu text adds authenticity
- Optional: subtle background pattern using CSS gradients

---

### 7. Loading State UX

**Decision**: Button text swap with optional subtle animation

**Rationale**:
- "Consulting the Sommelier..." maintains playful tone
- No spinner needed for instant mock logic (<100ms)
- Disabled state prevents double-clicks

**Alternatives Considered**:
- Full-screen overlay: Too disruptive for instant operation
- Skeleton screen: Inappropriate since result appears instantly
- Progress bar: No meaningful progress to show

**Implementation Notes**:
```tsx
<button disabled={isLoading}>
  {isLoading ? 'Consulting the Sommelier...' : 'Generate Masterpiece'}
</button>
```
- Add `cursor-wait` during loading
- Simulate brief delay (300-500ms) for perceived "thinking" if needed
- `aria-busy="true"` on output region during generation

---

## Resolved Clarifications

*No NEEDS CLARIFICATION markers were present in the spec. All technical decisions derived from explicit requirements.*

## Dependencies Summary

| Package | Purpose | Justification |
|---------|---------|---------------|
| next | Framework | Specified in requirements |
| react, react-dom | UI library | Required by Next.js |
| tailwindcss | Styling | Specified in requirements |
| lucide-react | Icons | Specified in requirements |
| @next/font (built-in) | Font optimization | Performance requirement |

**Dev Dependencies**:
- typescript, @types/react, @types/node
- jest, @testing-library/react, @testing-library/jest-dom
- eslint, eslint-config-next
- postcss, autoprefixer (for Tailwind)
