import './index.css'
import { idCardRemoval, elCardRemoval, Card } from '../components/Cards.js'
import { formProfile, buttonOpenPopupProfile, buttonOpenPopupAddNewCard, buttonCloseFormEdit, buttonCloseFormAdd, buttonClosePopupPic, formNewCard, popupsBody, popupPic, popupAddForm, popupEditForm, popupAvatarForm, buttonCloseFormAvatar, formAvatar, buttonOpenPopupAvatar, buttonSubmitPopupRemovalCard, popupRemovalCard, buttonClosePopupRemovalCard, imgAvatar, profileTitle, profileSubtitle, userId, buttonSubmitFormProfile, nameInputFormProfile, jobInputFormProfile, buttonSubmitFormAvatar, inputFormAvatar, buttonSubmitFormAddNewCard, servisInfoCard, inputNameFormAddCard, inputLinkAddNewCard, inputsFormAddNewCard, selector, formAddNewCard, inputsFormProfile, conteinerForElementsNewCard, buttonSubmitFormEditProfile } from '../components/data.js';
import Popup from '../components/modal.js'
import Api from "../components/Api.js"
import Section from "../components/Section.js"
import Form from "../components/Form.js"
import Validator from "../components/validator.js"

const validator = new Validator();

const sectionList = new Section(renderCards, '.elements')

function renderCards({ data, position }) {
    const newCard = new Card(data, '#addCard', Popup.openPopupPic, Popup.handeleOpenPopupRemovalCard).createCard();
    sectionList.addCard({ elementNode: newCard, position });
}

const submitForm = new Form('.form', handleFormProfileSubmit)

submitForm.setEventListener();

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
            renderCards({ data: item, position: 'append' })
        })
    })
    .catch((err) => console.error('Could not fetch', err))

submitForm.setSubmitAction(handleFormProfileSubmit)

function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    Api.editProfile(nameInputFormProfile.value, jobInputFormProfile.value)
        .then((data) => {
            profileTitle.textContent = data.name;
            profileSubtitle.textContent = data.about;
            Popup.closePopup(popupEditForm)
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
            validator.isValid(formProfile, input, selector)
        })
    }
    validator.toggleButtonState(inputsFormProfile, buttonSubmitFormProfile, selector);
    buttonSubmitFormEditProfile.setAttribute('disabled', '');
    buttonSubmitFormEditProfile.classList.add('form__handlers');
    Popup.openPopup(popupEditForm);
}

buttonOpenPopupAddNewCard.addEventListener('click', handleOpenPopupAddNewCard)

function handleOpenPopupAddNewCard() {
    Popup.openPopup(popupAddForm);
    resetForm(popupAddForm);
    validator.toggleButtonState(inputsFormAddNewCard, buttonSubmitFormAddNewCard, selector);
    if (formAddNewCard.querySelector('.form__input_type_error')) {
        inputsFormAddNewCard.forEach((input) => {
            validator.hideInputError(formAddNewCard, input, selector);
        })
    }
}

buttonOpenPopupAvatar.addEventListener('click', handleOpenPopupAvatar)

function handleOpenPopupAvatar() {
    Popup.openPopup(popupAvatarForm)
    resetForm(popupAvatarForm)
    if (popupAvatarForm.querySelector('.form__input_type_error')) {
        validator.hideInputError(popupAvatarForm, inputFormAvatar, selector)
    }
    buttonSubmitFormAvatar.setAttribute('disabled', '');
    buttonSubmitFormAvatar.classList.add('form__handlers');
}

buttonCloseFormEdit.addEventListener('click', () => {
    Popup.closePopup(popupEditForm);
});

buttonCloseFormAdd.addEventListener('click', () => {
    formNewCard.reset();
    Popup.closePopup(popupAddForm);
});

buttonCloseFormAvatar.addEventListener('click', () => {
    formAvatar.reset();
    Popup.closePopup(popupAvatarForm)
})

buttonClosePopupPic.addEventListener('click', () => Popup.closePopup(popupPic));

buttonClosePopupRemovalCard.addEventListener('click', () => Popup.closePopup(popupRemovalCard))

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
            renderCards({ data: el, position: 'prepend' })
            Popup.closePopup(popupAddForm)
        })
        .finally(() => {
            renderLoading(false, buttonSubmitFormAddNewCard)
        })
        .catch((err) => console.error('Could not fetch', err))
}

popupsBody.forEach((popupBody) => {
    popupBody.addEventListener('click', (evt) => {
        Popup.closePopupOverlay(evt.target)
    })
})

validator.enableValidation({
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
    Popup.closePopup(popupRemovalCard)
}

buttonSubmitFormAvatar.addEventListener('click', handlersFormAvatar)

function handlersFormAvatar(evt) {
    evt.preventDefault()

    Api.editAvatar(inputFormAvatar.value)
        .then((data) => {
            imgAvatar.setAttribute('src', data.avatar)
            Popup.closePopup(popupAvatarForm)
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

export function renderLoading(isLoading, button) {
    if (isLoading) {
        button.textContent = "Сохранение..."
    } else {
        button.textContent = "Сохранить"
    }
}