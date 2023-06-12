import Popup from './modal.js'

class PopupWithImage extends Popup {
    data;
    constructor(data, popup = null, title, picsrc) {
        super(popup);
        this.data = data;
        this.title = title;
        this.picsrc = picsrc;
    }

 /*    createPopupPic() {
        return this.title.textContent = this.data.name,
            this.picsrc.setAttribute('src', this.data.link),
            this.picsrc.setAttribute('alt', this.data.name)
    } */

    openPopup() {
        this.title.textContent = this.data.name;
        this.picsrc.setAttribute('src', this.data.link);
        this.picsrc.setAttribute('alt', this.data.name);
        super.openPopup()      
    }
        
    /*  openPopupPic() { // не нужен. Удалить!
         this.createPopupPic(this.data);
         super.openPopup(this.popup);
     } */
}

export { PopupWithImage }