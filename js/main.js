"use strict";

const income = 'фриланс';
const mission = 100000;
const period = 6;

let money = prompt('Ваш месячный доход', '10000');
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Интернет, Такси, Коммуналка');
let deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?', 'Интернет');
let amount1 = prompt('Во сколько это обойдется?', '1000');
let expenses2 = prompt('Введите обязательную статью расходов?', 'Такси');
let amount2 = prompt('Во сколько это обойдется?', '2000');


function showTypeOf(data) {
  console.log(`${data} : ${typeof data}`);
}

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

let getStatusIncome = function() {
  if (budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (budgetDay >= 600 && budgetDay < 1200) {
    return ('У вас средний уровень дохода');
  } else if (budgetDay < 600) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else if (budgetDay <= 0) {
    return ('Что то пошло не так');
  }
}
console.log(getStatusIncome());