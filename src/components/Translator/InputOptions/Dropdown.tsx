import React from 'react';

type DropdownProps = {
    optionName: string; // UI label like "Language"
    values: string[];
    hasDefaultValue: boolean;
    callback: (key: string, value: string) => void;
  };
  

const Dropdown: React.FC<DropdownProps> = ({ optionName, values, hasDefaultValue, callback }) => {
    return (
        <>
            <label htmlFor={optionName}>{ optionName }</label>
            <select id={optionName} value={optionName || ""} onChange={(e) => callback(optionName.toLowerCase(), e.target.value)}>
                { !hasDefaultValue && <option value="">--</option> }
                { values.map((value) => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
        </>
    )
}

export default Dropdown;