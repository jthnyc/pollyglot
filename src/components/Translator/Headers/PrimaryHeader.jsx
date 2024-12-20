import './PrimaryHeader.css';

function PrimaryHeader({ headerText }) {
    return (
        <h3 className="language-select__title">{ headerText }</h3>
    )
}

export default PrimaryHeader;