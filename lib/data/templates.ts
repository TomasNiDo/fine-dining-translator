import { TranslationTemplate, RestaurantStyle } from "../types";

// Chef names for the "chef ego" toggle
export const CHEF_NAMES = [
  "Chef Marcus",
  "Chef Isabella",
  "Chef Pierre",
  "Chef Sophia",
  "Chef Antonio",
  "Chef Yuki",
];

// Technique words to inject
export const TECHNIQUE_WORDS = [
  "sous-vide",
  "flame-kissed",
  "hand-foraged",
  "heritage",
  "heirloom",
  "artisanal",
  "dry-aged",
  "small-batch",
  "single-origin",
  "cold-pressed",
  "slow-roasted",
  "wood-fired",
];

const cafeTemplate: TranslationTemplate = {
  style: "cafe",
  patterns: [
    {
      base: "Our cozy interpretation of {dish}, served with a side of good vibes.",
      extensions: [
        "Perfect for lazy Sunday afternoons.",
        "Pairs wonderfully with your favorite book.",
        "Made with love and a questionable amount of butter.",
      ],
      techniques: ["house-made", "locally-sourced", "freshly-baked"],
    },
    {
      base: "A humble {dish}, elevated by our grandmother's secret recipe.",
      extensions: [
        "We can't tell you what's in it, but trust us.",
        "Served in a vintage bowl we found at a flea market.",
        "The kind of comfort that hugs your soul.",
      ],
      techniques: ["scratch-made", "farm-fresh", "stone-ground"],
    },
    {
      base: "Simple, honest {dish} for the discerning casual diner.",
      extensions: [
        "No pretense here, just pure satisfaction.",
        "Your grandmother would approve, probably.",
        "Best enjoyed while pretending to work on your laptop.",
      ],
      techniques: ["hand-crafted", "organic", "free-range"],
    },
  ],
};

const gastropubTemplate: TranslationTemplate = {
  style: "gastropub",
  patterns: [
    {
      base: "Artisanal {dish}, lovingly crafted from ingredients you've never heard of.",
      extensions: [
        "Sourced from a farm with an unpronounceable name.",
        "The chef personally whispered encouragement to each ingredient.",
        "Pairs exquisitely with our selection of craft beverages.",
      ],
      techniques: ["house-cured", "dry-aged", "small-batch"],
    },
    {
      base: "Our reimagined {dish}, because classics deserve a hipster makeover.",
      extensions: [
        "Deconstructed for your viewing pleasure, reconstructed for your palate.",
        "We added truffle because we legally have to.",
        "Served on a reclaimed wood board, naturally.",
      ],
      techniques: ["barrel-aged", "smoke-kissed", "fermented"],
    },
    {
      base: "Elevated {dish} featuring locally-sourced everything.",
      extensions: [
        "The ingredients traveled fewer miles than your commute.",
        "Each bite is a journey through our farmer's hopes and dreams.",
        "Sustainably pretentious, responsibly delicious.",
      ],
      techniques: ["heritage", "heirloom", "pasture-raised"],
    },
    {
      base: "A deceptively simple {dish} that took three culinary degrees to perfect.",
      extensions: [
        "Years of training distilled into a single plate.",
        "The chef may have cried during development.",
        "Please don't ask about the foam.",
      ],
      techniques: ["hand-selected", "cold-fermented", "slow-cooked"],
    },
  ],
};

const bistroTemplate: TranslationTemplate = {
  style: "bistro",
  patterns: [
    {
      base: "Le {dish}, prepared in the grand tradition of Parisian insouciance.",
      extensions: [
        "Served with a knowing glance and a subtle shrug.",
        "The butter content shall remain classified.",
        "Bon appétit, or as we say, 'you're welcome.'",
      ],
      techniques: ["sautéed", "braised", "confit"],
    },
    {
      base: "A très magnifique {dish}, because French makes everything better.",
      extensions: [
        "We added an accent mark to the recipe for authenticity.",
        "The chef studied abroad for fifteen minutes.",
        "Pairs beautifully with pretending you're in Paris.",
      ],
      techniques: ["flambéed", "au jus", "à la mode"],
    },
    {
      base: "Our interpretation classique of {dish}, with appropriate Gallic flair.",
      extensions: [
        "Each bite whispers of cobblestone streets and existential philosophy.",
        "The wine reduction has a better social life than you.",
        "Très chic, très délicieux, très expensive.",
      ],
      techniques: ["au gratin", "en croûte", "beurre blanc"],
    },
  ],
};

