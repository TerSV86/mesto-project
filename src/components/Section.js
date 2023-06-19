export default class Section {
    #renderer;
    #container;
    constructor(renderer, containerSelector) {
        this.#container = document.querySelector(containerSelector);
        this.#renderer = renderer;       
    }

    addCard({ elementNode, position }) {
        switch (position) {
            case 'append':
                this.#container.append(elementNode);
                break;
            case 'prepend':
                this.#container.prepend(elementNode);
                break;
            default:
                console.error('Не валидное значние для параметра position');
                break;
        }

    }

    rendererCards({cards, position/* , userId */}) {           
       cards.forEach(card => this.#renderer({data: card, position/* , userId */}))      
    }
}