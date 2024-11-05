const languageOptionsTemplate = document.createElement('template');

languageOptionsTemplate.innerHTML = `
    <style>
        .language-select__options {
            display: flex;
            flex-direction: column;
            row-gap: 1rem;
            padding-left: 1.5rem;
            margin-top: 0.625rem;
        }

        .language-select__option {
            align-items: center;
            column-gap: 1rem;
            display: flex;
        }

        .language-select__image {
            border: .0625rem solid var(--primary-black);
            height: 1.25rem;
        }
    </style>
    <div class="language-select__options">
        <div class="language-select__option">
            <input type="radio" id="fr" name="language" value="French" checked />
            <label for="fr">French</label>
            <img class="language-select__image" src="assets/fr.png" alt="French flag" />
        </div>
        <div class="language-select__option">
            <input type="radio" id="sp" name="language" value="Spanish" />
            <label for="sp">Spanish</label>
            <img class="language-select__image" src="assets/sp.png" alt="Spanish flag" />
        </div>
        <div class="language-select__option">
            <input type="radio" id="jp" name="language" value="Japanese" />
            <label for="jp">Japanese</label>
            <img class="language-select__image" src="assets/jp.png" alt="Japanese flag" />
        </div>
    </div>
`;

class LanguageOption extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.appendChild(languageOptionsTemplate.content);
    }
}

customElements.define('language-options', LanguageOption)