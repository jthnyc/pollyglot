import './RadioInput.css';
import { flagImageMap } from "../../../assets";

function RadioInput({currSelect, cb, type, abbr, name, hasIcon}) {
    const flagImgSrc = flagImageMap[abbr];

    return (
        <label className={`${type}-select__label`} htmlFor={abbr}>
            <input
              type="radio"
              id={abbr}
              name={type}
              value={name}
              checked={name === currSelect}
              onChange={(e) => cb(e.target.value)} />
            {name}
            { hasIcon && <img className={`${type}-select__image`} src={flagImgSrc} alt={`${name} flag`} /> }
        </label>
    )
}

export default RadioInput;