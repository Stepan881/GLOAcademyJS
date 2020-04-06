"use strict";

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};


let isString = function(n) {
  if (typeof n === 'string') {
    return true;
  } 
  return false;
};

const validateNumber = function (question, answer) {
  let res;
  do {
    res = prompt(question, answer); 
  }
  while(!isNumber(res));  
};

const validateString = function (question, answer) {
  let res;
  do {
    res = prompt(question, answer); 
  }
  while(!isString(res));  
};

let money;
let start = function() {
  do {
    money = prompt('Ваш месячный доход', '100000');
  }
  while(!isNumber(money));
};

start();

let appData = {
  income: {},
  addIncome: {},
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  budget: money,
  asking: function() {
    if (confirm('Есть ли у вас дополнительный заработок?')) {
   
      let itemIncome = validateString('Какой у вас дополнительный заработок?', 'Таксую');
      let cadhIncome = validateNumber('Сколько в месяц вы на этом зарабатываете?', 9000);
      appData.income[itemIncome] = cadhIncome;

    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Интернет, такси, Коммуналка');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let sum = 0,
            message;

        for (let i = 0; i < 2; i++) {
          let message = validateString(`Введите обязательную статью расходов?`, `internet-${i} `);
          let sum = validateNumber('Во сколько это обойдется?', `200${i}`); 
          appData.expenses[message] = sum;
        }  
  },
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 2,

  getExpensesMonth: function () {
    let res = 0;
    for (const key in appData.expenses) {
      res +=appData.expenses[key];
    }
    console.log('Расходы за месяц: ', res);
    return res;
  },

  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function () {
    let res = Math.ceil(appData.mission / appData.budgetMonth);
    if (res > 0) {
      console.log('Цель будет достигнута: ' + res + ' месяцев');
    } else {
      console.log('Цель не будет достигнута');
    }
    return res;
  },
  
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay <= 0) {
      return ('Что то пошло не так');
    }
  },

  getInfoDeposit: function () {
    if (appData.deposit) {
        appData.percentDeposit = validateNumber('Какой годовой процент', 10);
        appData.moneyDeposit = validateNumber('Какая сумма заложена?', 10000);
    }
  },

  calcSavedMoney: function() {
    return appData.budgetMonth * appData.period;
  },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
console.log(appData.getStatusIncome());

console.log("expenses", appData.expenses);
appData.getInfoDeposit();
console.log(`Наша программа включает в себя данные:`);

for (const key in appData) {
  
  console.log(`${key} = ${appData[key]}`);
}


// каждое слово с большой буквы слова разделены запятой и пробелом
let str = appData.addExpenses;
str.forEach((el, i) => {
  let res;
  el = el.trim();
  res = el.replace(el[0], el[0].toUpperCase()); 
  str[i] = res;
});
console.log(str.join(', '));