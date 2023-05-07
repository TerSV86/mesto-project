import { elementTemplate, initialCards, conteinerForElementsNewCard, inputNameFormAddCard, inputLinkAddNewCard, popupAddForm, formNewCard, } from "./data.js";
import {openPopupPic, closePopup} from './modal.js'

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
    elementImgNewCard.addEventListener('click', () => openPopupPic(data));

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

initialCards.forEach(item => renderCard(item, conteinerForElementsNewCard));

function removeCards(trash) {
    trash.closest('.element').remove();
}

function putLikes(heart) {
    heart.classList.toggle('element__like_active');
}

function resetForm (popup) {
    popup.querySelector('.form').reset();
}


export {handlersFormAdd, renderCard, resetForm}