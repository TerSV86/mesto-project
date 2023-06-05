import { elementTemplate, userId, conteinerForElementsNewCard, servisInfoCard } from "./data.js";
import { openPopupPic, handeleOpenPopupRemovalCard } from './modal.js'
import Api from "./Api.js"

let idCardRemoval;
let elCardRemoval;



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
  elementLikeNewCard.addEventListener('click', () => {
    if ((elementLikeNewCard.classList.contains('element__like_active'))) {

      Api.delLikesServer(data.crd_id)
        .then((data) => {
          elementLikeNewCard.classList.remove('element__like_active');
          elementCounterLikesCard.textContent = data.likes.length
        })
        .catch((err) => console.error('Could not fetch', err))
    } else {
      Api.putLikesServer(data.crd_id)
        .then((data) => {

          elementLikeNewCard.classList.add('element__like_active');
          elementCounterLikesCard.textContent = data.likes.length;
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
    elCardRemoval = evt.target.closest('.element')
    idCardRemoval = data.crd_id;
  })
  servisInfoCard.push({
    'card': newCard,
    'card_id': data.crd_id
  })

  return newCard;
}


export { idCardRemoval, elCardRemoval , createCard}