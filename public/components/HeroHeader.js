const heroHeaderTemplate = document.createElement('template');

heroHeaderTemplate.innerHTML = `
    <style>
        .hero {
            align-items: center;
            background-image: url("assets/World_Map_1.png");
            background-position-x: right;
            background-repeat: no-repeat;
            display: flex;
            height: 25vh;
            justify-content: center;
        }

        .hero__image {
            margin-right: 0.9375rem;
            width: 5.93rem;
        }

        .hero-text__title {
            color: var(--lime-green);
            font-family: "Big Shoulders Display", sans-serif;
            font-size: 2.7138rem;
            line-height: 1.5;
            margin: 0;
        }

        .hero-text__subtext {
            color: var(--primary-white);
            font-size: .75rem;
            font-weight: 600;
            line-height: 1.5;
        }
    </style>
    <div class="hero">
        <img class="hero__image" src="assets/parrot.png"/>
        <div class="hero-text">
            <h1 class="hero-text__title">PollyGlot</h1>
            <span class="hero-text__subtext">Perfect Translation Every Time</span>
        </div>
    </div>
`;

class HeroHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.appendChild(heroHeaderTemplate.content);
    }
}

customElements.define('hero-header', HeroHeader)