import { FlagAbbreviation, Abbreviation } from '../constants';

export function isFlagAbbreviation(abbr: Abbreviation): abbr is FlagAbbreviation {
  return ['de', 'es', 'fr', 'it', 'jp', 'kl', 'sp', 'ta', 'tw'].includes(abbr);
}

export function isToneType(type: string): type is 'tone' {
    return type === "tone";
}