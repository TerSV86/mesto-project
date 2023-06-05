import { elementTemplate, userId, conteinerForElementsNewCard, servisInfoCard } from "./data.js";
import { openPopupPic, handeleOpenPopupRemovalCard } from './modal.js'
import Api from "./Api.js"

let idCardRemoval;
let elCardRemoval;

export class Card {
  #newCard
  #data;
  #templateSelector;
  #getTemplate() {
      return document
          .querySelector(this.#templateSelector)
          .content
          .querySelector('.element')
          .cloneNode(true)
  }
  constructor(data, templateSelector) {
      this.#data = data;
      this.#templateSelector = templateSelector;
  }
  createCard() {
      this.#newCard = this.#getTemplate();
      const elementLikeNewCard = this.#newCard.querySelector('.element__like');
      const elementImgNewCard = this.#newCard.querySelector('.element__mask-group');
      const elementTitleNewCard = this.#newCard.querySelector('.element__title');
      const elementCounterLikesCard = this.#newCard.querySelector('.element__counter');
      const elementCard = this.#newCard.querySelector('.element')
      const elementTrashNewCard = this.#newCard.querySelector('.element__trash')
      elementImgNewCard.src = this.#data.link;
      elementImgNewCard.alt = this.#data.name;
      elementTitleNewCard.textContent = this.#data.name;
      elementCounterLikesCard.textContent = this.#data.count_likes;

      elementImgNewCard.addEventListener('click', () => openPopupPic(this.data)); //нужно вынисти наружу
      elementLikeNewCard.addEventListener('click', () => {
          if ((elementLikeNewCard.classList.contains('element__like_active'))) {
              Api.delLikesServer(this.#data.crd_id)
                  .then((data) => {
                      elementLikeNewCard.classList.remove('element__like_active');
                      elementCounterLikesCard.textContent = data.likes.length
                  })
                  .catch((err) => console.error('Could not fetch', err))
          } else {
              Api.putLikesServer(this.#data.crd_id)
                  .then((data) => {
                      elementLikeNewCard.classList.add('element__like_active');
                      elementCounterLikesCard.textContent = data.likes.length;
                  })
                  .catch((err) => console.error('Could not fetch', err))
          }
      })
      this.#data.like.forEach((el) => {
          if (el._id === userId.id) {
              elementLikeNewCard.classList.add('element__like_active')
          }
      })
      if (!(this.#data.user_id === userId.id)) {
          elementTrashNewCard.remove()
      }
      elementTrashNewCard.addEventListener('click', (evt) => {
          handeleOpenPopupRemovalCard(evt); // нужно через this
          elCardRemoval = evt.target.closest('.element')
          idCardRemoval = this.#data.crd_id;
      })
      servisInfoCard.push({
          'card': this.#newCard,
          'card_id': this.#data.crd_id
      })
      return this.#newCard;
  }
}

export { idCardRemoval, elCardRemoval}