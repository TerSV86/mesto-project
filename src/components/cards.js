
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
  constructor(data, templateSelector, cardPopup, removalCardPopup, userId, handlerDelLikes, handlePutLikes) {
    this.#data = data;
    this.#templateSelector = templateSelector;   
    this.cardPopup = cardPopup;
    this.removalCardPopup = removalCardPopup;
    this.userId = userId;
    this.handlerDelLikes = handlerDelLikes;
    this.handlePutLikes = handlePutLikes;    
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
    elementCounterLikesCard.textContent = this.#data.likes.length;
    elementImgNewCard.addEventListener('click', () => {
      this.cardPopup.openPopup(this.#data)
    });
    elementLikeNewCard.addEventListener('click', () => {
      if ((elementLikeNewCard.classList.contains('element__like_active'))) {
        this.handlerDelLikes(this.#data._id, elementLikeNewCard, elementCounterLikesCard)
      } else {
        this.handlePutLikes(this.#data._id, elementLikeNewCard, elementCounterLikesCard)
      }
    })
    this.#data.likes.forEach((el) => {
      if (el._id === this.userId) {
        elementLikeNewCard.classList.add('element__like_active')
      }
    })

    if (!(this.#data.owner._id === this.userId)) {
      elementTrashNewCard.remove()
    }
    elementTrashNewCard.addEventListener('click', () => {
      this.removalCardPopup.openPopup(this.#data._id, this.#newCard)    
    })
    return this.#newCard;
  }
}

