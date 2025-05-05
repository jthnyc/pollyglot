import { createContext, useState, useContext, PropsWithChildren } from "react";
import { textConstants, languageMap } from "../constants";

type AppState = {
    textToTranslate: string;
    inputSectionTitle: string;
    translationSectionTitle: string;
    ctaText: string;
};

type AppContextType = {
    state: AppState;
    setState: React.Dispatch<React.SetStateAction<AppState>>;
    refresh: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: PropsWithChildren<{}>) {
    const { initialInputTitle, initialTranslationTitle, initialCTAText } = textConstants;
    const initialState: AppState = {
        textToTranslate: "",
        inputSectionTitle: initialInputTitle,
        translationSectionTitle: initialTranslationTitle,
        ctaText: initialCTAText
    }

    const [ state, setState ] = useState(initialState);

    const refresh = () => {
        setState(initialState)
    }

    return (
        <AppContext.Provider value={{ state, setState, refresh }}>
            { children }
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider")
    }
    return context;
}