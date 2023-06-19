import Popup from './modal.js'

export default class PopupWithForm extends Popup {
    #formElement;
    #submitHandler;
    #inputForm;
    #allInputs;

    constructor({ formSelector, submitHandler = null, popup = null, inputForm = null }) {
        super(popup);
        this.#formElement = document.getElementById(formSelector);
        this.#submitHandler = submitHandler;
        this.#inputForm = inputForm;
        this.#allInputs = Array.from(this.#formElement.querySelectorAll(this.#inputForm));;
    };

    setEventListener() {
        super.setEventListener()
        this.#formElement.addEventListener('submit', (e) => {
            this.#submitHandler(e, this._getInputValues());
        })
    };

    setSubmitAction(handler) {
        this.#submitHandler = handler;
    };

    _getInputValues() {
        const objectInputs = {};
        this.#allInputs.forEach((input) => {
            objectInputs[input.name] = input.value
        });
        return objectInputs;
    }
};