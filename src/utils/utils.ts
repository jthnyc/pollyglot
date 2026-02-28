import { FlagAbbreviation, Abbreviation } from '../constants';

export function isFlagAbbreviation(abbr: Abbreviation): abbr is FlagAbbreviation {
  return [
    // Original flags
    'de', 'es', 'fr', 'it', 'jp', 'kl', 'sp', 'ta', 'tw',
    // New flags
    'kr', 'pt', 'gr', 'hu', 'ru', 'sa', 'in', 'qu', 'val'
  ].includes(abbr);
}

export function isToneType(type: string): type is 'tone' {
    return type === "tone";
}