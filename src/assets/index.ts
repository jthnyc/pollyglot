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

// NEW FLAG IMPORTS
import krFlag from './kr.png';
import ptFlag from './pt.png';
import grFlag from './gr.png';
import huFlag from './hu.png';
import ruFlag from './ru.png';
import saFlag from './sa.png';
import inFlag from './in.png';
import quFlag from './quenya.png';
import valFlag from './val.png';

type FlagAbbreviation = 
  // Original
  | 'de' | 'es' | 'fr' | 'it' | 'jp' | 'kl' | 'sp' | 'ta' | 'tw'
  // New
  | 'kr' | 'pt' | 'gr' | 'hu' | 'ru' | 'sa' | 'in' | 'qu' | 'val';

const flagImageMap: Record<FlagAbbreviation, string> = {
    // Original flags
    de: deFlag,
    es: esFlag,
    fr: frFlag,
    it: itFlag,
    jp: jpFlag,
    kl: klFlag,
    sp: spFlag,
    ta: taFlag,
    tw: twFlag,
    
    // New flags
    kr: krFlag,
    pt: ptFlag,
    gr: grFlag,
    hu: huFlag,
    ru: ruFlag,
    sa: saFlag,
    in: inFlag,
    qu: quFlag,
    val: valFlag
}

export { parrot, worldMapImage, flagImageMap }