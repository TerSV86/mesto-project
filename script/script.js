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
const buttonNewCard = popupAddForm.querySelector('.form__handlers');//
const formNewCard = popupAddForm.querySelector('.form');
const heartNewCard = elementTemplate.querySelector('.element__like');
const elementsCard = document.querySelector('.elements');
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




function handleFormProfileSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInputFormProfile.value;
    profileSubtitle.textContent = jobInputFormProfile.value;

    closePopup(popupEditForm);
}




function openPopup(popup) {
    popup.classList.add('popup_opened');
}




function closePopup(popup) {
    popup.classList.remove('popup_opened');
}




function createCard(data) {
    const newCard = elementTemplate.cloneNode(true);
    const elementTrashNewCard = newCard.querySelector('.element__trash');
    const elementLikeNewCard = newCard.querySelector('.element__like');
    const elementImgNewCard = newCard.querySelector('.element__mask-group');
    const elementTitleNewCard = newCard.querySelector('.element__title');

    elementImgNewCard.src = data.link;
    elementImgNewCard.alt = data.name;
    elementTitleNewCard.textContent = data.name;

    elementTrashNewCard.addEventListener('click', () => removeCards(elementTrashNewCard));
    elementLikeNewCard.addEventListener('click', () => putLikes(elementLikeNewCard));
    elementImgNewCard.addEventListener('click', () => openPopupPic(elementImgNewCard, popupPic));

    return newCard;
}

function renderCard(data, conteiner) {
    conteiner.prepend(createCard(data));
}

function handlersFormAdd(evt) {
    evt.preventDefault();

    const data = {
        name: inputNameFormAddCard.value,
        link: inputLinkAddNewCard.value
    }
    renderCard(data, conteinerForElementsNewCard);
    closePopup(popupAddForm);

    formNewCard.reset();
}




function createPopupPic(link) {
    const title = link.nextElementSibling.textContent;
    popupPicTitle.textContent = title;
    popupPicSrc.setAttribute('src', link.src);
    popupPicTitle.setAttribute('alt', title);
}

function openPopupPic(img, popup) {

    createPopupPic(img);

    openPopup(popup);
}




function removeCards(trash) {
    trash.parentElement.remove();
}




function putLikes(heart) {
    heart.classList.toggle('element__like_active');
}




formProfile.addEventListener('submit', handleFormProfileSubmit);

buttonOpenPopupProfile.addEventListener('click', () => openPopup(popupEditForm));
buttonOpenPopupAddNewCard.addEventListener('click', () => openPopup(popupAddForm));

buttonCloseFormEdit.addEventListener('click', () => {
    nameInputFormProfile.value = profileTitle.textContent;
    jobInputFormProfile.value = profileSubtitle.textContent;
    closePopup(popupEditForm);
});

buttonCloseFormAdd.addEventListener('click', () => {
    formNewCard.reset();
    closePopup(popupAddForm)
});

buttonClosePopupPic.addEventListener('click', () => closePopup(popupPic));

formNewCard.addEventListener('submit', handlersFormAdd);
initialCards.forEach(item => renderCard(item, conteinerForElementsNewCard));