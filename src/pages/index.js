import './index.css'
import { Card } from '../components/Cards.js'
import {
    formProfile, buttonOpenPopupProfile, buttonOpenPopupAddNewCard, buttonClosePopupPic, popupsBody, popupPic, popupAddForm, popupEditForm, popupAvatarForm, buttonOpenPopupAvatar, buttonSubmitPopupRemovalCard, popupRemovalCard, buttonClosePopupRemovalCard, imgAvatar,
    buttonSubmitFormProfile, nameInputFormProfile, jobInputFormProfile, buttonSubmitFormAvatar, inputFormAvatar, buttonSubmitFormAddNewCard, inputNameFormAddCard, inputLinkAddNewCard, inputsFormAddNewCard, selector, formAddNewCard, inputsFormProfile, buttonSubmitFormEditProfile, popupPicTitle, popupPicSrc
} from '../components/data.js';
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

const validatorFormProfile = new Validator({ formElement: popupEditForm, selectors: selector, config: selectorsConfig, buttonOpenForm: '.profile__edit-button' });
const validatorFormAddCard = new Validator({ formElement: popupAddForm, selectors: selector, config: selectorsConfig, buttonOpenForm: '.profile__add-button' });
const validatorFormEditAvatar = new Validator({ formElement: popupAvatarForm, selectors: selector, config: selectorsConfig, buttonOpenForm: '.profile__avatar' });

const sectionList = new Section(renderCard, '.elements');

const removalCardPopup = new PopupWithFormDelCard({ popup: popupRemovalCard, delCard: handeleSubmitPopupRemovalCard })
removalCardPopup.setEventListener()
const cardPopup = new PopupWithImage(popupPic, popupPicTitle, popupPicSrc)

const userData = new UserInfo({ name: '.profile__title', job: '.profile__subtitle', avatar: '.profile__avatar-img' })

function renderCard({ data, position, userId }) {
    const newCard = new Card(data, '#addCard', cardPopup, removalCardPopup, userId, handlerDelLikes, handlePutLikes, removalCardPopup).createCard();
    sectionList.addCard({ elementNode: newCard, position });
};

const submitFormEditProfile = new PopupWithForm({ popup: popupEditForm, formSelector: 'popup-edit-form', inputForm: '.form__item' });
const submitFormAddCard = new PopupWithForm({ popup: popupAddForm, formSelector: 'popup-add-form' });
const submitFormEditAvatar = new PopupWithForm({ popup: popupAvatarForm, formSelector: 'popup-avatar-form', inputForm: '.form__item' });
submitFormEditProfile.setEventListener();
submitFormAddCard.setEventListener();
submitFormEditAvatar.setEventListener();
validatorFormProfile.enableValidation();
validatorFormAddCard.enableValidation();
validatorFormEditAvatar.enableValidation();

Promise.all([Api.requestsDataProfile(), Api.loadingCards()])
    .then(([data, result]) => {
        transmitsDataProfile(data)
        userData.setUserInfo(data)
        sectionList.rendererCards({ cards: result, position: 'append', userId: data._id })
    })
    .catch((err) => console.error('Could not fetch', err))

function handleFormProfileSubmit(evt, { name, profession }) {
    evt.preventDefault();
    const formInput = submitFormEditProfile.setEventListener();
    Api.editProfile({ name, profession })
        .then((data) => {
            userData.setUserInfo(data)
            submitFormEditProfile.closePopup()
        })
        .catch((err) => console.error('Could not fetch', err))
        .finally(() => {
            renderLoading(false, buttonSubmitFormProfile)
        })
}

buttonOpenPopupProfile.addEventListener('click', handleOpenPopupProfile);

function handleOpenPopupProfile() {
    submitFormEditProfile.setSubmitAction(handleFormProfileSubmit);
    const { name, about } = userData.getUserInfo()
    nameInputFormProfile.value = name;
    jobInputFormProfile.value = about;
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
            const arrayData = [data];
            sectionList.rendererCards({ cards: arrayData, position: 'prepend', userId: data.owner._id })
            submitFormAddCard.closePopup()
        })
        .catch((err) => console.error('Could not fetch', err))
        .finally(() => {
            renderLoading(false, buttonSubmitFormAddNewCard)
        })
}

function handleOpenPopupAddNewCard() {
    submitFormAddCard.setSubmitAction(handlersFormAdd);
    submitFormAddCard.openPopup();
    resetForm(popupAddForm);
}

buttonOpenPopupAvatar.addEventListener('click', handleOpenPopupAvatar)

function handleOpenPopupAvatar() {
    submitFormEditAvatar.setSubmitAction(handlersFormAvatar);
    submitFormEditAvatar.openPopup();
    resetForm(popupAvatarForm)
}

function handlersFormAvatar(evt, { url }) {
    evt.preventDefault()

    Api.editAvatar({ url })
        .then((data) => {
            userData.setUserInfo(data);
            submitFormEditAvatar.closePopup();
        })
        .catch((err) => console.error('Could not fetch', err))
        .finally(() => {
            renderLoading(false, buttonSubmitFormAvatar)
        })
}

buttonClosePopupPic.addEventListener('click', () => cardPopup.closePopup());

buttonClosePopupRemovalCard.addEventListener('click', () => removalCardPopup.closePopup())

popupsBody.forEach((popupBody) => {
    popupBody.addEventListener('click', (evt) => {
        (evt.target.closest('#popup-pic')) ? cardPopup.closePopupOverlay(evt.target) :
            (evt.target.closest('#popup-edit-form')) ? submitFormEditProfile.closePopupOverlay(evt.target) :
                (evt.target.closest('#popup-add-form')) ? submitFormAddCard.closePopupOverlay(evt.target) :
                    (evt.target.closest('#popup-avatar-form')) ? submitFormEditAvatar.closePopupOverlay(evt.target) :
                        (evt.target.closest('#popup-removal-card')) ? removalCardPopup.closePopupOverlay(evt.target) :
                            false;
    })
})

function handeleSubmitPopupRemovalCard(e, dataNewCard, newCardElem) {
    e.preventDefault()
    Api.delCard(dataNewCard)
        .then((data) => {
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