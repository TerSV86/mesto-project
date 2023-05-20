import { elementTemplate, userId, conteinerForElementsNewCard, servisInfoCard } from "./data.js";
import { openPopupPic, handeleOpenPopupRemovalCard } from './modal.js'
import { putLikesServer, delLikesServer } from "./api.js";

let idCardRemoval;

function createCard(data) {
    const newCard = elementTemplate.cloneNode(true);

    const elementLikeNewCard = newCard.querySelector('.element__like');
    const elementImgNewCard = newCard.querySelector('.element__mask-group');
    const elementTitleNewCard = newCard.querySelector('.element__title');
    const elementCounterLikesCard = newCard.querySelector('.element__counter');
    const elementCard = newCard.querySelector('.element')
    const elementTrashNewCard = newCard.querySelector('.element__trash')


    elementImgNewCard.src = data.link;
    elementImgNewCard.alt = data.name;
    elementTitleNewCard.textContent = data.name;
    elementCounterLikesCard.textContent = data.count_likes;
    

    elementImgNewCard.addEventListener('click', () => openPopupPic(data));
    elementLikeNewCard.addEventListener('click', (evt) => {
        if ((evt.target.classList.contains('element__like_active'))) {
            delLikesServer(searchIdCard(evt))
                .then(() => {
                    evt.target.classList.remove('element__like_active');
                    elementCounterLikesCard.textContent = +elementCounterLikesCard.textContent - 1
                })
                .catch((err) => console.error('Could not fetch', err))           
        } else {
            putLikesServer((searchIdCard(evt)))
                .then(() => {
                    evt.target.classList.add('element__like_active');
                    elementCounterLikesCard.textContent = data.like.length + 1;
                })
                .catch((err) => console.error('Could not fetch', err))
        }
    })

    data.like.forEach((el) => {
        if (el._id === userId.id) {
            elementLikeNewCard.classList.add('element__like_active')
        }
    })

    if (!(data.user_id === userId.id)) {
        elementTrashNewCard.remove()
    }

    elementTrashNewCard.addEventListener('click', (evt) => {
        handeleOpenPopupRemovalCard(evt);
        idCardRemoval = searchIdCard(evt);
    })
    servisInfoCard.push({
        'card': newCard,
        'card_id': data.crd_id
    })

    return newCard;
}


function renderCard(data) {
    conteinerForElementsNewCard.append(createCard(data));
}


function renderCardClient(data) {
    conteinerForElementsNewCard.prepend(createCard(data));
}


// ищет по событию evt в массиве servisInfoCard картачу и присвоенный ей id  
function searchIdCard(evt) {
    let id
    servisInfoCard.forEach((el) => {
        if (el.card === evt.target.closest('.element')) {
            id = el.card_id
        }
    })
    return id
}

export { renderCard, searchIdCard, idCardRemoval, renderCardClient }