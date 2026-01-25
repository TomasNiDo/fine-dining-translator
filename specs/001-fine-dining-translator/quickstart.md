# Quickstart: Fine Dining Translator

**Date**: 2026-01-26
**Feature**: [spec.md](./spec.md)

## Prerequisites

- Node.js 18.17+ (LTS recommended)
- npm, yarn, or pnpm

## Project Setup

### 1. Initialize Next.js Project

```bash
npx create-next-app@14 fine-dining-translator \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"
```

### 2. Install Additional Dependencies

```bash
npm install lucide-react
```

### 3. Configure Tailwind

Update `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFFDF5',
        charcoal: '#333333',
        mint: '#C1E1C1',
        blush: '#FFD1DC',
        butter: '#FDFD96',
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
```

### 4. Configure Fonts

Update `app/layout.tsx`:

```typescript
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata = {
  title: 'Fine Dining Translator',
  description: 'Turn your simple dish into a pretentious menu masterpiece.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-cream font-body text-charcoal min-h-screen">
        {children}
      </body>
    </html>
  );
}
```

### 5. Update Global Styles

Update `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

@layer components {
  .pill-button {
    @apply px-4 py-2 rounded-full border-2 border-charcoal
           transition-colors cursor-pointer
           hover:bg-butter/50 focus:outline-none focus:ring-2
           focus:ring-charcoal focus:ring-offset-2;
  }

  .pill-button-selected {
    @apply bg-mint border-charcoal;
  }

  .card {
    @apply bg-white rounded-2xl border-2 border-charcoal
           shadow-lg p-6;
  }

  .menu-card {
    @apply bg-white rounded-2xl border-3 border-charcoal
           shadow-xl p-8 font-heading;
  }
}

@layer utilities {
  .border-3 {
    border-width: 3px;
  }
}
```

## Directory Structure

Create the following directory structure:

```bash
mkdir -p components/ui lib/data __tests__/components __tests__/lib
```

Final structure:

```
fine-dining-translator/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── PillButton.tsx
│   │   └── Toggle.tsx
│   ├── Header.tsx
│   ├── DishInput.tsx
│   ├── StyleSelector.tsx
│   ├── LengthSelector.tsx
│   ├── ToggleGroup.tsx
│   ├── GenerateButton.tsx
│   └── MenuCard.tsx
├── lib/
│   ├── types.ts
│   ├── translator.ts
│   └── data/
│       └── templates.ts
├── __tests__/
│   ├── components/
│   └── lib/
├── tailwind.config.ts
├── next.config.js
└── package.json
```

## Development

```bash
# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start
```

## Key Implementation Files

### 1. Types (`lib/types.ts`)

Define all TypeScript types from the data model.

### 2. Translator Logic (`lib/translator.ts`)

Implement the mock translation function:

```typescript
export function generateTranslation(request: TranslationRequest): TranslationResult {
  // 1. Select random template for style
  // 2. Apply length modifier
  // 3. Apply toggles (reveal, chef ego, techniques)
  // 4. Return result
}
```

### 3. Templates (`lib/data/templates.ts`)

Create 3-5 template patterns per restaurant style.

### 4. Main Page (`app/page.tsx`)

Compose all components with React state management:

```typescript
'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
// ... other imports

export default function Home() {
  const [dishName, setDishName] = useState('');
  const [options, setOptions] = useState(defaultOptions);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    // Validate, generate, update state
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Header />
        <DishInput value={dishName} onChange={setDishName} />
        <StyleSelector value={options.style} onChange={...} />
        <LengthSelector value={options.length} onChange={...} />
        <ToggleGroup options={options} onChange={...} />
        <GenerateButton onClick={handleGenerate} isLoading={isGenerating} />
        {result && <MenuCard result={result} />}
      </div>
    </main>
  );
}
```

## Testing Setup

### Configure Jest

Create `jest.config.js`:

```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
```

Create `jest.setup.js`:

```javascript
import '@testing-library/jest-dom';
```

Add test script to `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

Install test dependencies:

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```

## Verification Checklist

After setup, verify:

- [ ] `npm run dev` starts without errors
- [ ] Page loads at `http://localhost:3000`
- [ ] Custom colors visible (cream background)
- [ ] Fonts load correctly (Playfair Display, Inter)
- [ ] `npm test` runs without configuration errors
