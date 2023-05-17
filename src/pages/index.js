import './index.css'

import { enableValidation } from '../components/validator.js';
import { handlersFormAdd } from '../components/cards.js'
import { formProfile, buttonOpenPopupProfile, buttonOpenPopupAddNewCard, buttonCloseFormEdit, buttonCloseFormAdd, buttonClosePopupPic, formNewCard, popupsBody, popupPic, popupAddForm, popupEditForm, popupAvatarForm, buttonCloseFormAvatar, formAvatar, buttonOpenPopupAvatar, buttonSubmitPopupRemovalCard, popupRemovalCard, buttonClosePopupRemovalCard } from '../components/data.js';
import { handleFormProfileSubmit, handleOpenPopupProfile, openPopup,  handleOpenPopupAvatar, handeleOpenPopupRemovalCard, handeleSubmitPopupRemovalCard } from '../components/modal.js';
import { closePopupOverlay, closePopup, handleOpenPopupAddNewCard } from '../components/modal.js'
import {} from '../components/api'


formProfile.addEventListener('submit', handleFormProfileSubmit);

buttonOpenPopupProfile.addEventListener('click', handleOpenPopupProfile);

buttonOpenPopupAddNewCard.addEventListener('click',  handleOpenPopupAddNewCard)

buttonOpenPopupAvatar.addEventListener('click',  handleOpenPopupAvatar)

buttonCloseFormEdit.addEventListener('click', () => {
    closePopup(popupEditForm);

});

buttonCloseFormAdd.addEventListener('click', () => {
    formNewCard.reset();
    closePopup(popupAddForm);
});

buttonCloseFormAvatar.addEventListener('click', () => {
    formAvatar.reset();
    closePopup(popupAvatarForm)
})

buttonClosePopupPic.addEventListener('click', () => closePopup(popupPic));

buttonClosePopupRemovalCard.addEventListener('click', ()=> closePopup(popupRemovalCard))

formNewCard.addEventListener('submit', handlersFormAdd);


/* document.addEventListener('keydown', (evt) => {    
    popups.forEach((popup) => {
        if (popup.classList.contains('popup_opened')) {
            return closePopupEsc(evt, popup)
        }
    })
}) */

popupsBody.forEach((popupBody) => {
    popupBody.addEventListener('click', (evt) => {
        closePopupOverlay(evt.target)
    })
})

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__handlers',
    inactiveButtonClass: 'form__handlers_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
});


buttonSubmitPopupRemovalCard.addEventListener('click', handeleSubmitPopupRemovalCard)

