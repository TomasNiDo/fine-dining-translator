# Fine Dining Translator

Transform ordinary dish names into pretentious fine-dining menu descriptions.

Enter "grilled cheese" and get back something like *"Artisanal Heritage Cheddar, Thoughtfully Melted Between Hand-Selected Brioche, Kissed by Flame"*.

## Features

- **Multiple Restaurant Styles** - French haute cuisine, molecular gastronomy, farm-to-table, and more
- **Adjustable Length** - From concise to elaborate descriptions
- **Fun Modifiers**:
  - *Dramatic Reveal* - Adds theatrical presentation notes
  - *Chef's Ego* - Includes self-congratulatory flourishes
  - *Fancy Techniques* - Sprinkles in culinary jargon

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Gemini API

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## License

MIT
