import { renderCard, handlersFormAdd } from "./cards";
import { conteinerForElementsNewCard, imgAvatar, profileTitle, profileSubtitle, formNewCard, body, plugButtonSubmitFormProfile, buttonSubmitFormProfile, popupEditForm, popupAddForm, popupAvatarForm, plugButtonSubmitFormNewCard, buttonSubmitFormAddNewCard, plugButtonSubmitFormAvatar, buttonSubmitFormAvatar } from './data'
import { closePopup, handeleOpenPopupRemovalCard } from "./modal";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-24',
    headers: {
        authorization: '1f4caeaf-a831-4781-be39-58597bdf5036',
        'Content-Type': 'application/json'
    }
}

const userId = {}
let idCardRemoval;


async function loadingProfile() {
    return await fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => {

            return imgAvatar.setAttribute('src', data.avatar),
                profileTitle.textContent = data.name,
                profileSubtitle.textContent = data.about,
                userId.id = data._id

        })
        .catch((err) => console.error('Could not fetch', err))
}
loadingProfile()

function editProfile(name, about) {
    renderLoading(true, plugButtonSubmitFormProfile, buttonSubmitFormProfile)
    fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: `${name}`,
            about: `${about}`
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => {
            console.log(data);
        })
        .finally(() => {
            renderLoading(false, plugButtonSubmitFormProfile, buttonSubmitFormProfile)
            closePopup(popupEditForm);
        })
        .catch((err) => console.error('Could not fetch', err))

}

function editAvatar(url) {
    renderLoading(true, plugButtonSubmitFormAvatar, buttonSubmitFormAvatar)
    fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: `${url}`
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => {
            console.log(data);
        })
        .finally(() => {
            renderLoading(true, plugButtonSubmitFormAvatar, buttonSubmitFormAvatar)
            closePopup(popupAvatarForm)
        })
        .catch((err) => console.error('Could not fetch', err))
}


async function loadingCards() {

    return await fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
        .then((result) => {
            const initialCards = result.map((el) => {
                return el = { 'name': el.name, 'link': el.link, 'user_id': el.owner._id, 'count_likes': el.likes.length, 'crd_id': el._id }
            })

            initialCards.forEach((item, num) => {
                if ((userId.id === initialCards[num].user_id)) {
                    renderCard(item, conteinerForElementsNewCard)
                    renderButtonTrashCard(item.crd_id)
                } else {
                    renderCard(item, conteinerForElementsNewCard)
                }
            })

            drawsLikes(result) //прорисовывает лайки

            const trashElementList = document.querySelectorAll('.element__trash');
            trashElementList.forEach((trashElement) => {
                trashElement.addEventListener('click', (evt) => {
                    handeleOpenPopupRemovalCard(evt)
                    idCardRemoval = searchIdCard(evt.target)                    
                })
            })



            const likesElementList = document.querySelectorAll('.element__like');
            likesElementList.forEach((likeElement) => {
                likeElement.addEventListener('click', (evt) => {

                    if ((evt.target.classList.contains('element__like_active'))) {
                        delLikes(searchIdCard(evt.target));
                    } else {
                        putLikes((searchIdCard(evt.target)), (evt.target))
                    }
                })
            })
        })
        .catch((err) => console.error('Could not fetch', err))
}
loadingCards()


function createButtonTrashCard() {
    return `<button class="element__trash" type="button"></button>`
}
function renderButtonTrashCard(data) {

    const cardForButtonTrashCard = document.getElementById(`${data}`);

    cardForButtonTrashCard.insertAdjacentHTML('afterbegin', createButtonTrashCard())

}

function createNewCard(data) {
    renderLoading(true, plugButtonSubmitFormNewCard, buttonSubmitFormAddNewCard)
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        body: JSON.stringify({
            name: data.name,
            link: data.link
        }),
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => {
            console.log(data)
        })
        .finally(() => {
            renderLoading(false, plugButtonSubmitFormNewCard, buttonSubmitFormAddNewCard)
            closePopup(popupAddForm)
            location.reload()
        })

        .catch((err) => console.error('Could not fetch', err))

}




function delCard(card_id) {
    return fetch(`${config.baseUrl}/cards/${card_id}`, {
        method: "DELETE",
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => {
            alert(data.message);
            location.reload()
        })
        .catch((err) => console.error('Could not fetch', err))
}

//прорисовка лайков
function drawsLikes(result) {
    result.forEach((el) => {
        el.likes.forEach((user) => {
            if (user._id === userId.id) {
                document.getElementById(`${el._id}`).querySelector('.element__like').classList.add('element__like_active')
            }
        })
    })
}




function putLikes(card_id, heart) {
    console.log(heart);
    return fetch(`${config.baseUrl}/cards/likes/${card_id}`, {
        method: "PUT",
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(() => {
            heart.classList.add('element__like_active')
            location.reload()
        })
        .catch((err) => console.error('Could not fetch', err))

}

function searchIdCard(element) {
    return element.closest('.element').id

}

function delLikes(card_id) {
    console.log('tyt');
    return fetch(`${config.baseUrl}/cards/likes/${card_id}`, {
        method: "DELETE",
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => {
            console.log(data)
            location.reload()
        })
        .catch((err) => console.error('Could not fetch', err))
}




function renderLoading(isLoading, plugButton, button) {
    console.log("tyt");
    if (isLoading) {
        plugButton.classList.add('form__conservation_visible');
        button.classList.add('form__handlers_hidden');        
    } else {
        plugButton.classList.remove('form__conservation_visible')
        button.classList.remove('form__handlers_hidden')       
    }
}





export { createNewCard, editProfile, editAvatar, delCard, idCardRemoval }
