const nameInputFormProfile = document.querySelector('.form__item_el_name');
const jobInputFormProfile = document.querySelector('.form__item_el_profession');
const buttonSubmitFormProfile = document.querySelector('.form__handlers');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonOpenPopupAddNewCard = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const inputNameFormAddCard = document.querySelector('.form__item_el_name-pic');
const inputLinkAddNewCard = document.querySelector('.form__item_el_link-pic');
const conteinerForElementsNewCard = document.querySelector('.elements');
const popupEditForm = document.getElementById('popup-edit-form');
const popupAddForm = document.getElementById('popup-add-form');
const popupPic = document.getElementById('popup-pic');
const formProfile = popupEditForm.querySelector('.form');
const buttonCloseFormEdit = popupEditForm.querySelector('.form__close');
const buttonCloseFormAdd = popupAddForm.querySelector('.form__close');
const buttonClosePopupPic = popupPic.querySelector('.popup__close');
const cardTemplate = document.querySelector('#addCard').content;
const elementTemplate = cardTemplate.querySelector('.element');
const buttonNewCard = popupAddForm.querySelector('.form__handlers');
const formNewCard = popupAddForm.querySelector('.form');
const elementsCard = document.querySelector('.elements');
const popupPicSrc = popupPic.querySelector('.popup__img');
const popupPicTitle = popupPic.querySelector('.popup__title');
const popups = document.querySelectorAll('.popup');
const popupsBody = document.querySelectorAll('.popup__body');
const body = document.querySelector('.body');
const popupFigurePic = document.querySelector('.popup__pic');
const formAddNewCard = popupAddForm.querySelector('.form');
const inputsFormAddNewCard = Array.from(formAddNewCard.querySelectorAll('.form__item'));
const buttonSubmitFormAddNewCard = popupAddForm.querySelector('.form__handlers');
const selector = {
    inactiveButtonClass: 'form__handlers_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};
const inputsFormProfile = Array.from(popupEditForm.querySelectorAll('.form__item'));
const popupAvatarForm = document.getElementById('popup-avatar-form');
const buttonCloseFormAvatar = popupAvatarForm.querySelector('.form__close');
const formAvatar = popupAvatarForm.querySelector('.form');
const buttonOpenPopupAvatar = document.querySelector('.profile__avatar');
const inputFormAvatar = formAvatar.querySelector('.form__item');
const buttonSubmitFormAvatar = formAvatar.querySelector('.form__handlers');
const imgAvatar = document.querySelector('.profile__avatar-img');

const popupRemovalCard = document.getElementById('popup-removal-card');
const buttonSubmitPopupRemovalCard = popupRemovalCard.querySelector('.form__handlers');
const buttonClosePopupRemovalCard = popupRemovalCard.querySelector('.form__close')

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-24',
    headers: {
        authorization: '1f4caeaf-a831-4781-be39-58597bdf5036',
        'Content-Type': 'application/json'
    }
}

const userId = {}
const servisInfoCard = []



export { nameInputFormProfile, jobInputFormProfile, buttonSubmitFormProfile, buttonOpenPopupProfile, buttonOpenPopupAddNewCard, profileTitle, profileSubtitle, inputNameFormAddCard, inputLinkAddNewCard, conteinerForElementsNewCard, popupEditForm, popupAddForm, popupPic, formProfile, buttonCloseFormEdit, buttonCloseFormAdd, buttonClosePopupPic, cardTemplate, elementTemplate, buttonNewCard, formNewCard, elementsCard, popupPicSrc, popupPicTitle, popups, popupsBody, body, popupFigurePic, formAddNewCard, inputsFormAddNewCard, buttonSubmitFormAddNewCard, selector, inputsFormProfile, popupAvatarForm, buttonCloseFormAvatar, formAvatar, buttonOpenPopupAvatar, inputFormAvatar, buttonSubmitFormAvatar, imgAvatar, popupRemovalCard, buttonSubmitPopupRemovalCard, buttonClosePopupRemovalCard, config, userId, servisInfoCard}