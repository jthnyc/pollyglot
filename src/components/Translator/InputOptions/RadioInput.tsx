import './RadioInput.css';
import { flagImageMap } from "../../../assets";
import { Abbreviation } from '../../../constants';
import { isFlagAbbreviation } from '../../../utils/utils';

interface RadioInputProps<K extends string> {
    currSelect: K;
    cb: (value: K) => void;
    type: string;
    abbr: K;
    name: string;
    hasIcon: boolean;
}  

const RadioInput = <K extends string>({currSelect, cb, type, abbr, name, hasIcon}: RadioInputProps<K>) => {
    const flagImgSrc = isFlagAbbreviation(abbr as Abbreviation)
            ? flagImageMap[abbr as keyof typeof flagImageMap]
            : '';

    return (
        <label className={`${type}-select__label`} htmlFor={abbr}>
            <input
              type="radio"
              id={abbr}
              name={type}
              value={abbr}
              checked={abbr === currSelect}
              onChange={(e) => cb(e.target.value as K)} />
            {name}
            { hasIcon && <img className={`${type}-select__image`} src={flagImgSrc} alt={`${name} flag`} /> }
        </label>
    )
}

export default RadioInput;