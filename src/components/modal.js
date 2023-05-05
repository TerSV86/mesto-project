import {popupPicTitle, popupPicSrc, popupPic, popups, nameInputFormProfile, profileTitle, profileSubtitle, jobInputFormProfile, popupEditForm} from './data.js'
import { enableValidation } from './validator.js';
function handleFormProfileSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInputFormProfile.value;
    profileSubtitle.textContent = jobInputFormProfile.value;

    closePopup(popupEditForm);
 
    
}

function handleOpenPopupProfile() {
    nameInputFormProfile.value = profileTitle.textContent;
    jobInputFormProfile.value = profileSubtitle.textContent;
    openPopup(popupEditForm);
    enableValidation({
        formSelector: '.form',
        inputSelector: '.form__item',
        submitButtonSelector: '.form__handlers',
        inputErrorClass: 'form__input_type_error',
        errorClass: 'form__input-error_active'
    });
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
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
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
    if (!selectedForm && !selectedPopupPic) {
        closePopup(ovr.closest('.popup'));
    }
}

export {handleFormProfileSubmit, handleOpenPopupProfile, createPopupPic, openPopupPic, openPopup, closePopup, closePopupEsc, closePopupOverlay}