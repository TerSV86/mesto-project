import { buttonSubmitFormProfile, buttonSubmitFormAddNewCard, buttonSubmitFormAvatar, config } from './data'
import { renderLoading } from '../pages/index'

class Api {
    #baseUrl;
    #headers;
    #getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json()
    }

    constructor(config) {
        this.#baseUrl = config.baseUrl;
        this.#headers = config.headers;
    }

    requestsDataProfile() {
        return fetch(`${this.#baseUrl}/users/me`, {
            headers: this.#headers
        })
            .then((res) => this.#getResponseData(res))
    }

    editProfile({name, profession}) {
        renderLoading(true, buttonSubmitFormProfile)
        return fetch(`${this.#baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.#headers,
            body: JSON.stringify({
                name: `${name}`,
                about: `${profession}`
            })
        })
            .then((res) => this.#getResponseData(res))
    }

    editAvatar({url}) {
        renderLoading(true, buttonSubmitFormAvatar)
        return fetch(`${this.#baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this.#headers,
            body: JSON.stringify({
                avatar: `${url}`
            })
        })
            .then((res) => this.#getResponseData(res))
    }

    async loadingCards() {
        return await fetch(`${this.#baseUrl}/cards`, {
            headers: this.#headers
        })
            .then((res) => this.#getResponseData(res))
    }

    createNewCard(data) {
        renderLoading(true, buttonSubmitFormAddNewCard)
        return fetch(`${this.#baseUrl}/cards`, {
            method: "POST",
            body: JSON.stringify({
                name: data.name,
                link: data.link
            }),
            headers: this.#headers
        })
            .then((res) => this.#getResponseData(res))
    }

    delCard(card_id) {
        return fetch(`${this.#baseUrl}/cards/${card_id}`, {
            method: "DELETE",
            headers: this.#headers
        })
            .then((res) => this.#getResponseData(res))
    }

    putLikesServer(card_id) {

        return fetch(`${this.#baseUrl}/cards/likes/${card_id}`, {
            method: "PUT",
            headers: this.#headers
        })
            .then((res) => this.#getResponseData(res))
    }

    delLikesServer(card_id) {
        return fetch(`${this.#baseUrl}/cards/likes/${card_id}`, {
            method: "DELETE",
            headers: this.#headers
        })
            .then((res) => this.#getResponseData(res))
    }
}

export default new Api(config);