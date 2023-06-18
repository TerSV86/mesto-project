
export default class Popup {
    constructor(popup) {
        this.popup = popup;
        this.setEventListener = this.setEventListener.bind(this);
        this.closePopupEsc = (evt) => {
            if (evt.key === 'Escape') {
                this.closePopup();
            }
        }
    }
    setEventListener() {
        const buttonCloseForm = this.popup.querySelector('.form__close')
        buttonCloseForm.addEventListener('click', () => {
            this.closePopup()
        })
    }
    openPopup() {
        this.popup.classList.add('popup_opened')
        document.addEventListener('keydown', this.closePopupEsc)
    }
    closePopup() {
        this.popup.classList.remove('popup_opened')
        document.removeEventListener('keydown', this.closePopupEsc)
    }
    closePopupOverlay(ovr) {
        const selectedPopupPic = ovr.closest('.popup__pic');
        const selectedForm = ovr.closest('.form');
        const popup = ovr.closest('.popup');
        if (!selectedForm && !selectedPopupPic) {
            this.closePopup(popup);
        }
    }
}















