import Popup from './modal.js'
import { popupPicTitle, popupPicSrc, popupPic, popups, popupRemovalCard } from './data.js'

class CardPopup extends Popup {
    data;
    constructor(data, popup = null) {
        super(popup);
        this.data = data;
    }

    openPopup() {
        super.openPopup()
    }

    closePopup() {
        super.closePopup()
    }
    closePopupOverlay(ovr) {
        super.closePopupOverlay(ovr)
    }
    closePopupEsc(evt) {
        super.closePopupEsc(evt)
    }

    createPopupPic() {
        return popupPicTitle.textContent = this.data.name,
            popupPicSrc.setAttribute('src', this.data.link),
            popupPicSrc.setAttribute('alt', this.data.name)
    }
    openPopupPic() {
        this.createPopupPic(this.data);
        super.openPopup(this.popup);
    }
}

export { CardPopup }