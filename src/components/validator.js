export default class Validator {
    #formElement;
    #selectors;
    #config;
    constructor({ formElement , selectors, config }) {
        this.#selectors = selectors;
        this.#formElement = formElement;
        this.#config = config;
    }

    showInputError = (inputElement, errorMessage) => {
        const errorElement = this.#formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.#selectors.inputErrorClass);

        errorElement.textContent = errorMessage;

        errorElement.classList.add(this.#selectors.errorClass);
    }

    hideInputError = (inputElement) => {
        const errorElement = this.#formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.#selectors.inputErrorClass);
        errorElement.classList.remove(this.#selectors.errorClass);
        errorElement.textContent = '';
    }

    isValid = (inputElement) => {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity('');
        }
        if (!inputElement.validity.valid) {
            this.showInputError(inputElement, inputElement.validationMessage)
        } else {
            this.hideInputError(inputElement)
        }
    }

    setEventListeners = (formElement, selectors) => {
        const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
        const buttonElement = formElement.querySelector(selectors.submitButtonSelector);

        this.toggleButtonState(inputList, buttonElement, selectors);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this.isValid(inputElement);
                this.toggleButtonState(inputList, buttonElement, selectors);
            })
        });
    }

    enableValidation = () => {
        const formList = document.querySelector(this.#config.formSelector);
            this.setEventListeners(formList, this.#config);
    }

    hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    toggleButtonState(inputList, buttonElement, selectors) {
        if (this.hasInvalidInput(inputList)) {
            buttonElement.setAttribute('disabled', '');
            buttonElement.classList.add(-selectors.inactiveButtonClass);
        } else {
            buttonElement.removeAttribute('disabled')
            buttonElement.classList.remove(selectors.inactiveButtonClass);
        }
    }
}