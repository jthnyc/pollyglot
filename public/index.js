const availableLanguages = ['French', 'Spanish', 'Japanese', 'German', 'Italian', 'Chinese', 'Klingon', 'Quenya', 'Esperanto'];
const translateText = 'Translate';
const startOverText = 'Start Over';

const inputTitle = document.querySelector('.translation-input__title');
const textInputArea = document.querySelector('.translation-input__textarea');
const translationTextArea = document.querySelector('.translation__textarea');
const toneOptions = document.querySelectorAll('.tone-select__option');
const languageOptions = document.querySelectorAll('.language-select__option');
const translationSection = document.querySelector('.translation');
const translateCTA = document.querySelector('.translate-cta');

let selectedTone = 'formal'
let selectedLanguage = availableLanguages[0];
let textToTranslate = '';

function setEventListeners() {
    textInputArea.addEventListener('input', () => {
        textToTranslate = textInputArea.value;
        toggleTitleAndCTAState();
    })

    toneOptions.forEach(option => option.addEventListener('click', (e) => updateSelectedTone(e)));

    languageOptions.forEach(option => option.addEventListener('click', (e) => updateSelectedLanguage(e)));

    translateCTA.addEventListener('click', handleCTA);
}

function updateSelectedTone(e) {
    const selectedOption = findClosestOption(e, 'tone');
    selectedTone = selectedOption;
    updateRadioSelection(selectedOption, 'tone');
}

function updateSelectedLanguage(e) {
    const selectedOption = findClosestOption(e, 'language');
    const languageIndex = availableLanguages.indexOf(selectedOption);
    selectedLanguage = availableLanguages[languageIndex];
    updateRadioSelection(selectedLanguage, 'language');
    if (selectedLanguage === 'Chinese') {
        selectedLanguage = 'Traditional Chinese'
    }
}

function findClosestOption(e, type) {
    const closestOption = type === 'language' ? e.target.closest('.language-select__option') : e.target.closest('.tone-select__option');
    const selectedOption = closestOption && closestOption.querySelector('input').value;
    return selectedOption;
}

function updateRadioSelection(selectedLanguage, type) {
    if (type === 'language') {
        languageOptions.forEach(option => {
            const radioInput = option.querySelector('input');
            radioInput.removeAttribute('checked');
            if (radioInput.id === selectedLanguage) {
                radioInput.checked = true;
            }
        })
    } else {
        toneOptions.forEach(option => {
            const radioInput = option.querySelector('input');
            radioInput.removeAttribute('checked');
            if (radioInput.id === selectedTone) {
                radioInput.checked = true;
            }
        })
    }
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
    const toneSelectSection = document.querySelector('.tone-select');
    const languageSelectSection = document.querySelector('.language-select');
    const translationTitle = document.querySelector('.translation__title');
    if (languageSelectSection.classList.contains('hidden')) {
        inputTitle.classList.remove('hidden');
        secondaryInputTitle.classList.add('hidden');
        toneSelectSection.classList.remove('hidden');
        languageSelectSection.classList.remove('hidden');
        translationSection.classList.add('hidden');
        textToTranslate = '';
        translationTextArea.value = '';
        textInputArea.value = '';
        translateCTA.innerText = translateText;
    } else {
        inputTitle.classList.add('hidden');
        secondaryInputTitle.classList.remove('hidden');
        toneSelectSection.classList.add('hidden');
        languageSelectSection.classList.add('hidden');
        translationSection.classList.remove('hidden');
        translateCTA.innerText = startOverText;
        translationTitle.innerText = `${selectedLanguage} Polly:`;
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
        translationJSON && translationJSON.then(translation => {
            renderTranslation(translation.audio.transcript);
            const binaryArray = convertToBinary(translation.audio.data);
            handleAudio(binaryArray);
        })
    }
}

function convertToBinary(rawAudioData) {
    let raw = window.atob(rawAudioData);
    let rawLength = raw.length;
    let array = new Uint8Array(new ArrayBuffer(rawLength));
    for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
}

async function fetchTranslation() {
    try {
        const response = await fetch('/gpt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'tone': selectedTone,
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

function handleAudio(binaryArray) {
    const audioPlayer = document.querySelector('.translation__audio');
    const audioBlob = new Blob([binaryArray], { 'type': 'audio/mpeg;' });
    const audioURL = window.URL.createObjectURL(audioBlob);
    audioPlayer.src = audioURL;
}

setEventListeners();
