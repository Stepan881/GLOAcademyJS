"use strict";

let money = 100;
const income = 'фриланс';
let addExpenses = 'Интернет, Такси, Коммуналка';
let deposit = true;
const mission = 100000;
const period = 6;

money = prompt('Ваш месячный доход', '10000');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Интернет, Такси, Коммуналка');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?', 'Интернет');
let amount1 =  prompt('Во сколько это обойдется?', '1000');
let expenses2 = prompt('Введите обязательную статью расходов?', 'Такси');
let amount2 = prompt('Во сколько это обойдется?', '2000');


function getExpensesMonth(sum1, sum2) {
  return parseInt(sum1) + parseInt(sum2);
}

function getAccumulatedMonth() {
  return money - getExpensesMonth(amount1, amount2);
}

let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth(mission, accumulatedMonth) {
  return Math.floor(mission / accumulatedMonth);
}

let budgetDay = Math.floor(accumulatedMonth / 30);

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay < 600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay <= 0) {
  console.log('Что то пошло не так');
}