const steakhouseTemplate: TranslationTemplate = {
  style: "steakhouse",
  patterns: [
    {
      base: "A commanding {dish}, for those who appreciate bold flavors and firm handshakes.",
      extensions: [
        "Aged to perfection, like a fine leather briefcase.",
        "The protein-to-plate ratio is legally questionable.",
        "Sides are for the weak, but we offer them anyway.",
      ],
      techniques: ["prime-cut", "charred", "bone-in"],
    },
    {
      base: "Premium {dish}, served with the confidence of a corner office.",
      extensions: [
        "This dish closes deals and takes names.",
        "Pairs excellently with power moves and red wine.",
        "Your cardiologist doesn't need to know.",
      ],
      techniques: ["dry-aged", "butter-basted", "seared"],
    },
    {
      base: "Substantial {dish} for substantial appetites and expense accounts.",
      extensions: [
        "Each bite builds character and increases cholesterol equally.",
        "The portions are as generous as your quarterly bonus.",
        "We believe in the three Cs: Carnivore, Confident, Comfortable prices.",
      ],
      techniques: ["hand-carved", "wet-aged", "marbled"],
    },
  ],
};

const michelinTemplate: TranslationTemplate = {
  style: "michelin",
  patterns: [
    {
      base: "A meditative exploration of {dish}, where every element serves a purpose.",
      extensions: [
        "The negative space on the plate is intentional, we promise.",
        "Please appreciate silently for thirty seconds before consuming.",
        "This dish has its own Instagram following.",
      ],
      techniques: ["precision-cooked", "micro-plated", "gel-infused"],
    },
    {
      base: "Our signature {dish}, representing the culmination of decades of refinement.",
      extensions: [
        "Each component has been individually contemplated.",
        "The garnish alone took a team of three.",
        "You may photograph it, with prior approval.",
      ],
      techniques: ["molecularly-enhanced", "spherified", "crystallized"],
    },
    {
      base: "An artistic interpretation of {dish}, challenging your preconceptions.",
      extensions: [
        "What you think is the main course might be the garnish.",
        "The experience begins before you even see the plate.",
        "The chef would prefer you didn't add salt.",
      ],
      techniques: ["essence-extracted", "nitrogen-finished", "air-dried"],
    },
    {
      base: "Ethereal {dish}, where technique transcends mere sustenance.",
      extensions: [
        "This is not food. This is an experience. This is art.",
        "The ingredients were selected during a full moon.",
        "You'll understand it better on the third bite.",
      ],
      techniques: ["vapor-infused", "cryo-seared", "enzyme-treated"],
    },
  ],
};

const tastingMenuTemplate: TranslationTemplate = {
  style: "tasting-menu",
  patterns: [
    {
      base: "Course 7 of 47: A provocative deconstruction of {dish} as you've never imagined.",
      extensions: [
        "The chef channeled their childhood trauma into this edible sculpture.",
        "Please note: the portion size is a philosophical statement.",
        "Yes, that IS a single pea. It's a very important pea.",
        "This course represents the death of your dinner reservations at reasonable hours.",
      ],
      techniques: ["conceptually-reimagined", "emotionally-infused", "spiritually-awakened"],
    },
    {
      base: "Behold: {dish}, but make it a fever dream narrated by a pretentious art student.",
      extensions: [
        "The smoke is mandatory. The understanding is optional.",
        "This represents the duality of hunger and satisfaction.",
        "We've removed the parts you recognize for your journey.",
        "The chef apologizes for nothing and explains even less.",
      ],
      techniques: ["chaos-fermented", "anxiety-cured", "existentially-smoked"],
    },
    {
      base: "A transcendent {dish} experience spanning seventeen textures and four emotional states.",
      extensions: [
        "One texture is technically invisible but spiritually present.",
        "The foam remembers things the chef has forgotten.",
        "Please don't ask what the gel is made of. Embrace mystery.",
        "This course pairs with a sense of wonder and a large bill.",
      ],
      techniques: ["multi-dimensionally-prepared", "temporally-aged", "cosmically-seasoned"],
    },
    {
      base: "Our legendary {dish}: an edible poem that rhymes with your credit card statement.",
      extensions: [
        "This dish has been featured in dreams and nightmares alike.",
        "The ingredients were personally judged by the chef and found worthy.",
        "Eating this unlocks a memory you didn't know you had.",
        "The chef recommends experiencing it with your eyes closed and wallet open.",
      ],
      techniques: ["hyper-local", "ultra-refined", "impossibly-sourced"],
    },
  ],
};

// Export all templates as a map for easy lookup
export const templates: Record<RestaurantStyle, TranslationTemplate> = {
  cafe: cafeTemplate,
  gastropub: gastropubTemplate,
  bistro: bistroTemplate,
  steakhouse: steakhouseTemplate,
  michelin: michelinTemplate,
  "tasting-menu": tastingMenuTemplate,
};
