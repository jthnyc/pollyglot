import './OptionsList.css';
import { PrimaryHeader, RadioInput } from '../index';
import { TranslationContextState } from '../../../context';

type OptionsListProps<K extends keyof TranslationContextState = keyof TranslationContextState> = {
    type: K;
    headerText: string;
    options: string[];
    selectedOption: string;
    hasIcon: boolean;
    callback: (key: K, value: string) => void;
  };

const OptionsList = ({ type, headerText, options, selectedOption, hasIcon, callback }: OptionsListProps) => {
    return (
        <div className={`${type}-select`}>
            <PrimaryHeader headerText={headerText} />
            <div className={`${type}-select__options-wrapper`}>
                <div className={`${type}-select__options `}>
                    { options.map((option: string) => {
                        return (
                            <RadioInput 
                                key={option}
                                currSelect={selectedOption}
                                cb={(value) => callback(type, value)}
                                type={type}
                                abbr={option}
                                name={option}
                                hasIcon={hasIcon}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default OptionsList;