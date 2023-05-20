import { popupPicTitle, popupPicSrc, popupPic, popups, popupRemovalCard } from './data.js'


function createPopupPic(data) {
    popupPicTitle.textContent = data.name;
    popupPicSrc.setAttribute('src', data.link);
    popupPicSrc.setAttribute('alt', data.name);
}

function openPopupPic(img) {

    createPopupPic(img);

    openPopup(popupPic);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc)
}


function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        return popups.forEach((popup) => {
            if (popup.classList.contains('popup_opened')) {
                closePopup(popup);
            }
        })
    }
}

function closePopupOverlay(ovr) {
    const selectedPopupPic = ovr.closest('.popup__pic');
    const selectedForm = ovr.closest('.form');
    const popup = ovr.closest('.popup');
    if (!selectedForm && !selectedPopupPic) {
        closePopup(popup);
    }
}

function handeleOpenPopupRemovalCard() {
    openPopup(popupRemovalCard)
}



export { createPopupPic, openPopupPic, openPopup, closePopup, closePopupEsc, closePopupOverlay, handeleOpenPopupRemovalCard }

