import './index.css'
import { Card } from '../components/Cards.js'
import {
    formProfile, buttonOpenPopupProfile, buttonOpenPopupAddNewCard, buttonClosePopupPic, popupsBody, popupPic, popupAddForm, popupEditForm, popupAvatarForm, buttonOpenPopupAvatar, buttonSubmitPopupRemovalCard, popupRemovalCard, buttonClosePopupRemovalCard, imgAvatar,
    buttonSubmitFormProfile, nameInputFormProfile, jobInputFormProfile, buttonSubmitFormAvatar, inputFormAvatar, buttonSubmitFormAddNewCard, inputNameFormAddCard, inputLinkAddNewCard, inputsFormAddNewCard, selector, formAddNewCard, inputsFormProfile, buttonSubmitFormEditProfile, popupPicTitle, popupPicSrc
} from '../components/data.js';
import Popup from '../components/modal.js'
import Api from "../components/Api.js"
import Section from "../components/Section.js"
import PopupWithForm from "../components/PopupWithForm.js"
import Validator from "../components/validator.js"
import { PopupWithImage } from '../components/PopupWithImage';
import UserInfo from '../components/UserInfo';
import PopupWithFormDelCard from '../components/PopupWithFormDelCard';

const selectorsConfig = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__handlers',
    inactiveButtonClass: 'form__handlers_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};

const validatorFormProfile = new Validator({ formElement: popupEditForm, selectors: selector, config: selectorsConfig });
const validatorFormAddCard = new Validator({ formElement: popupAddForm, selectors: selector, config: selectorsConfig });
const validatorFormEditAvatar = new Validator({ formElement: popupAvatarForm, selectors: selector, config: selectorsConfig });

const sectionList = new Section(renderCards, '.elements');




const removalCardPopup = new PopupWithFormDelCard({ popup: popupRemovalCard, delCard: handeleSubmitPopupRemovalCard })

function renderPopupCard(data) {
    const cardPopup = new PopupWithImage(data, popupPic, popupPicTitle, popupPicSrc)
    return cardPopup
}

const userData = new UserInfo({ name: '.profile__title', job: '.profile__subtitle' })

function renderCards({ data, position, userId }) {
    const newCard = new Card(data, '#addCard', renderPopupCard, removalCardPopup, userId, handlerDelLikes, handlePutLikes, removalCardPopup).createCard();
    sectionList.addCard({ elementNode: newCard, position });

};

const submitFormEditProfile = new PopupWithForm({ popup: popupEditForm, formSelector: 'popup-edit-form' });
const submitFormAddCard = new PopupWithForm({ popup: popupAddForm, formSelector: 'popup-add-form' });
const submitFormEditAvatar = new PopupWithForm({ popup: popupAvatarForm, formSelector: 'popup-avatar-form' });
submitFormEditProfile.setEventListener()
submitFormAddCard.setEventListener();
submitFormEditAvatar.setEventListener();

Promise.all([Api.requestsDataProfile(), Api.loadingCards()])
    .then(([data, result]) => {
        transmitsDataProfile(data)
        userData.setUserInfo(data)
        result.forEach((item) => {
            renderCards({ data: item, position: 'append', userId: data._id })
        })
    })
    .catch((err) => console.error('Could not fetch', err))

function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    const { name, profession } = submitFormEditProfile._getInputValues();
    Api.editProfile(name, profession)
        .then((data) => {
            userData.setUserInfo(data)
            submitFormEditProfile.closePopup()
        })
        .catch((err) => console.error('Could not fetch', err))
        .finally(() => {
            renderLoading(false, buttonSubmitFormProfile)
        })
        .catch((err) => console.error('Could not fetch', err))
}

buttonOpenPopupProfile.addEventListener('click', handleOpenPopupProfile);


function handleOpenPopupProfile() {
    validatorFormProfile.enableValidation();
    submitFormEditProfile.setSubmitAction(handleFormProfileSubmit);
    const { name, about } = userData.getUserInfo()
    nameInputFormProfile.value = name;
    jobInputFormProfile.value = about;
    if (formProfile.querySelector('.form__input_type_error')) {
        inputsFormProfile.forEach((input) => {
            validatorFormProfile.hideInputError(input);
        })
    };
    buttonSubmitFormEditProfile.setAttribute('disabled', '');
    buttonSubmitFormEditProfile.classList.add('form__handlers');
    submitFormEditProfile.openPopup()
}

