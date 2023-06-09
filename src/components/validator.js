export default class Validator {

    constructor() { }

    showInputError = (formElement, inputElement, errorMessage, selectors) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(selectors.inputErrorClass);

        errorElement.textContent = errorMessage;

        errorElement.classList.add(selectors.errorClass);
    }

    hideInputError = (formElement, inputElement, selectors) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(selectors.inputErrorClass);
        errorElement.classList.remove(selectors.errorClass);
        errorElement.textContent = '';
    }

    isValid = (formElement, inputElement, selectors) => {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity('');
        }
        if (!inputElement.validity.valid) {
            this.showInputError(formElement, inputElement, inputElement.validationMessage, selectors)
        } else {
            this.hideInputError(formElement, inputElement, selectors)
        }
    }

    setEventListeners = (formElement, selectors) => {
        const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
        const buttonElement = formElement.querySelector(selectors.submitButtonSelector);

        this.toggleButtonState(inputList, buttonElement, selectors);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this.isValid(formElement, inputElement, selectors);
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