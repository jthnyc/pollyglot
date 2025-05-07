import React from 'react';
import './TranslationContextForm.css';
import { PrimaryHeader } from '../index';
import { TranslationContextState } from '../../../context/TranslationContext';
import { dropdownOptionsMap } from '../../../constants';
import DropdownList from './DropdownList';

interface TranslationContextFormProps {
    context: TranslationContextState;
    onChange: (updated: TranslationContextState) => void;
}

const TranslationContextForm: React.FC<TranslationContextFormProps> = ({ context, onChange }) => {
    const handleChange = (key: keyof TranslationContextState, value: string) => {
        onChange({ ...context, [key]: value });
    };

    return (
        <div className="context-select">
            <PrimaryHeader headerText={"Add Context"} />
            <DropdownList listContextMap={dropdownOptionsMap} callback={handleChange} />
            {/* <div className='context-select__options'>
                <label>
                    Language:
                    <select value={context.language || ""} onChange={(e) => handleChange("language", e.target.value)}>
                        {languageOptions.map((loc) => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                </label>
            </div> */}
        </div>
    );
};

export default TranslationContextForm;