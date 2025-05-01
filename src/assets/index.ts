import deFlag from './de.png';
import esFlag from './esperanto.png';
import frFlag from './fr.png';
import itFlag from './it.png';
import jpFlag from './jp.png';
import klFlag from './klingon.png';
import parrot from './parrot.png';
import spFlag from './sp.png';
import taFlag from './tagalog.png';
import twFlag from './tw.png';
import worldMapImage from './World_Map_1.png';

type FlagAbbreviation = 'de' | 'es' | 'fr' | 'it' | 'jp' | 'kl' | 'sp' | 'ta' | 'tw';

const flagImageMap: Record<FlagAbbreviation, string> = {
    de: deFlag,
    es: esFlag,
    fr: frFlag,
    it: itFlag,
    jp: jpFlag,
    kl: klFlag,
    sp: spFlag,
    ta: taFlag,
    tw: twFlag
}

export { parrot, worldMapImage, flagImageMap }