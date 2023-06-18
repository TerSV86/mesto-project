import Popup from './modal.js'

export default class PopupWithFormDelCard extends Popup {
    constructor({ popup, delCard }) {
        super(popup);
        this.delCard = delCard;
        this.idCard = null;
        this.elemCard = null
    }
    openPopup(idCard, elemCard) {
        super.openPopup();
        this.idCard = idCard;
        this.elemCard = elemCard;
    }

    handlerSubmitDeleteCard(e) {
        this.delCard(e, this.idCard, this.elemCard);
        this.idCard = null;
        this.elemCard = null;
    }
}