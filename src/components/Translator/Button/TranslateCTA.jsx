import './TranslateCTA.css';

function TranslateCTA({ buttonText, callback, disabled }) {
    return (
        <button
          className={`translate-cta ${disabled ? 'translate-cta--disabled' : ''}`}
          onClick={callback}
          >
            { buttonText }
        </button>
    )
}

export default TranslateCTA;