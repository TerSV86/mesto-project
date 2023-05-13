import { renderCard } from "./cards";
import { conteinerForElementsNewCard, imgAvatar, profileTitle, profileSubtitle } from './data'

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-24',
    headers: {
      authorization: '1f4caeaf-a831-4781-be39-58597bdf5036',
      'Content-Type': 'application/json'
    }
  }

const userId = "8a5fa6c5630f251f7afa63fd";// Как получить из запроса?



function loadingProfile() {
    return fetch(`${config.baseUrl}/users/me`, {
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
                profileSubtitle.textContent = data.about

        })
        .catch((err) => console.log(err))
}
loadingProfile()



function loadingCards() {

    return fetch(`${config.baseUrl}/cards`, {
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

                return el = { 'name': el.name, 'link': el.link, 'user_id': el.owner._id, 'count_likes': el.likes.length }

            })

            initialCards.forEach(item => {
                if (!(userId === initialCards[0].user_id)) {
                    renderCard(item, conteinerForElementsNewCard)
                    renderButtonTrashCard()

                } else {
                    renderCard(item, conteinerForElementsNewCard)
                }
            })
        })
        .catch((err) => console.log(err))
}
loadingCards()

function createButtonTrashCard() {
    return `<button class="element__trash" type="button"></button>`
}
function renderButtonTrashCard() {
    const conteinerForButtonTrashCard = conteinerForElementsNewCard.querySelector('.element')
    conteinerForButtonTrashCard.insertAdjacentHTML('afterbegin', createButtonTrashCard())

}



