buttonOpenPopupAddNewCard.addEventListener('click', handleOpenPopupAddNewCard)

function handlersFormAdd(evt) {
    evt.preventDefault();
    const data = {
        name: inputNameFormAddCard.value,
        link: inputLinkAddNewCard.value
    }
    Api.createNewCard(data)
        .then((data) => {
            renderCards({ data: data, position: 'prepend', userId: data.owner._id })
            submitFormAddCard.closePopup()
        })
        .catch((err) => console.error('Could not fetch', err))
        .finally(() => {
            renderLoading(false, buttonSubmitFormAddNewCard)
        })
}

function handleOpenPopupAddNewCard() {
    validatorFormAddCard.enableValidation();
    submitFormAddCard.setSubmitAction(handlersFormAdd);
    submitFormAddCard.openPopup();
    resetForm(popupAddForm);
    validatorFormAddCard.toggleButtonState(inputsFormAddNewCard, buttonSubmitFormAddNewCard, selector);
    if (formAddNewCard.querySelector('.form__input_type_error')) {
        inputsFormAddNewCard.forEach((input) => {
            validatorFormAddCard.hideInputError(input)
        })
    }
}

buttonOpenPopupAvatar.addEventListener('click', handleOpenPopupAvatar)

function handleOpenPopupAvatar() {
    validatorFormEditAvatar.enableValidation();
    submitFormEditAvatar.setSubmitAction(handlersFormAvatar);
    submitFormEditAvatar.openPopup();
    resetForm(popupAvatarForm)
    if (popupAvatarForm.querySelector('.form__input_type_error')) {
        validatorFormEditAvatar.hideInputError(inputFormAvatar)
    }
    buttonSubmitFormAvatar.setAttribute('disabled', '');
    buttonSubmitFormAvatar.classList.add('form__handlers');
}

function handlersFormAvatar(evt) {
    evt.preventDefault()

    Api.editAvatar(inputFormAvatar.value)
        .then((data) => {
            imgAvatar.setAttribute('src', data.avatar)
            submitFormEditAvatar.closePopup()
        })
        .catch((err) => console.error('Could not fetch', err))
        .finally(() => {
            renderLoading(false, buttonSubmitFormAvatar)
        })
}

buttonClosePopupPic.addEventListener('click', () => renderPopupCard().closePopup());

buttonClosePopupRemovalCard.addEventListener('click', () => removalCardPopup.closePopup())

popupsBody.forEach((popupBody) => {
    popupBody.addEventListener('click', (evt) => {
        (evt.target.closest('#popup-pic')) ? renderPopupCard().closePopupOverlay(evt.target) :
            (evt.target.closest('#popup-edit-form')) ? submitFormEditProfile.closePopupOverlay(evt.target) :
                (evt.target.closest('#popup-add-form')) ? submitFormAddCard.closePopupOverlay(evt.target) :
                    (evt.target.closest('#popup-avatar-form')) ? submitFormEditAvatar.closePopupOverlay(evt.target) :
                        (evt.target.closest('#popup-removal-card')) ? removalCardPopup.closePopupOverlay(evt.target) :
                            false;
    })
})

buttonSubmitPopupRemovalCard.addEventListener('click', (e) => removalCardPopup.handlerSubmitDeleteCard(e))

function handeleSubmitPopupRemovalCard(e, dataNewCard, newCardElem) {
    e.preventDefault()
    Api.delCard(dataNewCard)
        .then((data) => {
            console.log(data.message);
            newCardElem.remove()
        })
        .catch((err) => console.error('Could not fetch', err))
    removalCardPopup.closePopup()
}

function transmitsDataProfile(data) {
    return imgAvatar.setAttribute('src', data.avatar)
}

function resetForm(popup) {
    popup.querySelector('.form').reset();
}

function handlerDelLikes(idCard, elemLike, elemCount) {
    Api.delLikesServer(idCard)
        .then((data) => {
            elemLike.classList.remove('element__like_active');
            elemCount.textContent = data.likes.length
        })
        .catch((err) => console.error('Could not fetch', err))
}

function handlePutLikes(idCard, elemLike, elemCount) {
    Api.putLikesServer(idCard)
        .then((data) => {
            elemLike.classList.add('element__like_active');
            elemCount.textContent = data.likes.length;
        })
        .catch((err) => console.error('Could not fetch', err))
}

export function renderLoading(isLoading, button) {
    if (isLoading) {
        button.textContent = "Сохранение..."
    } else {
        button.textContent = "Сохранить"
    }
}