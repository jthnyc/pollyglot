import { flagImageMap } from '../assets';
import { FlagAbbreviation, Abbreviation } from '../constants';

export function isFlagAbbreviation(abbr: Abbreviation): abbr is FlagAbbreviation {
  return abbr in flagImageMap;
}