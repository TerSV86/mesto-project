import { popupPicTitle, popupPicSrc, popupPic, popups, nameInputFormProfile, profileTitle, profileSubtitle, jobInputFormProfile, popupEditForm, popupAddForm, inputsFormAddNewCard, buttonSubmitFormAddNewCard, selector, formAddNewCard, inputsFormProfile, buttonSubmitFormProfile, formProfile, popupAvatarForm, inputFormAvatar, buttonSubmitFormAvatar, formAvatar, imgAvatar } from './data.js'
import { toggleButtonState, hideInputError, isValid } from "./validator.js"
import { resetForm } from './cards.js'
function handleFormProfileSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInputFormProfile.value;
    profileSubtitle.textContent = jobInputFormProfile.value;

    closePopup(popupEditForm);
}

function handleOpenPopupProfile() {
    nameInputFormProfile.value = profileTitle.textContent;
    jobInputFormProfile.value = profileSubtitle.textContent;
    if (formProfile.querySelector('.form__input_type_error')) {
        inputsFormProfile.forEach((input) => {
            isValid(formProfile, input, selector)
        })
    }
    toggleButtonState(inputsFormProfile, buttonSubmitFormProfile, selector);
    openPopup(popupEditForm);
}

function createPopupPic(data) {
    popupPicTitle.textContent = data.name;
    popupPicSrc.setAttribute('src', data.link);
    popupPicSrc.setAttribute('alt', data.name);
}

function openPopupPic(img) {

    createPopupPic(img);

    openPopup(popupPic);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc); 
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc)
}


function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        return popups.forEach((popup) => {
            if (popup.classList.contains('popup_opened')) {
                closePopup(popup);                
            }
        })
    }
}

function closePopupOverlay(ovr) {
    const selectedPopupPic = ovr.closest('.popup__pic');
    const selectedForm = ovr.closest('.form');
    const popup = ovr.closest('.popup');
    if (!selectedForm && !selectedPopupPic) {
        closePopup(popup);
    }
}

function handleOpenPopupAddNewCard() {
    openPopup(popupAddForm);
    resetForm(popupAddForm);
    toggleButtonState(inputsFormAddNewCard, buttonSubmitFormAddNewCard, selector);
    if (formAddNewCard.querySelector('.form__input_type_error')) {
        inputsFormAddNewCard.forEach((input) => {
            hideInputError(formAddNewCard, input, selector);            
        })
    }
}

function handleOpenPopupAvatar() {
    openPopup(popupAvatarForm)
    resetForm(popupAvatarForm)
  //добавить валидацию
}

buttonSubmitFormAvatar.addEventListener('click', handlersFormAvatar)
function handlersFormAvatar(evt) {
    evt.preventDefault()
    
       imgAvatar.setAttribute('src', inputFormAvatar.value) 
       closePopup(popupAvatarForm)
}


export { handleFormProfileSubmit, handleOpenPopupProfile, createPopupPic, openPopupPic, openPopup, closePopup, closePopupEsc, closePopupOverlay, handleOpenPopupAddNewCard,  handleOpenPopupAvatar }

