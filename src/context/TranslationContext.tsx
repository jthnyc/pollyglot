import React from "react";

export type TranslationContext = {
  location: string;
  audience: string;
  goal?: string;
  tone: string;
};

export const defaultContext: TranslationContext = {
  location: "No Preference",
  audience: "Stranger",
  tone: "Friendly",
};

// Dropdown option lists
export const locationOptions = [
  "No Preference",
  "Japan",
  "France",
  "Germany",
  "Italy",
  "Spain",
  "Mexico",
  "Philippines",
  "Taiwan",
  "Korea",
  "United States",
];

export const audienceOptions = [
  "Stranger",
  "Friend",
  "Shop owner",
  "Waiter / Server",
  "Authority figure",
  "Elder",
  "Coworker / Peer",
  "Tour guide",
  "Police / Security",
  "Child",
];

export const goalOptions = [
  "Ask for price",
  "Ask for help",
  "Make apology",
  "Express gratitude",
  "Order food or drink",
  "Negotiate or bargain",
  "Ask directions",
  "Give directions",
  "Start small talk",
  "Give compliment",
];

export const toneOptions = [
  "Formal",
  "Friendly",
  "Slang"
]

