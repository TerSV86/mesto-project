import { Card } from './Cards.js';

class Section {
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
}

const sectionList = new Section(renderCards, '.elements')

export function renderCards({ data, position }) {
    const newCard = new Card(data, '#addCard').createCard();
    sectionList.addCard({ elementNode: newCard, position });

}