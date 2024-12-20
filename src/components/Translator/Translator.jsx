import TranslateCTA from './Button/TranslateCTA';
import OptionsList from './InputOptions/OptionsList';
import './Translator.css';

function Translator() {
    return (
        <div className="content">
            <div className="translator">
                <div className="translation-input">
                    <h3 className="translation-input__title">How do you say...</h3>
                    <h3 className="translation-input__title-secondary hidden">Original text</h3>
                    <h3 className="translation-input__title hidden error">Please enter text below</h3>
                    <textarea className="translation-input__textarea"></textarea>
                </div>
                <div className="tone-select">
                    <h3 className="tone-select__title">Tone</h3>
                    <div className="tone-select__options">
                        <div className="tone-select__option">
                            <input type="radio" id="formal" name="tone" value="formal" checked />
                            <label className="tone-select__label" htmlFor="formal">Formal</label>
                        </div>
                        <div className="tone-select__option">
                            <input type="radio" id="colloquial" name="tone" value="colloquial" />
                            <label className="tone-select__label" htmlFor="colloquial">Colloquial</label>
                        </div>
                    </div>
                </div>
                <OptionsList />
                <div className="translation hidden">
                    <h3 className="translation__title"></h3>
                    <textarea className="translation__textarea" readOnly></textarea>
                    <audio className="translation__audio" controls type="audio/mpeg"></audio>
                </div>
                <TranslateCTA />
            </div>
        </div>
    )
}

export default Translator;