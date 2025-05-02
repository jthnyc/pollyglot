import React from 'react';
import { createRoot } from "react-dom/client";
import './styles/index.css';
import App from "./App";
import { AppProvider } from "./context/AppContext";

const root = createRoot(document.getElementById('root')!);
root.render(
    <AppProvider>
        <App />
    </AppProvider>
);
