import './OptionsList.css';
import { PrimaryHeader, RadioInput } from '../index';


function OptionsList({ type, headerText, optionsObj, initChoice, hasIcon, callback }) {
    return (
        <div className={`${type}-select`}>
            <PrimaryHeader headerText={headerText} />
            <div className={`${type}-select__options`}>
                { Object.entries(optionsObj).map(([abbreviation, fullText]) => {
                    return <RadioInput key={abbreviation} currSelect={initChoice} cb={callback} type={type} abbr={abbreviation} name={fullText} hasIcon={hasIcon} />
                })}
            </div>
        </div>
    )
}

export default OptionsList;