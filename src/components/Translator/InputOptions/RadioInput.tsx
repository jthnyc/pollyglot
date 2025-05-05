import './RadioInput.css';
// import { flagImageMap } from "../../../assets";
// import { Abbreviation } from '../../../constants';
// import { isFlagAbbreviation } from '../../../utils/utils';

interface RadioInputProps {
    currSelect: string;
    cb: (value: string) => void;
    type: string;
    abbr: string;
    name: string;
    hasIcon?: boolean;
}  

const RadioInput = ({currSelect, cb, type, abbr, name, hasIcon}: RadioInputProps) => {
    // const flagImgSrc = isFlagAbbreviation(abbr as Abbreviation)
    //         ? flagImageMap[abbr as keyof typeof flagImageMap]
    //         : '';
 
    return (
        <label className={`${type}-select__label`} htmlFor={abbr}>
            <input
              type="radio"
              id={abbr}
              name={type}
              value={abbr}
              checked={abbr === currSelect}
              onChange={() => cb(name)} />
            { name }
            {/* { hasIcon && <img className={`${type}-select__image`} src={flagImgSrc} alt={`${name} flag`} /> } */}
        </label>
    )
}

export default RadioInput;