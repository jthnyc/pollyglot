import './OptionsList.css';
import { PrimaryHeader, RadioInput } from '../index';

type OptionsListProps<K extends string> = {
    type: 'tone' | 'language' | 'context';
    headerText: string;
    optionsObj: Record<K, string>;
    initChoice: K;
    hasIcon: boolean;
    callback: (value: K) => void;
}

const OptionsList = <K extends string>({ type, headerText, optionsObj, initChoice, hasIcon, callback }: OptionsListProps<K>) => {
    return (
        <div className={`${type}-select`}>
            <PrimaryHeader headerText={headerText} />
            <div className={`${type}-select__options-wrapper`}>
                <div className={`${type}-select__options `}>
                    { (Object.keys(optionsObj) as K[]).map((abbreviation) => {
                        const fullText = optionsObj[abbreviation];
                        return (
                        <RadioInput
                            key={abbreviation}
                            currSelect={initChoice}
                            cb={callback}
                            type={type}
                            abbr={abbreviation}
                            name={fullText}
                            hasIcon={hasIcon}
                        />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default OptionsList;