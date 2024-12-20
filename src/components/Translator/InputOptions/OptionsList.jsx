import './OptionsList.css';
import PrimaryHeader from '../Headers/PrimaryHeader';
import RadioInput from './RadioInput';

function InputOptions() {
    const languageMap = {
        fr: "French",
        sp: "Spanish",
        jp: "Japanese",
        de: "German",
        it: "Italian",
        tw: "Chinese",
        ta: "Tagalog",
        kl: "Klingon",
        es: "Esperanto"
    }

    return (
        <div className="language-select">
            <PrimaryHeader headerText="Select Language" />
            <div className="language-select__options">
                { Object.entries(languageMap).map(([abbr, language]) => {
                    console.log(abbr, language)
                    return <RadioInput key={abbr} abbr={abbr} name={language} />
                })}
            </div>
        </div>
    )
}

export default InputOptions;