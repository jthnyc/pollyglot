import './TextArea.css';

interface TextAreaProps {
    isReadOnly: boolean,
    textContent: string,
    callback: any
}

const TextArea: React.FC<TextAreaProps> = ({ isReadOnly, textContent, callback }) => {
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