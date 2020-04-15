"use strict";

const startBtn = document.getElementById('start');
const cancelBtn = document.getElementById('cancel');
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
function disabledInputText() {
  let inpitText = document.querySelectorAll('[type="text"]:not(.result-total)');

  inpitText.forEach(element => {
    element.disabled = true;
  });
  startBtn.style.display = 'none';
  cancelBtn.style.display = 'block';
}
class AppData {
  constructor(income = {}, incomeMonth = 0, addIncome = [], expenses = {}, addExpenses = [], deposit = false, percentDeposit = 0, moneyDeposit = 0, budget = 0, budgetDay = 0, budgetMonth = 0, expensesMonth = 0) {
    this.income = income;
    this.incomeMonth = incomeMonth;
    this.addIncome = addIncome;
    this.expenses = expenses;
    this.addExpenses = addExpenses;
    this.deposit = deposit;
    this.percentDeposit = percentDeposit;
    this.moneyDeposit = moneyDeposit;
    this.budget = budget;
    this.budgetDay = budgetDay;
    this.budgetMonth = budgetMonth;
    this.expensesMonth = expensesMonth;
  } 

  start () {
    if (salaryAmount.value === '') {
    startBtn.disabled = true;
      return;
    }
    this.budget = +salaryAmount.value;
    

    this.getExpInc();

    this.getExpensesMonth();  
    this.getBudget();

    this.getAddExpInc();

    this.showResult();
    disabledInputText();
  }

  showResult () {
    incomePeriodValue.value = this.calcPeriodMoney() ;

    budgeMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMmonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome;
    targetMonthValue.value = Math.ceil(this.getTargetMonth());

    incomePeriodValue.value = this.calcPeriodMoney() ;
  }

  getExpenses () {
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  }

  getIncome () {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
      }
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getExpInc () {
    const count = (item) => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = itemAmount;
      }
    };

    expensesItems.forEach(count);
    incomeItems.forEach(count);
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  addExpIncBlock () {    
    let title = '';
    let amount = '';
    let cloneIncomeItem = '';
    let items = '';
    let btn = '';
    let expenses = '';

    if (this.classList.contains('income_add')) {
      cloneIncomeItem = incomeItems[0].cloneNode(true);
      title = '.income-title';
      amount = '.income-amount';
      items = incomeItems;
      btn = btnPlusIncomeAdd;
      expenses = '.income-items';
    } else if (this.classList.contains('expenses_add')) {
      cloneIncomeItem = expensesItems[0].cloneNode(true);
      title = '.expenses-title';
      amount = '.expenses-amount';
      items = expensesItems;
      btn = btnPlusExpensesAdd;
      expenses = '.expenses-items';
    }
    cloneIncomeItem.querySelector(title).value = '';
    cloneIncomeItem.querySelector(amount).value = '';
    items[0].parentNode.insertBefore(cloneIncomeItem, btn);
    items = document.querySelectorAll(expenses);
    if (items.length === 3) {
      btn.style.display = 'none';
    }
      inputRefresh();
  }

  getAddExpInc () {
    this.addIncome = [];    
    additionalIncomeItems.forEach((el) => {
      let elValue = el.value.trim();
      if (elValue !== '') {
        this.addIncome.push(elValue);
      }
    });  

    this.addExpenses = [];
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(el => {
      el = el.trim();
      if (el !== '') {
        this.addExpenses.push(el);
      }
    });
  }

  getExpensesMonth () {
    let res = 0;   
    for (let key in this.expenses) {
      res += +this.expenses[key];
    }
    this.expensesMonth = res;
  }

  getBudget (){
    this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth () {
    
    return targetAmount.value / this.budgetMonth;
  }

  getStatusIncome () {
    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay <= 0) {
      return ('Что то пошло не так');
    }
  }

  getInfoDeposit () {
    if (this.deposit) {
      this.percentDeposit = validateNumber('Какой годовой процент', 10);
      this.moneyDeposit = validateNumber('Какая сумма заложена?', 10000);
    }
  }

  calcPeriodMoney () {
    return (+this.budgetMonth) * +periodSelect.value;
  }

  changlePeriodSelect () {
    periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = this.calcPeriodMoney();
  }

  reset () {
    let inputText = document.querySelectorAll('[type="text"]:not(.result-total)');
    let inputAll = document.querySelectorAll('input:not(.period-select)');
    startBtn.disabled = false;   

    inputAll.forEach(element => {
      element.value = '';    
    });

    inputText.forEach(element => {
      element.disabled = false;
    });

    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;

    startBtn.style.display = 'block';
    cancelBtn.style.display = 'none';
    periodSelect.value = 1;
    periodAmount.textContent = periodSelect.value;
    incomeItems.forEach((element, i) => {  
      if (i !== 0) {
        element.remove();
      }
    });
    btnPlusIncomeAdd.style.display = 'block';

    expensesItems.forEach((element, i) => {  
      if (i !== 0) {
        element.remove();
      }
    });
    btnPlusExpensesAdd.style.display = 'block';
  }

  eventListeners (evt) {
    startBtn.addEventListener('click', this.start.bind(this));
    cancelBtn.addEventListener('click', this.reset.bind(this));

    btnPlusIncomeAdd.addEventListener('click', this.addExpIncBlock);
    btnPlusExpensesAdd.addEventListener('click', this.addExpIncBlock);

    periodSelect.addEventListener('input', this.changlePeriodSelect.bind(this));
    salaryAmount.addEventListener('input', () => {
      if (salaryAmount.value !== '') {
        startBtn.disabled = false;    
      } else {
        startBtn.disabled = true;    
      }
    
    });
  }

}
const appData = new AppData();
appData.eventListeners();
console.log(appData);
