import React from 'react';
import Dropdown from "./Dropdown"
import { TranslationContextState } from '../../../context';
import { dropdownOptionsMap } from '../../../constants';

type DropdownOptionMap = typeof dropdownOptionsMap;

interface DropdownListProps {
    listContextMap: DropdownOptionMap;
    callback: (key: keyof TranslationContextState, value: string) => void;
}

const DropdownList: React.FC<DropdownListProps> = ({ listContextMap, callback }) => {
    return (
        <div className='context-select__options'>
            {(Object.keys(listContextMap) as Array<keyof DropdownOptionMap>).map((label) => {
                const { contextKey, hasDefaultValue, options } = listContextMap[label];
                return (
                    <Dropdown
                        key={label}
                        optionName={label} // Capitalized label
                        values={options}
                        hasDefaultValue={hasDefaultValue}
                        callback={(k, v) => callback(contextKey, v)} // Map label → actual state key
                    />
                );
            })}
        </div>
    )
}

export default DropdownList;