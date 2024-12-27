import { createContext, useState, useContext } from "react";
import { textConstants } from "../constants";

const AppContext = createContext();

export function AppProvider({ children }) {
    const { initialTone, initialLang, initialInputTitle, initialTranslationTitle, initialCTAText } = textConstants;
    const initialState = {
        tone: initialTone,
        language: initialLang,
        textToTranslate: "",
        inputSectionTitle: initialInputTitle,
        translationSectionTitle: initialTranslationTitle,
        isTranslationHidden: true,
        ctaText: initialCTAText
    }

    const [ state, setState ] = useState(initialState);

    const refresh = () => {
        setState(initialState);
    }

    return (
        <AppContext.Provider value={{ state, setState, refresh}}>
            { children }
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}