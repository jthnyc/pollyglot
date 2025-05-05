import React from "react";

export type TranslationContext = {
  language: string;
  audience?: string;
  goal?: string;
  tone: string;
};

export const defaultContext: TranslationContext = {
  language: "Chinese",
  tone: "Friendly",
};

export const languageOptions = [
  "Chinese",
  "Spanish",
  "English",
  "French",
  "Arabic",
  "Tagalog",
  "Japanese",
  "German",
  "Korean",
  "Italian",
  "Constructed/Fictional"
]

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

