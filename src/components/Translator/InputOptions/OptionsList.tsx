import './OptionsList.css';
import { PrimaryHeader } from '../index';
import { FlagAbbreviation } from '../../../constants';
import { flagImageMap } from '../../../assets';

type OptionsListProps<K extends string> = {
    type: 'tone' | 'language';
    headerText: string;
    optionsObj: Record<K, string>;
    initChoice: K;
    hasIcon: boolean;
    callback: (value: K) => void;
}

// Define fantasy languages
const FANTASY_LANGUAGES: string[] = ['kl', 'qu', 'es', 'val'];

const OptionsList = <K extends string>({ 
    type, 
    headerText, 
    optionsObj, 
    initChoice, 
    hasIcon, 
    callback 
}: OptionsListProps<K>) => {
    
    // Split languages into real and fantasy
    const allOptions = Object.entries(optionsObj) as [K, string][];
    
    const realOptions = type === 'language' 
        ? allOptions.filter(([abbr]) => !FANTASY_LANGUAGES.includes(abbr as string))
        : allOptions;
    
    const fantasyOptions = type === 'language'
        ? allOptions.filter(([abbr]) => FANTASY_LANGUAGES.includes(abbr as string))
        : [];
    
    const renderOption = ([abbr, name]: [K, string], isFantasy: boolean = false) => {
        const isSelected = abbr === initChoice;
        const flagSrc = hasIcon && type === 'language' 
            ? flagImageMap[abbr as unknown as FlagAbbreviation]
            : null;
        
        return (
            <div
                key={abbr}
                className={`picker-option ${isSelected ? 'selected' : ''} ${isFantasy ? 'fantasy' : ''}`}
                onClick={() => callback(abbr)}
            >
                <span className="picker-option__text">{name}</span>
                {flagSrc && (
                    <img 
                        src={flagSrc} 
                        alt={`${name} flag`} 
                        className="picker-option__flag"
                    />
                )}
            </div>
        );
    };
    
    return (
        <div className={`${type}-select picker-container`}>
            <PrimaryHeader headerText={headerText} />
            <div className={`${type}-select__options-wrapper picker-scroll-container`}>
                <div className={`${type}-select__options picker-list`}>
                    {/* Real languages/tones */}
                    {realOptions.map(option => renderOption(option, false))}
                    
                    {/* Fantasy divider and options */}
                    {fantasyOptions.length > 0 && (
                        <>
                            <div className="fantasy-divider">
                                <div className="fantasy-divider__ornament">✦</div>
                                <div className="fantasy-divider__content">
                                    <div className="fantasy-divider__glow"></div>
                                    <span className="fantasy-divider__text">
                                        ～･ﾟ✧ Of Myths and Legends ✧ﾟ･～
                                    </span>
                                </div>
                                <div className="fantasy-divider__ornament">✦</div>
                            </div>
                            {fantasyOptions.map(option => renderOption(option, true))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OptionsList;