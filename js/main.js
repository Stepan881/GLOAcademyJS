"use strict";

const startBtn = document.getElementById('start');
const btnPlusIncomeAdd = document.getElementsByTagName('button')[0];
const btnPlusExpensesAdd = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItems = document.querySelectorAll('.additional_income-item');

const budgeMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.querySelector('.budget_day-value');
const expensesMmonthValue = document.querySelector('.expenses_month-value');
const additionalIncomeValue = document.querySelector('.additional_income-value');
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const range = document.querySelector('.range');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
let incomeItems = document.querySelectorAll('.income-items');

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let isString = function(n) {
  let num =  Number(n);
  if (typeof n === 'string' && isNaN(num)) {
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
  return res; 
};
const validateString = function (question, answer) {
  let res;
  do {
    res = prompt(question, answer); 
  }
  while(!isString(res)); 
  return res; 
};

function inputRefresh() {
  let inputString = document.querySelectorAll('[placeholder="Наименование"]');
  let inputNumber = document.querySelectorAll('[placeholder="Сумма"]');

  inputString.forEach(el => {
    el.addEventListener('input',()=> {
      el.value = el.value.replace(/[^а-яА-Я ,.!]/,'');
    });
  });
  inputNumber.forEach(el => {
    el.addEventListener('input',()=> {
      el.value = el.value.replace(/[^0-9]/,'');
    });
  });
}
inputRefresh();

let appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function() {
    if (salaryAmount.value === '') {
     startBtn.disabled = true;
      return;
    }
    appData.budget = +salaryAmount.value;

    appData.getExpenses(); 
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },
  showResult: function() {
    budgeMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMmonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome;
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());

    incomePeriodValue.value = appData.calcPeriodMoney() ;

  },
  addExpensesBlock: function() {    
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      btnPlusExpensesAdd.style.display = 'none';
    }
    inputRefresh();
  },  
  getExpenses: function() {
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  addIncomeBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      btnPlusIncomeAdd.style.display = 'none';
    }
        inputRefresh();
  },
  getAddIncome: function() {
    appData.addIncome = [];
    additionalIncomeItems.forEach((el) => {
      let elValue = el.value.trim();
      if (elValue !== '') {
        appData.addIncome.push(elValue);
      }
    });
  },
  getAddExpenses: function() {
    appData.addExpenses = [];
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(el => {
      el = el.trim();
      if (el !== '') {
        appData.addExpenses.push(el);
      }
    });
  },
  getIncome: function() {
    incomeItems.forEach((el) => {
      let itemIncome = el.querySelector('.income-title').value;
      let cashIncome = el.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });


    // if (confirm('Есть ли у вас дополнительный заработок?')) {
    //   let itemIncome = validateString('Какой у вас дополнительный заработок?', 'Таксую');
    //   let cadhIncome = validateNumber('Сколько в месяц вы на этом зарабатываете?', 10000);
    //   appData.income[itemIncome] = cadhIncome;
    // }

    // for (let key in appData.income) {
    //   appData.incomeMonth += +appData.income[key];
    // }
  },
  getExpensesMonth: function() {
    let res = 0;   
    for (let key in appData.expenses) {
      res += +appData.expenses[key];
    }
    appData.expensesMonth = res;
  },
  getBudget: function(){
    appData.budgetMonth = (appData.budget + appData.incomeMonth) - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function() {
    
    return targetAmount.value / appData.budgetMonth;
    // if (res > 0) {
    //   console.log('Цель будет достигнута: ' + res + ' месяцев');
    // } else {
    //   console.log('Цель не будет достигнута');
    // }
    // return res;
  },
  getStatusIncome: function() {
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
  getInfoDeposit: function() {
    if (appData.deposit) {
        appData.percentDeposit = validateNumber('Какой годовой процент', 10);
        appData.moneyDeposit = validateNumber('Какая сумма заложена?', 10000);
    }
  },
  calcPeriodMoney: function() {
    return +appData.budgetMonth * +periodSelect.value;
  },
  changlePeriodSelect: function() {
    periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = appData.calcPeriodMoney();
  },
};


startBtn.addEventListener('click', appData.start);

btnPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock);
btnPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('change', appData.changlePeriodSelect);
salaryAmount.addEventListener('input', () => {
  if (salaryAmount.value !== '') {
    startBtn.disabled = false;    
   } else {
    startBtn.disabled = true;    
   }

});

