import './OptionsList.css';
import { PrimaryHeader, RadioInput } from '../index';

type OptionsListProps<K extends string> = {
    type: string;
    headerText: string;
    options: string[];
    selectedDialect: K;
    hasIcon: boolean;
    callback: (value: string) => void;
}

const OptionsList = <K extends string>({ type, headerText, options, selectedDialect, hasIcon, callback }: OptionsListProps<K>) => {
    console.log("currSelect: ", selectedDialect)
    return (
        <div className={`${type}-select`}>
            <PrimaryHeader headerText={headerText} />
            <div className={`${type}-select__options-wrapper`}>
                <div className={`${type}-select__options `}>
                    { options.map((option) => {
                        
                        return (
                            <RadioInput 
                                key={option}
                                currSelect={selectedDialect}
                                cb={callback}
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