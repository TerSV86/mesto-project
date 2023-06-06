export default class Form {
    #formElement;
    #submitHandler;

    constructor(formSelector, submitHandler = null) {
        this.#formElement = document.querySelector(formSelector);
        this.#submitHandler = submitHandler;
    }

    setSubmitAction(handler) {
        this.#submitHandler = handler;
    }

    setEventListener() {
        this.#formElement.addEventListener('submit', (e) => {
            this.#submitHandler(e);
        })
    }
}