import {
  TranslationRequest,
  TranslationResult,
  DescriptionLength,
  TemplatePattern,
} from "./types";
import { templates, CHEF_NAMES, TECHNIQUE_WORDS } from "./data/templates";

// Get a random element from an array
function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Determine how many extension sentences to add based on length
function getExtensionCount(length: DescriptionLength): number {
  switch (length) {
    case "short":
      return 0;
    case "medium":
      return 1;
    case "excessive":
      return 2;
    case "absolutely-unnecessary":
      return 3;
  }
}

// Inject technique words into a sentence
function injectTechnique(
  text: string,
  patternTechniques: string[] | undefined
): string {
  const techniques = patternTechniques || TECHNIQUE_WORDS;
  const technique = randomElement(techniques);

  // Find common food-related words and prepend the technique
  const foodWords = [
    "ingredients",
    "dish",
    "flavors",
    "elements",
    "components",
  ];
  for (const word of foodWords) {
    if (text.toLowerCase().includes(word)) {
      return text.replace(new RegExp(word, "i"), `${technique} ${word}`);
    }
  }

  // If no common word found, add at the beginning of the sentence
  return `Using ${technique} methods, ${text.charAt(0).toLowerCase()}${text.slice(1)}`;
}

// Add chef ego attribution
function addChefAttribution(text: string): string {
  const chefName = randomElement(CHEF_NAMES);
  const attributions = [
    `— A ${chefName} creation`,
    `Personally curated by ${chefName}.`,
    `${chefName}'s signature interpretation.`,
    `Envisioned and executed by ${chefName}.`,
  ];
  return `${text} ${randomElement(attributions)}`;
}

// Add the reveal at the end
function addReveal(text: string, dishName: string): string {
  return `${text} (It's ${dishName}.)`;
}

// Main translation function
export function generateTranslation(
  request: TranslationRequest
): TranslationResult {
  const { dishName, options } = request;
  const { style, length, addReveal: shouldAddReveal, addChefEgo, addTechniques } = options;

  // Get templates for the selected style
  const styleTemplate = templates[style];
  const pattern: TemplatePattern = randomElement(styleTemplate.patterns);

  // Build the base description with dish name interpolation
  let description = pattern.base.replace(/{dish}/gi, dishName);

  // Add technique words if toggle is enabled
  if (addTechniques) {
    description = injectTechnique(description, pattern.techniques);
  }

  // Add extension sentences based on length
  const extensionCount = getExtensionCount(length);
  if (pattern.extensions && extensionCount > 0) {
    const availableExtensions = [...pattern.extensions];
    const selectedExtensions: string[] = [];

    for (let i = 0; i < extensionCount && availableExtensions.length > 0; i++) {
      const index = Math.floor(Math.random() * availableExtensions.length);
      selectedExtensions.push(availableExtensions[index]);
      availableExtensions.splice(index, 1);
    }

    if (selectedExtensions.length > 0) {
      description = `${description} ${selectedExtensions.join(" ")}`;
    }
  }

  // Add chef ego if toggle is enabled
  if (addChefEgo) {
    description = addChefAttribution(description);
  }

  // Add the reveal if toggle is enabled (always at the very end)
  if (shouldAddReveal) {
    description = addReveal(description, dishName);
  }

  return {
    originalDish: dishName,
    description,
    style,
    generatedAt: new Date(),
  };
}
