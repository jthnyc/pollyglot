import './TextArea.css';

function TextArea({ isReadOnly, textContent, callback }) {
    return (
        <textarea 
          className="translation-input__textarea"
          readOnly={isReadOnly}
          value={textContent}
          onChange={(e) => callback(e.target.value)}
          >
          </textarea>
    )
}

export default TextArea;