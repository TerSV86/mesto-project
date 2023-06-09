import { popupPicTitle, popupPicSrc, popupPic, popups, popupRemovalCard } from './data.js'

class Popup {
    #closePopupEsc(evt) {      
        if (evt.key === 'Escape') {
            return popups.forEach((popup) => {
                if (popup.classList.contains('popup_opened')) {
                    this.closePopup(popup);
                }
            })
        }
    } 

    constructor() {
       
    }

    createPopupPic(data) {
        return popupPicTitle.textContent = data.name,
            popupPicSrc.setAttribute('src', data.link),
            popupPicSrc.setAttribute('alt', data.name)
    }


    openPopup(popup) {
        popup.classList.add('popup_opened')
        
        document.addEventListener('keydown', (evt) => {  
            this.#closePopupEsc(evt)             
        });
    }
    openPopupPic(data) {  
     this.createPopupPic(data); 
     this.openPopup(popupPic);     
    }

    closePopup(popup) {
        return popup.classList.remove('popup_opened'),
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

    handeleOpenPopupRemovalCard() {
        return this.openPopup(popupRemovalCard)
        
    }

}

export default new Popup()




