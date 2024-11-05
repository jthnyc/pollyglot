const sectionTitleTemplate = document.createElement('template');

sectionTitleTemplate.innerHTML = `
    <style>
        .translation-input__title {
            color: var(--medium-electric-blue);
            font-size: 1.25rem;
            text-align: center;
        }
    </style>
    <h3 class="translation-input__title">
        <slot name="title-text">Default Text</slot>
    </h3>
`;

class SectionTitle extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.appendChild(sectionTitleTemplate.content);
    }
}

customElements.define('section-title', SectionTitle);