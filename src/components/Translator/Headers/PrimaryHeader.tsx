import './PrimaryHeader.css';

interface PrimaryHeaderProps {
    headerText: string
}

const PrimaryHeader: React.FC<PrimaryHeaderProps> = ({ headerText }) => {
    return (
        <h3 className="language-select__title">{ headerText }</h3>
    )
}

export default PrimaryHeader;