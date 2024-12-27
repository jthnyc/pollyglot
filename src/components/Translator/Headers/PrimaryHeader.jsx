import './PrimaryHeader.css';

function PrimaryHeader({ headerText, hasError }) {
    return (
        <h3 className={`language-select__title ${hasError ? 'error' : ''}`}>{ headerText }</h3>
    )
}

export default PrimaryHeader;