import './index.css'
import { idCardRemoval, elCardRemoval, Card } from '../components/Cards.js'
import { formProfile, buttonOpenPopupProfile, buttonOpenPopupAddNewCard, buttonCloseFormEdit, buttonCloseFormAdd, buttonClosePopupPic, formNewCard, popupsBody, popupPic, popupAddForm, popupEditForm, popupAvatarForm, buttonCloseFormAvatar, formAvatar, buttonOpenPopupAvatar, buttonSubmitPopupRemovalCard, popupRemovalCard, buttonClosePopupRemovalCard, imgAvatar, profileTitle, profileSubtitle, buttonSubmitFormProfile, nameInputFormProfile, jobInputFormProfile, buttonSubmitFormAvatar, inputFormAvatar, buttonSubmitFormAddNewCard, inputNameFormAddCard, inputLinkAddNewCard, inputsFormAddNewCard, selector, formAddNewCard, inputsFormProfile, buttonSubmitFormEditProfile, popupPicTitle, popupPicSrc } from '../components/data.js';
import Popup from '../components/modal.js'
import Api from "../components/Api.js"
import Section from "../components/Section.js"
import PopupWithForm from "../components/PopupWithForm.js"
import { a, b } from "../components/PopupWithForm.js"
import Validator from "../components/validator.js"
import { PopupWithImage } from '../components/PopupWithImage';

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

const profilePopup = new Popup(popupEditForm)
const newCardPopup = new Popup(popupAddForm)
const avatarPopup = new Popup(popupAvatarForm)
const removalCardPopup = new Popup(popupRemovalCard)
function renderPopupCard(data) {
    const cardPopup = new PopupWithImage(data, popupPic, popupPicTitle, popupPicSrc)
    return cardPopup
}

function renderCards({ data, position, userId }) {
    const newCard = new Card(data, '#addCard', renderPopupCard, removalCardPopup, userId, handlerDelLikes, handlePutLikes).createCard();//*
    sectionList.addCard({ elementNode: newCard, position });
};

const submitFormEditProfile = new PopupWithForm({ formSelector: 'popup-edit-form' });
const submitFormAddCard = new PopupWithForm({ formSelector: 'popup-add-form' });
const submitFormEditAvatar = new PopupWithForm({ formSelector: 'popup-avatar-form' });
submitFormEditProfile.setEventListener();
submitFormAddCard.setEventListener();
submitFormEditAvatar.setEventListener();

Promise.all([Api.requestsDataProfile(), Api.loadingCards()])
    .then(([data, result]) => {
        transmitsDataProfile(data)
        result.forEach((item) => {
            renderCards({ data: item, position: 'append', userId: data._id })
        })
    })
    .catch((err) => console.error('Could not fetch', err))

function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    submitFormEditProfile._getInputValues(nameInputFormProfile, jobInputFormProfile);
    Api.editProfile(a, b)
        .then((data) => {
            profileTitle.textContent = data.name;
            profileSubtitle.textContent = data.about;
            profilePopup.closePopup()
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
    nameInputFormProfile.value = profileTitle.textContent;
    jobInputFormProfile.value = profileSubtitle.textContent;
    if (formProfile.querySelector('.form__input_type_error')) {
        inputsFormProfile.forEach((input) => {
            validatorFormProfile.hideInputError(input);
        })
    };
    buttonSubmitFormEditProfile.setAttribute('disabled', '');
    buttonSubmitFormEditProfile.classList.add('form__handlers');
    profilePopup.openPopup();
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
            newCardPopup.closePopup()
        })
        .catch((err) => console.error('Could not fetch', err))
        .finally(() => {
            renderLoading(false, buttonSubmitFormAddNewCard)
        })
}

function handleOpenPopupAddNewCard() {
    validatorFormAddCard.enableValidation();
    submitFormAddCard.setSubmitAction(handlersFormAdd);
    newCardPopup.openPopup();
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
    avatarPopup.openPopup()
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
            avatarPopup.closePopup(popupAvatarForm)
        })
        .catch((err) => console.error('Could not fetch', err))
        .finally(() => {
            renderLoading(false, buttonSubmitFormAvatar)
        })
}

buttonCloseFormEdit.addEventListener('click', () => {
    profilePopup.closePopup();
});

buttonCloseFormAdd.addEventListener('click', () => {
    formNewCard.reset();
    newCardPopup.closePopup();
});

buttonCloseFormAvatar.addEventListener('click', () => {
    formAvatar.reset();
    avatarPopup.closePopup()
})

buttonClosePopupPic.addEventListener('click', () => renderPopupCard().closePopup());

buttonClosePopupRemovalCard.addEventListener('click', () => removalCardPopup.closePopup())

popupsBody.forEach((popupBody) => {
    popupBody.addEventListener('click', (evt) => {
        (evt.target.closest('#popup-pic')) ? renderPopupCard().closePopupOverlay(evt.target) :
            (evt.target.closest('#popup-edit-form')) ? profilePopup.closePopupOverlay(evt.target) :
                (evt.target.closest('#popup-add-form')) ? newCardPopup.closePopupOverlay(evt.target) :
                    (evt.target.closest('#popup-avatar-form')) ? avatarPopup.closePopupOverlay(evt.target) :
                        (evt.target.closest('#popup-removal-card')) ? removalCardPopup.closePopupOverlay(evt.target) :
                            false;
    })
})

buttonSubmitPopupRemovalCard.addEventListener('click', handeleSubmitPopupRemovalCard)

function handeleSubmitPopupRemovalCard(evt) {
    evt.preventDefault();
    Api.delCard(idCardRemoval)
        .then((data) => {
            console.log(data.message);
            elCardRemoval.remove()
        })
        .catch((err) => console.error('Could not fetch', err))
    removalCardPopup.closePopup()
}

function transmitsDataProfile(data) {
    return imgAvatar.setAttribute('src', data.avatar),
        profileTitle.textContent = data.name,
        profileSubtitle.textContent = data.about
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