import React from 'react';
import './TranslationContextForm.css';
import { PrimaryHeader } from '../index';
import type { TranslationContextState } from '../../../constants';
import { dropdownOptionsMap } from '../../../constants';
import DropdownList from './DropdownList';

interface TranslationContextFormProps {
    context: TranslationContextState;
    onChange: (updated: TranslationContextState) => void;
}

const TranslationContextForm: React.FC<TranslationContextFormProps> = ({ context, onChange }) => {
    const handleChange = (key: keyof TranslationContextState, value: string) => {
        onChange({ ...context, [key]: value } as TranslationContextState);
    };

    return (
        <div className="context-select">
            <PrimaryHeader headerText={"Add Context"} />
            <DropdownList listContextMap={dropdownOptionsMap} callback={handleChange} />
        </div>
    );
};

export default TranslationContextForm;