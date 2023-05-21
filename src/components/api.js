

import { buttonSubmitFormProfile, buttonSubmitFormAddNewCard, buttonSubmitFormAvatar, config } from './data'
import {renderLoading} from '../pages/index'

function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json()
}

function requestsDataProfile() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then((res) => getResponseData(res))
}

function editProfile(name, about) {
    renderLoading(true, buttonSubmitFormProfile)
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: `${name}`,
            about: `${about}`
        })
    })
        .then((res) => getResponseData(res))
}


function editAvatar(url) {
    renderLoading(true, buttonSubmitFormAvatar)
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: `${url}`
        })
    })
        .then((res) => getResponseData(res))

}


async function loadingCards() {
    return await fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then((res) => getResponseData(res))

}

function createNewCard(data) {   
    renderLoading(true, buttonSubmitFormAddNewCard)
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        body: JSON.stringify({
            name: data.name,
            link: data.link
        }),
        headers: config.headers
    })
        .then((res) => getResponseData(res))
}


function delCard(card_id) {
    
    return fetch(`${config.baseUrl}/cards/${card_id}`, {
        method: "DELETE",
        headers: config.headers
    })
        .then((res) => getResponseData(res))
        
}



function putLikesServer(card_id) {
    
    return fetch(`${config.baseUrl}/cards/likes/${card_id}`, {
        method: "PUT",
        headers: config.headers
    })
        .then((res) => getResponseData(res))
        

}



function delLikesServer(card_id) {

    return fetch(`${config.baseUrl}/cards/likes/${card_id}`, {
        method: "DELETE",
        headers: config.headers
    })
        .then((res) => getResponseData(res))        
}




export { createNewCard, editProfile, editAvatar, delCard, requestsDataProfile, putLikesServer, delLikesServer, loadingCards, }
