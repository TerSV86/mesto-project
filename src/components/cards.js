import { elementTemplate, conteinerForElementsNewCard, inputNameFormAddCard, inputLinkAddNewCard, popupAddForm, formNewCard, } from "./data.js";
import { openPopupPic, closePopup } from './modal.js'
import { createNewCard } from "./api.js";


function createCard(data) {
    const newCard = elementTemplate.cloneNode(true);
    /*  const elementTrashNewCard = newCard.querySelector('.element__trash'); */
    const elementLikeNewCard = newCard.querySelector('.element__like');
    const elementImgNewCard = newCard.querySelector('.element__mask-group');
    const elementTitleNewCard = newCard.querySelector('.element__title');
    const elementCounterLikesCard = newCard.querySelector('.element__counter');
    const elementCard = newCard.querySelector('.element')
    

    elementImgNewCard.src = data.link;
    elementImgNewCard.alt = data.name;
    elementTitleNewCard.textContent = data.name;
    elementCounterLikesCard.textContent = data.count_likes;
    newCard.setAttribute('id', `${data.crd_id}`)
    /* elementTrashNewCard.addEventListener('click', () => removeCards(elementTrashNewCard));*/
    /* document.querySelector('.element__trash').addEventListener('click', async () =>{ await console.log('click')} ) */

    /* elementLikeNewCard.addEventListener('click', () => putLikes(elementLikeNewCard)); */
    elementImgNewCard.addEventListener('click', () => openPopupPic(data));

    return newCard;
}

function renderCard(data, conteiner) {

    conteiner.append(createCard(data));
}

function handlersFormAdd(evt) {
    evt.preventDefault();

    const data = {
        name: inputNameFormAddCard.value,
        link: inputLinkAddNewCard.value
    }
    createNewCard(data)
    /* renderCard(data, conteinerForElementsNewCard); */
    /* closePopup(popupAddForm); */

    formNewCard.reset();
    

}


function removeCards(trash) {
    /* trash.closest('.element').remove(); */ // было единственное действие
    const trashCard = trash.closest('.element');
    console.log(trashCard);
}

function putLikes(heart) {
    heart.classList.toggle('element__like_active');
    /* console.log(heart); */
}

function resetForm(popup) {
    popup.querySelector('.form').reset();
}




export { handlersFormAdd, renderCard, resetForm }