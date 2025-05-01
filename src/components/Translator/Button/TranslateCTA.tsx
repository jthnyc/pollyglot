import './TranslateCTA.css';

interface TranslateCTAProps {
    buttonText: string,
    callback: any,
    disabled: boolean
}

const TranslateCTA: React.FC<TranslateCTAProps> = ({ buttonText, callback, disabled }) => {
    return (
        <button
          className={`translate-cta ${disabled ? 'translate-cta--disabled' : ''}`}
          disabled={disabled}
          onClick={callback}
          >
            { buttonText }
        </button>
    )
}

export default TranslateCTA;