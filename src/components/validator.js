export default class Validator {
    #selectors;
    constructor({ selectors }) {
        this.#selectors = selectors;
    }

    showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.#selectors.inputErrorClass);

        errorElement.textContent = errorMessage;

        errorElement.classList.add(this.#selectors.errorClass);
    }

    hideInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.#selectors.inputErrorClass);
        errorElement.classList.remove(this.#selectors.errorClass);
        errorElement.textContent = '';
    }

    isValid = (formElement, inputElement) => {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity('');
        }
        if (!inputElement.validity.valid) {
            this.showInputError(formElement, inputElement, inputElement.validationMessage)
        } else {
            this.hideInputError(formElement, inputElement)
        }
    }

    setEventListeners = (formElement, selectors) => {
        const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
        const buttonElement = formElement.querySelector(selectors.submitButtonSelector);

        this.toggleButtonState(inputList, buttonElement, selectors);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this.isValid(formElement, inputElement);
                this.toggleButtonState(inputList, buttonElement, selectors);
            })
        })
    }

    enableValidation = (selectors) => {
        const formList = Array.from(document.querySelectorAll(selectors.formSelector));
        formList.forEach((formElement) => {
            this.setEventListeners(formElement, selectors);
        })
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