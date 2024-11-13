const availableLanguages = ['French', 'Spanish', 'Japanese', 'German', 'Italian', 'Chinese', 'Klingon', 'Quenya', 'Esperanto'];
const translateText = 'Translate';
const startOverText = 'Start Over';

const inputTitle = document.querySelector('.translation-input__title');
const textInputArea = document.querySelector('.translation-input__textarea');
const translationTextArea = document.querySelector('.translation__textarea');
const languageOptions = document.querySelectorAll('.language-select__option');
const translationSection = document.querySelector('.translation');
const translateCTA = document.querySelector('.translate-cta');

let selectedLanguage = availableLanguages[0];
let textToTranslate = '';

function setEventListeners() {
    textInputArea.addEventListener('input', () => {
        textToTranslate = textInputArea.value;
        toggleTitleAndCTAState();
    })

    languageOptions.forEach(option => option.addEventListener('click', (e) => updateSelectedLanguage(e)));

    translateCTA.addEventListener('click', handleCTA);
}

function updateSelectedLanguage(e) {
    const selectedOption = findClosestOption(e);
    const languageIndex = availableLanguages.indexOf(selectedOption);
    selectedLanguage = availableLanguages[languageIndex];
    updateRadioSelection(selectedLanguage);
}

function findClosestOption(e) {
    const closestOption = e.target.closest('.language-select__option');
    const selectedLang = closestOption && closestOption.querySelector('input').value;
    return selectedLang;
}

function updateRadioSelection(selectedLanguage) {
    console.log('selectedLanguage: ', selectedLanguage)
    languageOptions.forEach(option => {
        const radioInput = option.querySelector('input');
        radioInput.removeAttribute('checked');
        if (radioInput.id === selectedLanguage) {
            radioInput.checked = true;
        }
    })
}

function toggleTitleAndCTAState() {
    const errorTitle = document.querySelector('.translation-input__title.error')
    if (!textToTranslate.length) {
        inputTitle.classList.add('hidden');
        errorTitle.classList.remove('hidden');
        translateCTA.classList.add('translate-cta--disabled');
    } else {
        inputTitle.classList.remove('hidden');
        errorTitle.classList.add('hidden');
        translateCTA.classList.remove('translate-cta--disabled');
    }
}

function toggleReadOnly() {
    if (textInputArea.getAttribute('readonly')) {
        textInputArea.removeAttribute('readonly')
    } else {
        textInputArea.setAttribute('readonly', true);
    }
}

function toggleUIDisplay() {
    const secondaryInputTitle = document.querySelector('.translation-input__title-secondary');
    const languageSelectSection = document.querySelector('.language-select');
    if (languageSelectSection.classList.contains('hidden')) {
        inputTitle.classList.remove('hidden');
        secondaryInputTitle.classList.add('hidden');
        languageSelectSection.classList.remove('hidden');
        translationSection.classList.add('hidden');
        textToTranslate = '';
        translationTextArea.value = '';
        textInputArea.value = '';
        translateCTA.innerText = translateText;
    } else {
        inputTitle.classList.add('hidden');
        secondaryInputTitle.classList.remove('hidden');
        languageSelectSection.classList.add('hidden');
        translationSection.classList.remove('hidden');
        translateCTA.innerText = startOverText;
    }
}

function handleCTA() {
    if (!textToTranslate.length) {
        toggleTitleAndCTAState();
        return
    };
    toggleReadOnly();
    toggleUIDisplay();
    if (textToTranslate.length && !translationSection.classList.contains('hidden')) {
        const translationJSON = fetchTranslation();
        translationJSON && translationJSON.then(translation => renderTranslation(translation.content))
    }
}

async function fetchTranslation() {
    try {
        const response = await fetch('/gpt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'prompt': textToTranslate,
                'language': selectedLanguage
            })
        });
        if (!response.ok) {
            console.error('Request failed: ', response);
        }
        const translationJSON = await response.json();
        return translationJSON;
    } catch (error) {
        console.log('error: ', error)
    }
}

function renderTranslation(translation) {
    translationTextArea.value = translation;
}

setEventListeners();
