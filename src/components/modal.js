import { popupPicTitle, popupPicSrc, popupPic, popups, popupRemovalCard } from './data.js'

export default class Popup {


    constructor(popup) {
        this.popup = popup;
    }
    openPopup() {
        this.popup.classList.add('popup_opened')
        document.addEventListener('keydown', (evt) => {
            this.closePopupEsc(evt)
        });
    }
    closePopup() {
        return this.popup.classList.remove('popup_opened'),
            document.removeEventListener('keydown', () => { this.closePopupEsc })
    }
    closePopupOverlay(ovr) {
        const selectedPopupPic = ovr.closest('.popup__pic');
        const selectedForm = ovr.closest('.form');
        const popup = ovr.closest('.popup');
        if (!selectedForm && !selectedPopupPic) {
            this.closePopup(popup);
        }
    }
    closePopupEsc(evt) {
        if (evt.key === 'Escape') {
            return popups.forEach((popup) => {
                if (popup.classList.contains('popup_opened')) {
                    this.closePopup(popup);
                }
            })
        }
    }
}















