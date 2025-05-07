import { Hero, Translator } from './components';
import { TranslationProvider } from './context/TranslationContext';

function App() {
    return (
        <div className="main">
            <Hero />
            <TranslationProvider>
                <Translator />
            </TranslationProvider>
        </div>
    )
}

export default App;