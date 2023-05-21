


const showInputError = (formElement, inputElement, errorMessage, selectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectors.inputErrorClass);

    errorElement.textContent = errorMessage;

    errorElement.classList.add(selectors.errorClass);
}



const hideInputError = (formElement, inputElement, selectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent = '';
}

const isValid = (formElement, inputElement, selectors) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
       
        showInputError(formElement, inputElement, inputElement.validationMessage, selectors)
    } else {
       
        hideInputError(formElement, inputElement, selectors)
    }
}





const setEventListeners = (formElement, selectors) => {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, selectors);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, selectors);
            toggleButtonState(inputList, buttonElement, selectors);
        })

    })
}

const enableValidation = (selectors) => {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, selectors);

    })
}



function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        
        return !inputElement.validity.valid ;
    })
}


function toggleButtonState(inputList, buttonElement, selectors) {
    
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', '');
        buttonElement.classList.add(selectors.inactiveButtonClass);
    } else {
        buttonElement.removeAttribute('disabled')
        buttonElement.classList.remove(selectors.inactiveButtonClass);
    }
}




export { enableValidation, toggleButtonState, hideInputError, isValid }