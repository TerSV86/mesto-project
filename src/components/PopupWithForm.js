import Popup from './modal.js'

export default class PopupWithForm extends Popup {
    #formElement;
    #submitHandler;

    constructor({ formSelector, submitHandler = null, popup = null }) {
        super(popup);
        this.#formElement = document.getElementById(formSelector);
        this.#submitHandler = submitHandler;        
    }

    setEventListener() {
        super.setEventListener()

        this.#formElement.addEventListener('submit', (e) => {
            this.#submitHandler(e);
        })

    }

    setSubmitAction(handler) {
        this.#submitHandler = handler;
    }

    _getInputValues() {
        const allInputs = Array.from(this.#formElement.querySelectorAll('.form__item'));
        const objectInputs = {};
        allInputs.forEach((input) => {
            objectInputs[input.name] = input.value
        });

        return objectInputs;
    }


}