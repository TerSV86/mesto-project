const nameInputFormProfile = document.querySelector('.form__item_el_name');
const jobInputFormProfile = document.querySelector('.form__item_el_profession');
const buttonSubmitFormProfile = document.querySelector('.form__handlers');  //??
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
const buttonNewCard = popupAddForm.querySelector('.form__handlers'); //??
const formNewCard = popupAddForm.querySelector('.form');
const elementsCard = document.querySelector('.elements'); //??
const popupPicSrc = popupPic.querySelector('.popup__img');
const popupPicTitle = popupPic.querySelector('.popup__title');
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const popups = document.querySelectorAll('.popup');
const popupsBody = document.querySelectorAll('.popup__body');
const body = document.querySelector('.body');
const popupFigurePic = document.querySelector('.popup__pic');
const formAddNewCard = popupAddForm.querySelector('.form');

export { nameInputFormProfile, jobInputFormProfile, buttonSubmitFormProfile, buttonOpenPopupProfile, buttonOpenPopupAddNewCard, profileTitle, profileSubtitle, inputNameFormAddCard, inputLinkAddNewCard, conteinerForElementsNewCard, popupEditForm, popupAddForm, popupPic, formProfile, buttonCloseFormEdit, buttonCloseFormAdd, buttonClosePopupPic, cardTemplate, elementTemplate, buttonNewCard, formNewCard, elementsCard, popupPicSrc, popupPicTitle, initialCards, popups, popupsBody, body, popupFigurePic, formAddNewCard }