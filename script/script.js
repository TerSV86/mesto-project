/* Реализация возможности ставить лайк карточкам */
/* Записываем в переменную все лайки */
const likes = document.querySelectorAll('.element__like');

/* С помощью forEach перебираем лайки и ловим с помощью addEventListener лайк по которому кликнули, а затем добавляем или убираем класс у элемента  */
/* likes.forEach((like) => {
    like.addEventListener('click', () => {
        like.classList.toggle('element__like_active');
    });
});
 */
function like() {
    likes.forEach((like) => {

        like.addEventListener('click', (likeClick) => {
            likeClick.target.classList.toggle('element__like_active');
        });
    });
};
like();



/*Реализация открытия и закрытия попапа Редактирования */

const formElement = document.querySelector('.form');
/* console.log(formElement); */
const nameInput = formElement.querySelector('.form__item_el_name');
/* console.log(nameInput); */
const jobInput = formElement.querySelector('.form__item_el_profession');


const buttonSubmit = document.querySelector('.form__handlers');
function handlerFormSubmit(evt) {
    evt.preventDefault();

    const profileTitle = document.querySelector('.profile__title');
    const profileSubtitle = document.querySelector('.profile__subtitle');

    (nameInput.value === '') ? profileTitle.textContent : profileTitle.textContent = nameInput.value;

    (jobInput.value === '') ? profileSubtitle.textContent : profileSubtitle.textContent = jobInput.value;

    const popupEdit = document.querySelector('.popup-edit').classList.remove('popup-edit_opened');

}

buttonSubmit.addEventListener('click', handlerFormSubmit);

/* Открывает форму для редактирования профиля */
const buttonEdit = document.querySelector('.profile__edit-button');

function openPopupEdit() {
    document.querySelector('.popup-edit').classList.add('popup-edit_opened');
}

buttonEdit.addEventListener('click', openPopupEdit);


/* buttonEdit.addEventListener('click', () => {
    document.querySelector('.popup-edit').classList.add('popup-edit_opened');
})
 */
/* Закрытие формы по крестику */
/* const buttonClose = document.querySelector('.form__close');

buttonClose.addEventListener('click', () => {
    document.querySelector('.popup-edit').classList.remove('popup-edit_opened');
}) */



/*Открытие формы добавления картинок*/
const buttonAdd = document.querySelector('.profile__add-button');

function openPopupAdd() {
    document.querySelector('.popup-add').classList.add('popup-add_opened');
}

buttonAdd.addEventListener('click', openPopupAdd);


/* buttonAdd.addEventListener('click', () => {
    document.querySelector('.popup-add').classList.toggle('popup-add_opened');
}); */


/* Закрытие всех формы  через крестик*/

const buttonsClose = document.querySelectorAll('.form__close');
const popupPicClose = document.querySelector('.popup-pic__close');

const closeArr = Array.from(buttonsClose).concat(popupPicClose)

function closePopup() {
    closeArr.forEach((buttonClose) => {
        buttonClose.addEventListener('click', () => {
            document.querySelector('.popup-edit').classList.remove('popup-edit_opened');// попробовать использовать map
            document.querySelector('.popup-add').classList.remove('popup-add_opened');
            document.querySelector('.popup-pic').classList.remove('popup-pic_opened'); //Или кнопку делать блоком или для popup-pic менять на .button close
        });
    });
};
closePopup();





/* Добавление карточек */

const namePicInput = document.querySelector('.form__item_el_name-pic');
const linkPicInput = document.querySelector('.form__item_el_link-pic');
const addCardTemplate = document.querySelector('#addCard').content;
const popupAdd = document.querySelector('.popup-add');
const buttonCreate = popupAdd.querySelector('.form__handlers');
const elements = document.querySelector('.elements');

function handlersFormAdd(evt) {
    evt.preventDefault();
    const newCard = addCardTemplate.querySelector('.element').cloneNode(true);
    newCard.querySelector('.element__mask-group').src = linkPicInput.value;
    newCard.querySelector('.element__mask-group').alt = namePicInput.value;
    newCard.querySelector('.element__title').textContent = namePicInput.value;
    elements.prepend(newCard);
    linkPicInput.value = '';
    namePicInput.value = '';
    document.querySelector('.popup-add').classList.remove('popup-add_opened');
    document.querySelector('.element__like').addEventListener('click', (evn) => {
        evn.target.classList.toggle('element__like_active');
    });
    removeCards();
    openPopup();
}

buttonCreate.addEventListener('click', handlersFormAdd)


/* Реализация попапа с картинкой */



const popupPic = document.querySelector('.popup-pic');

function openPopup() {
    const elemsMask = document.querySelectorAll('.element__mask-group');
    elemsMask.forEach((element) => {
        element.addEventListener('click', () => {
            const cards = element.parentElement;
            let elemSrc = element.src;
            let elemTitle = cards.querySelector('.element__title').textContent;
            popupPic.classList.add('popup-pic_opened');
            popupPic.querySelector('.popup-pic__img').setAttribute('src', elemSrc);
            popupPic.querySelector('.popup-pic__img').setAttribute('alt', elemTitle);
            popupPic.querySelector('.popup-pic__title').textContent = elemTitle;
        });
    });
};
openPopup();


/* Шесть карточек из коробки */

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function replacerInitialCards() {
    const namesArr = [];
    const linksArr = [];

    function replacerInitialLink() {
        let elementLinks = document.querySelectorAll('.element__mask-group');
        initialCards.forEach((card) => {
            linksArr.push(card.link);
        });

        for (let i = 0; i < linksArr.length; i++) {

            elementLinks[i].src = linksArr[i];
        };
        return elementLinks;
    };
    replacerInitialLink();

    function replacerInitialTitle() {

        let elementNames = document.querySelectorAll('.element__title');

        initialCards.forEach((card) => {
            namesArr.push(card.name);
        });

        for (let i = 0; i < namesArr.length; i++) {

            elementNames[i].textContent = namesArr[i];
        };
        return elementNames;
    }
    replacerInitialTitle();
};
replacerInitialCards()


/* Удаление карточки */



function removeCards() {
    const elementsTrash = document.querySelectorAll('.element__trash');
    elementsTrash.forEach((elTrash) => {
        elTrash.addEventListener('click', () => {

            elTrash.parentElement.remove();
        });
    });
};
removeCards();