//  Добрый день (утро, вечер, ночь в зависимости от времени суток)
//  Сегодня: Понедельник
//  Текущее время:12:05:15 PM
//  До нового года осталось 175 дней
 

const newDays = document.querySelector('.days');
const newDay = document.querySelector('.day');
const newTime = document.querySelector('.time');
const newYear = document.querySelector('.new-year');
let newDate = new Date();

let days = newDate.getHours();
if (days >= 5 && days < 12) {
  newDays.textContent = "Доброе утро";
} else if (days >= 12 && days < 18) { 
  newDays.textContent = "Добрый день";
} else if (days >= 18 && days < 24) {
  newDays.textContent = "Добрый вечер";
} else if (days >= 0 && days < 5) {
  newDays.textContent = "Доброй ночи";
}

const weekday = new Array(7);
  weekday[0]="Воскресенье";
  weekday[1]="Понедельник";
  weekday[2]="Вторник";
  weekday[3]="Среда";
  weekday[4]="Четверг";
  weekday[5]="Пятница";
  weekday[6]="Суббота";
newDay.textContent = `Сегодня ${weekday[newDate.getDay()]}`;

function format(data) {
  if (data < 10) {
    data = '0' + data;
  }
  return data;
}
newTime.textContent = `Текущее время: ${format(newDate.getHours())}:${format(newDate.getMinutes())}:${format(newDate.getSeconds())}`;




let dateStop = new Date('01, 01, 2021').getTime();
let dateNow = new Date().getTime();
let timeRemaining = (dateStop - dateNow) / 1000;
let res =  Math.floor(timeRemaining / 60 / 60 / 24);
newYear.textContent = `До нового года осталось ${res} дней`;