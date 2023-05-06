import { popupPicTitle, popupPicSrc, popupPic, popups, nameInputFormProfile, profileTitle, profileSubtitle, jobInputFormProfile, popupEditForm } from './data.js'
import { toggleButtonState } from "./validator.js"
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
    const buttonSubmitForm = popup.querySelector('.form__handlers');
    const inputsForm = Array.from(popup.querySelectorAll('.form__item'));
    const selector = { inactiveButtonClass: 'form__handlers_disabled' }
    if (buttonSubmitForm) {
        toggleButtonState(inputsForm, buttonSubmitForm, selector)
    }
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
                popup.querySelector('.form').reset();
            }
        })
    }
}

function closePopupOverlay(ovr) {
    const selectedPopupPic = ovr.closest('.popup__pic');
    const selectedForm = ovr.closest('.form');
    const popupForm = ovr.querySelector('.form');
    const popup = ovr.closest('.popup');
    if (!selectedForm && !selectedPopupPic) {
        closePopup(popup);
        if (popupForm) {            
            popupForm.reset();
        }

    }
}

export { handleFormProfileSubmit, handleOpenPopupProfile, createPopupPic, openPopupPic, openPopup, closePopup, closePopupEsc, closePopupOverlay }