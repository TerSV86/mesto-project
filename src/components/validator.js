export default class Validator {
    #formElement;
    #selectors;
    #config;
    #formList;
    #inputList;
    #buttonElement;
    selectorButtonOpedForm;
    buttonOpenForm;

    constructor({ formElement, selectors, config, buttonOpenForm }) {
        this.#selectors = selectors;
        this.#formElement = formElement;
        this.#config = config;
        this.#formList = this.#formElement.querySelector(this.#config.formSelector);
        this.#inputList = Array.from(this.#formList.querySelectorAll(this.#config.inputSelector));
        this.#buttonElement = this.#formList.querySelector(this.#config.submitButtonSelector);
        this.buttonOpenForm = buttonOpenForm;
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

    hideErrors() {
        const buttonOpenForm = document.querySelector(this.buttonOpenForm);
        buttonOpenForm.addEventListener('click', () => {
            this.#buttonElement.setAttribute('disabled', '');
            this.#buttonElement.classList.add(-this.#config.inactiveButtonClass);
            if (this.#formElement.querySelector('.form__input_type_error')) {
                this.#inputList.forEach((inputElement) => {
                    this.hideInputError(inputElement);
                })
            }
        })
    }

    setEventListeners() {
        this.hideErrors();
        this.toggleButtonState();
        this.#inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this.isValid(inputElement);
                this.toggleButtonState();
            })
        });
    }

    enableValidation = () => {
        this.setEventListeners();
    }

    hasInvalidInput() {
        return this.#inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    toggleButtonState() {
        if (this.hasInvalidInput()) {
            this.#buttonElement.setAttribute('disabled', '');
            this.#buttonElement.classList.add(-this.#config.inactiveButtonClass);
        } else {
            this.#buttonElement.removeAttribute('disabled')
            this.#buttonElement.classList.remove(this.#config.inactiveButtonClass);
        }
    }


}