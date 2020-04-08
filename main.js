'use strict';

//Восстановить порядок книг.
const books = document.querySelectorAll('.book');
books[0].before(books[1]);
books[5].after(books[2]);
books[3].before(books[4]);

//Заменить картинку заднего фона на другую из папки image
const body = document.querySelector('body');
body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

//Исправить заголовок в книге 3
const headBookObject = books[4].querySelector('a');
headBookObject.textContent = 'Книга 3. this и Прототипы Объектов';

//Удалить рекламу со страницы
const banner = document.querySelector('.adv');
banner.remove();

//Восстановить порядок глав во второй и пятой книге 
const listBookTwo = books[0].querySelectorAll('li');
listBookTwo[3].after(listBookTwo[6]);
listBookTwo[6].after(listBookTwo[8]);
listBookTwo[9].after(listBookTwo[2]);

const listBookFive = books[5].querySelectorAll('li');
listBookFive[1].after(listBookFive[9]);
listBookFive[4].after(listBookFive[2]);
listBookFive[7].after(listBookFive[5]);

// в шестой книге добавить главу “Глава 8: За пределами ES6”
const listBookSix = books[2].querySelector('ul');
const itemBookSix = listBookSix.querySelectorAll('li');

const newEl = document.createElement('li');
newEl.textContent = 'Глава 8: За пределами ES6';
itemBookSix[8].insertAdjacentElement('beforeend', newEl);