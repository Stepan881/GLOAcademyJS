"use strict";

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const income = 'фриланс';
const mission = 100000;
const period = 6;

let money;
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Интернет, Такси, Коммуналка');
let deposit = confirm('Есть ли у вас депозит в банке?');

let start = function() {
  money = prompt('Ваш месячный доход', '10000');

  do {
    money = prompt('Ваш месячный доход', '10000');
  }
  while(!isNumber(money));
};
start();

let expenses = [];

function showTypeOf(data) {
  console.log(`${data} : ${typeof data}`);
}

function getExpensesMonth() {

  let sum = 0;

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      expenses[i] = prompt('Введите обязательную статью расходов?', 'Интернет');
    }

    sum += +prompt('Во сколько это обойдется?', '2000');
    do {
      sum += +prompt('Во сколько это обойдется?', '2000');
    }
    while(!isNumber(sum));
    
  }  
  return sum;
}

let expensesAmount = getExpensesMonth();

function getAccumulatedMonth() {
  return money - expensesAmount;
}

let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
  let res = Math.floor(mission / accumulatedMonth);
  if (res > 0) {
    console.log('Цель будет достигнута: ' + res + 'месяцев');
  } else {
    console.log('Цель не будет достигнута');
  }

  return res;
}
getTargetMonth();

let budgetDay = Math.floor(accumulatedMonth / 30);



let getStatusIncome = function () {
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