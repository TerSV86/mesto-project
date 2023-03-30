/* Записываем в переменную все лайки */
const likes = document.querySelectorAll('.element__like');

/* С помощью forEach перебираем лайки и ловим с помощью addEventListener лайк по которому кликнули, а затем добавляем или убираем класс у элемента  */
likes.forEach((like) => {
    like.addEventListener('click', () => {
        like.classList.toggle('element__like_active');
    });
});


