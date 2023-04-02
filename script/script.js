/* Реализация возможности ставить лайк карточкам */
/* Записываем в переменную все лайки */
const likes = document.querySelectorAll('.element__like');

/* С помощью forEach перебираем лайки и ловим с помощью addEventListener лайк по которому кликнули, а затем добавляем или убираем класс у элемента  */
likes.forEach((like) => {
    like.addEventListener('click', () => {
        like.classList.toggle('element__like_active');
    });
});


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

    if (nameInput.value === '') {
        profileTitle.textContent;
    } else {
        profileTitle.textContent = nameInput.value;
    }

    if (jobInput.value === '') {
        profileSubtitle.textContent;
    } else {
        profileSubtitle.textContent = jobInput.value;
    }

    const popupEdit = document.querySelector('.popup-edit').classList.remove('popup-edit_opened');

}

buttonSubmit.addEventListener('click', handlerFormSubmit);

/* Открывает форму для редактирования профиля */
const buttonEdit = document.querySelector('.profile__edit-button');

buttonEdit.addEventListener('click', () => {
    document.querySelector('.popup-edit').classList.add('popup-edit_opened');
})

/* Закрытие формы по крестику */
/* const buttonClose = document.querySelector('.form__close');

buttonClose.addEventListener('click', () => {
    document.querySelector('.popup-edit').classList.remove('popup-edit_opened');
}) */



/*Открытие формы добавления картинок*/
const buttonAdd = document.querySelector('.profile__add-button');


buttonAdd.addEventListener('click', () => {
    document.querySelector('.popup-add').classList.toggle('popup-add_opened');
});


/* Закрытие всех формы  через крестик*/

const buttonsClose = document.querySelectorAll('.form__close');

buttonsClose.forEach((buttonClose) => {
    buttonClose.addEventListener('click', () => {
        document.querySelector('.popup-edit').classList.remove('popup-edit_opened');
        document.querySelector('.popup-add').classList.remove('popup-add_opened');
    })
})


/* Добавление карточек */

const namePicInput = document.querySelector('.form__item_el_name-pic');
console.log(namePicInput.value);
console.log(namePicInput.value);