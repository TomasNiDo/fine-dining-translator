import { GenerateRequest, RestaurantStyle, DescriptionLength } from "./types";

// Few-shot example interface for teaching the AI the comedic pattern
interface FewShotExample {
  dish: string;
  style: RestaurantStyle;
  length: DescriptionLength;
  outputWithReveal: string;
  outputWithoutReveal: string;
}

// Few-shot examples with both reveal and no-reveal variants (sentence case)
const FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    dish: "grilled cheese",
    style: "bistro",
    length: "excessive",
    outputWithReveal:
      "Butter-lacquered rustic bread duo, melted dairy embrace, pan-coaxed to golden confidence, with the humble reveal: grilled cheese",
    outputWithoutReveal:
      "Butter-lacquered rustic bread duo, melted dairy embrace, pan-coaxed to golden confidence, finished with a whisper of sea salt",
  },
  {
    dish: "tuna salad",
    style: "cafe",
    length: "medium",
    outputWithReveal:
      "Oceanic protein folded with creamy brightness, herb-flecked and leisurely seasoned, served with the truth: tuna salad",
    outputWithoutReveal:
      "Oceanic protein folded with creamy brightness, herb-flecked and leisurely seasoned, resting on a bed of artisanal greens",
  },
  {
    dish: "corned beef",
    style: "tasting-menu",
    length: "excessive",
    outputWithReveal:
      "Pink-salt brined heritage protein, peppercorn-lifted and bay-leaf haunted, slow-submerged until it softens emotionally, then the reveal: corned beef",
    outputWithoutReveal:
      "Pink-salt brined heritage protein, peppercorn-lifted and bay-leaf haunted, slow-submerged until it softens emotionally, accompanied by root vegetable meditations",
  },
];

// Build the few-shot examples section for the prompt
function buildFewShotSection(includeReveal: boolean): string {
  const examples = FEW_SHOT_EXAMPLES.map((ex, i) => {
    const output = includeReveal ? ex.outputWithReveal : ex.outputWithoutReveal;
    return `Example ${i + 1}:
Input: dish = "${ex.dish}", style = "${ex.style}", length = "${ex.length}"
Output: "${output}"`;
  }).join("\n\n");

  const patternDescription = includeReveal
    ? "pretentious buildup → mundane reveal"
    : "pretentious description without revealing the dish name";

  return `
Learn from these examples of the comedic pattern (${patternDescription}):

${examples}

Now apply this pattern:`;
}

// Style descriptions that define the tone and vocabulary for each restaurant type
const STYLE_DESCRIPTIONS: Record<RestaurantStyle, string> = {
  cafe: "Casual but trying too hard. Use words like 'artisanal', 'locally-sourced', 'hand-crafted'. Mild pretension with a friendly neighborhood vibe.",
  gastropub:
    "Elevated comfort food vibes. Reference craft processes and unexpected ingredient origins. Think 'deconstructed', 'house-made', and 'farm-to-table'.",
  bistro:
    "French-inspired elegance. Sprinkle in French terms (sans translation). Slightly aloof, suggesting the dish is too sophisticated for most palates.",
  steakhouse:
    "Masculine, premium, bold. Emphasize quality, aging, and provenance. Words like 'prime', 'heritage', 'grass-fed', 'dry-aged'. Confident and indulgent.",
  michelin:
    "Technical precision meets poetry. Reference cooking techniques, seasonal ingredients, and terroir. The description should sound like it belongs in a tasting menu at a 3-star establishment.",
  "tasting-menu":
    "Maximum pretension. Philosophical musings about the dish's essence. Absurdly elaborate. Include references to the chef's 'journey' or 'vision'. Unhinged creativity that borders on parody.",
};

// Length instructions that control output verbosity
const LENGTH_INSTRUCTIONS: Record<DescriptionLength, string> = {
  short: "Write exactly 1 sentence. Be punchy but pretentious.",
  medium: "Write exactly 2 sentences. Balance wit with verbosity.",
  excessive:
    "Write 3-4 sentences. Really lean into the pretension. Add flowery adjectives.",
  "absolutely-unnecessary":
    "Write 4+ sentences. Go completely overboard. Include philosophical tangents about the nature of food, childhood memories, or the chef's artistic vision.",
};

// Toggle instruction builders
function getRevealInstruction(dishName: string): string {
  return `End with a parenthetical reveal like "(It's just ${dishName.toLowerCase()}.)" or "(Yes, it's ${dishName.toLowerCase()}.)".`;
}

function getChefEgoInstruction(): string {
  return "Include a chef attribution phrase like 'Chef's signature interpretation', 'Personally curated by Chef [invent a pretentious name]', or 'Our culinary artist's vision'.";
}

function getTechniquesInstruction(): string {
  return "Incorporate cooking technique terminology like 'sous vide', 'dehydrated', 'spherified', 'foam', 'gel', 'reduction', 'confit', 'emulsion', or 'torched'.";
}

// Build the complete prompt for the AI
export function buildPrompt(request: GenerateRequest): string {
  const { dishName, options } = request;
  const { style, length, addReveal, addChefEgo, addTechniques } = options;

  // Build toggle instructions section
  const toggleInstructions: string[] = [];
  if (addReveal) {
    toggleInstructions.push(getRevealInstruction(dishName));
  }
  if (addChefEgo) {
    toggleInstructions.push(getChefEgoInstruction());
  }
  if (addTechniques) {
    toggleInstructions.push(getTechniquesInstruction());
  }

  const toggleSection =
    toggleInstructions.length > 0
      ? `\n**IMPORTANT - Apply these additional requirements to your output:**\n${toggleInstructions.map((t) => `- ${t}`).join("\n")}\n`
      : "";

  return `You are a pretentious food critic writing menu descriptions for fine dining restaurants.
Your task is to transform a simple dish name into an absurdly over-the-top, humorously pretentious menu description.

Style: ${STYLE_DESCRIPTIONS[style]}

Length: ${LENGTH_INSTRUCTIONS[length]}

Important guidelines:
- Be genuinely creative and amusing. Each description should feel unique.
- Never be generic or repetitive.
- Don't mention the original dish name directly in the description (unless specifically required below).
- Make the reader smile or chuckle at the absurdity.
- Use sentence case: capitalize only the first letter of the description and proper nouns (like "French" or chef names). Do NOT use Title Case where every word is capitalized.
- Output ONLY the menu description text, nothing else.
${buildFewShotSection(addReveal)}
${toggleSection}
Transform this dish: "${dishName}"`;
}

// System prompt for the AI (sets the persona)
export const SYSTEM_PROMPT = `You are an absurdly pretentious food critic who believes every dish, no matter how simple, deserves purple prose and philosophical reflection. You take your job very seriously, perhaps too seriously. Your descriptions should be genuinely creative and amusing, making readers smile at the over-the-top pretension while still being cleverly written.`;
