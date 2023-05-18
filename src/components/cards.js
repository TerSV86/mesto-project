import { elementTemplate,  inputNameFormAddCard, inputLinkAddNewCard, formNewCard, userId} from "./data.js";
import { openPopupPic } from './modal.js'
import { createNewCard } from "./api.js";


function createCard(data) {
    const newCard = elementTemplate.cloneNode(true);
    
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

function createButtonTrashCard() {
    return `<button class="element__trash" type="button"></button>`
}
function renderButtonTrashCard(data) {

    const cardForButtonTrashCard = document.getElementById(`${data}`);

    cardForButtonTrashCard.insertAdjacentHTML('afterbegin', createButtonTrashCard())

}

//прорисовка лайков
function drawsLikes(result) {
    result.forEach((el) => {
        el.likes.forEach((user) => {
            if (user._id === userId.id) {
                document.getElementById(`${el._id}`).querySelector('.element__like').classList.add('element__like_active')
            }
        })
    })
}

function searchIdCard(element) {
    return element.closest('.element').id

}

export { handlersFormAdd, renderCard, resetForm, renderButtonTrashCard, drawsLikes, searchIdCard }