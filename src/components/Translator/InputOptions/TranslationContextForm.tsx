import React from 'react';
import './TranslationContextForm.css';
import { PrimaryHeader } from '../index';
import { TranslationContext, languageOptions, audienceOptions, goalOptions, toneOptions } from '../../../context/TranslationContext';

const TranslationContextForm = ({ context, onChange }: {context: TranslationContext; onChange: (updated: TranslationContext) => void; }) => {
    const handleChange = (key: keyof TranslationContext, value: string) => {
        onChange({ ...context, [key]: value });
    };

    return (
        <div className="context-select">
            <PrimaryHeader headerText={"Add Context"} />
            <div className='context-select__options'>
                <label>
                    Language:
                    <select value={context.language || ""} onChange={(e) => handleChange("language", e.target.value)}>
                        {languageOptions.map((loc) => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Tone:
                    <select value={context.tone || ""} onChange={(e) => handleChange("tone", e.target.value)}>
                        {toneOptions.map((tone) => (
                            <option key={tone} value={tone}>{tone}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Speaking to:
                    <select value={context.audience || ""} onChange={(e) => handleChange("audience", e.target.value)}>
                        <option value="">--</option>
                        {audienceOptions.map((aud) => (
                            <option key={aud} value={aud}>{aud}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Goal/Intent:
                    <select value={context.goal || ""} onChange={(e) => handleChange("goal", e.target.value)}>
                        <option value="">--</option>
                        {goalOptions.map((goal) => (
                            <option key={goal} value={goal}>{goal}</option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    );
};

export default TranslationContextForm;