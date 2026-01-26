// Restaurant style options for translation tone
export type RestaurantStyle =
  | "cafe"
  | "gastropub"
  | "bistro"
  | "steakhouse"
  | "michelin"
  | "tasting-menu";

// Controls the verbosity of generated descriptions
export type DescriptionLength =
  | "short"
  | "medium"
  | "excessive"
  | "absolutely-unnecessary";

// Display labels for restaurant styles
export const STYLE_LABELS: Record<RestaurantStyle, string> = {
  cafe: "Cafe",
  gastropub: "Gastropub",
  bistro: "Bistro",
  steakhouse: "Steakhouse",
  michelin: "Michelin",
  "tasting-menu": "Tasting Menu",
};

// Display labels for description lengths
export const LENGTH_LABELS: Record<DescriptionLength, string> = {
  short: "Short",
  medium: "Medium",
  excessive: "Excessive",
  "absolutely-unnecessary": "Absolutely Unnecessary",
};

// Tooltip descriptions for restaurant styles
export const STYLE_TOOLTIPS: Record<RestaurantStyle, string> = {
  cafe: "Casual and approachable—your avocado toast gets a trendy twist",
  gastropub: "Elevated pub fare—hearty dishes with pretentious adjectives",
  bistro: "French-inspired charm—simple dishes sound très sophistiqué",
  steakhouse: "Bold and masculine—everything sounds like it was aged and seared to perfection",
  michelin: "Peak pretension—your dish becomes an artistic meditation",
  "tasting-menu": "Maximum theater—expect 'journeys' and 'experiences'",
};

// Tooltip descriptions for verbosity levels
export const LENGTH_TOOLTIPS: Record<DescriptionLength, string> = {
  short: "1-2 concise sentences",
  medium: "A modest paragraph of culinary description",
  excessive: "Multiple sentences of increasingly unnecessary detail",
  "absolutely-unnecessary": "A full theatrical monologue about your humble dish",
};

// Tooltip descriptions for toggle options
export const TOGGLE_TOOLTIPS = {
  reveal: "Ends with a sarcastic reveal like '...but let's be honest, it's just [dish]'",
  chefEgo: "Adds self-congratulatory phrases like 'Chef's signature interpretation'",
  techniques: "Sprinkles in fancy technique words like 'sous vide', 'deconstructed', 'foam'",
} as const;

// User-configurable options that affect translation output
export interface TranslatorOptions {
  style: RestaurantStyle;
  length: DescriptionLength;
  addReveal: boolean; // Appends "(It's [dish name])"
  addChefEgo: boolean; // Adds chef attribution phrases
  addTechniques: boolean; // Injects cooking technique words
}

// Default options
export const defaultOptions: TranslatorOptions = {
  style: "gastropub",
  length: "short",
  addReveal: false,
  addChefEgo: false,
  addTechniques: false,
};

// Input to the translation function
export interface TranslationRequest {
  dishName: string;
  options: TranslatorOptions;
}

// Output from the translation function
export interface TranslationResult {
  originalDish: string;
  description: string;
  style: RestaurantStyle;
  generatedAt: Date;
}

// Structure for mock translation templates
export interface TemplatePattern {
  base: string; // Main sentence template with {dish} placeholder
  extensions?: string[]; // Additional sentences for longer lengths
  techniques?: string[]; // Words to inject when toggle enabled
}

export interface TranslationTemplate {
  style: RestaurantStyle;
  patterns: TemplatePattern[];
}

// API Request type (sent from client to /api/generate)
export interface GenerateRequest {
  dishName: string;
  options: TranslatorOptions;
}

// API Response types
export interface GenerateResponse {
  success: true;
  data: {
    originalDish: string;
    description: string;
    style: RestaurantStyle;
    generatedAt: string; // ISO 8601 timestamp
  };
}

export interface GenerateErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

// Client-side error state
export interface GenerationError {
  code: string;
  message: string;
}
