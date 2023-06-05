import './index.css'
import { enableValidation } from '../components/validator.js';
import { idCardRemoval, elCardRemoval } from '../components/Cards.js'
import { formProfile, buttonOpenPopupProfile, buttonOpenPopupAddNewCard, buttonCloseFormEdit, buttonCloseFormAdd, buttonClosePopupPic, formNewCard, popupsBody, popupPic, popupAddForm, popupEditForm, popupAvatarForm, buttonCloseFormAvatar, formAvatar, buttonOpenPopupAvatar, buttonSubmitPopupRemovalCard, popupRemovalCard, buttonClosePopupRemovalCard, imgAvatar, profileTitle, profileSubtitle, userId, buttonSubmitFormProfile, nameInputFormProfile, jobInputFormProfile, buttonSubmitFormAvatar, inputFormAvatar, buttonSubmitFormAddNewCard, servisInfoCard, inputNameFormAddCard, inputLinkAddNewCard, inputsFormAddNewCard, selector, formAddNewCard, inputsFormProfile, conteinerForElementsNewCard } from '../components/data.js';
import { openPopup } from '../components/modal.js';
import { closePopupOverlay, closePopup } from '../components/modal.js'
import { toggleButtonState, hideInputError } from '../components/validator'
import Api from "../components/Api.js"
import { Card } from '../components/Cards.js';



Promise.all([Api.requestsDataProfile(), Api.loadingCards()])
    .then(([data, result]) => {
        transmitsDataProfile(data)
        const initialCards = result.map((el) => {
            return el = {
                'name': el.name,
                'link': el.link,
                'user_id': el.owner._id,
                'count_likes': el.likes.length,
                'crd_id': el._id,
                'like': el.likes
            }
        })
        initialCards.forEach((item) => {
            renderCard(item)
        })
    })
    .catch((err) => console.error('Could not fetch', err))

formProfile.addEventListener('submit', handleFormProfileSubmit);

function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    Api.editProfile(nameInputFormProfile.value, jobInputFormProfile.value)
        .then((data) => {
            profileTitle.textContent = data.name;
            profileSubtitle.textContent = data.about;
            closePopup(popupEditForm)
        })
        .finally(() => {
            renderLoading(false, buttonSubmitFormProfile)
        })
        .catch((err) => console.error('Could not fetch', err))
}

buttonOpenPopupProfile.addEventListener('click', handleOpenPopupProfile);

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

buttonOpenPopupAddNewCard.addEventListener('click', handleOpenPopupAddNewCard)

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

buttonOpenPopupAvatar.addEventListener('click', handleOpenPopupAvatar)

function handleOpenPopupAvatar() {
    openPopup(popupAvatarForm)
    resetForm(popupAvatarForm)

    if (!(popupAddForm.querySelector('.form__item').validity.valid)) {
        buttonSubmitFormAvatar.setAttribute('disabled', '');
        buttonSubmitFormAvatar.classList.add('form__handlers');
    } else {
        buttonSubmitFormAvatar.removeAttribute('disabled')
        buttonSubmitFormAvatar.classList.remove('form__handlers');
    }
}

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

buttonClosePopupRemovalCard.addEventListener('click', () => closePopup(popupRemovalCard))

formNewCard.addEventListener('submit', handlersFormAdd);

function handlersFormAdd(evt) {
    evt.preventDefault();
    const data = {
        name: inputNameFormAddCard.value,
        link: inputLinkAddNewCard.value
    }
    Api.createNewCard(data)
        .then((data) => {
            const el = {
                'name': data.name,
                'link': data.link,
                'user_id': data.owner._id,
                'count_likes': data.likes.length,
                'crd_id': data._id,
                'like': data.likes
            }
            renderCard(el, 'prepend')
            closePopup(popupAddForm)
        })
        .finally(() => {
            renderLoading(false, buttonSubmitFormAddNewCard)

        })
        .catch((err) => console.error('Could not fetch', err))
}

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

function handeleSubmitPopupRemovalCard(evt) {
    evt.preventDefault();

    Api.delCard(idCardRemoval)
        .then((data) => {
            console.log(data.message);
            elCardRemoval.remove()
        })
        .catch((err) => console.error('Could not fetch', err))

    closePopup(popupRemovalCard)
}

buttonSubmitFormAvatar.addEventListener('click', handlersFormAvatar)

function handlersFormAvatar(evt) {
    evt.preventDefault()

    Api.editAvatar(inputFormAvatar.value)
        .then((data) => {

            imgAvatar.setAttribute('src', data.avatar)
            closePopup(popupAvatarForm)
        })
        .finally(() => {
            renderLoading(false, buttonSubmitFormAvatar)
        })
        .catch((err) => console.error('Could not fetch', err))

}



function transmitsDataProfile(data) {
    return imgAvatar.setAttribute('src', data.avatar),
        profileTitle.textContent = data.name,
        profileSubtitle.textContent = data.about,
        userId.id = data._id

}

function resetForm(popup) {
    popup.querySelector('.form').reset();
}

function renderCard(data, position = 'append') {
    const newCard = new Card(data, '#addCard').createCard();
    switch (position) {
        case 'append':
            conteinerForElementsNewCard.append(newCard);
            break;
        case 'prepend':
            conteinerForElementsNewCard.prepend(newCard);
            break;
        default:
            console.error('Не валидное значение для параметра position');
            break
    }
}


export function renderLoading(isLoading, button) {
    if (isLoading) {
        button.textContent = "Сохранение..."
    } else {
        button.textContent = "Сохранить"
    }
}