import Popup from './modal.js'

class PopupWithImage extends Popup {
    data;
    constructor(popup = null, title, picsrc) {
        super(popup);
        this.title = title;
        this.picsrc = picsrc;
    }

    openPopup(data) {
        this.title.textContent = data.name;
        this.picsrc.setAttribute('src', data.link);
        this.picsrc.setAttribute('alt', data.name);
        super.openPopup()
    }

}

export { PopupWithImage }