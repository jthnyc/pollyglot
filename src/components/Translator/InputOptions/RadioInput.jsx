import './RadioInput.css';
import { flagImageMap } from "../../../assets";

function RadioInput({abbr, name}) {
    const flagImgSrc = flagImageMap[abbr];

    return (
        <div className="language-select__option">
            <input type="radio" id={abbr} name="language" value={name} />
            <label className="language-select__label" htmlFor={abbr}>{name}</label>
            <img className="language-select__image" src={flagImgSrc} alt={`${name} flag`} />
        </div>
    )
}

export default RadioInput;