import Popup from './modal.js'

export let a;
export let b;

export default class PopupWithForm extends Popup {
    #formElement;
    #submitHandler;

    constructor({ formSelector, submitHandler = null, popup = null }) {
        super(popup);
        this.#formElement = document.getElementById(formSelector);
        this.#submitHandler = submitHandler;
    }

    setSubmitAction(handler) {
        this.#submitHandler = handler;
    }

    _getInputValues(name, about) {
        a = name;
        b = about;
    }

    setEventListener() {
        this.#formElement.addEventListener('submit', (e) => {
            this.#submitHandler(e);
        })
    }
}