"use strict";

const startBtn = document.getElementById('start');
const cancelBtn = document.getElementById('cancel');
const btnPlusIncomeAdd = document.getElementsByTagName('button')[0];
const btnPlusExpensesAdd = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');

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
const inputPercent = document.querySelector('[placeholder="Процент"]');

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

  inputPercent.addEventListener('input',()=> {
    inputPercent.value = inputPercent.value.replace(/[^0-9]/,'');
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
  constructor() {
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
  } 

  start () {
  

    if (salaryAmount.value === '') {
    startBtn.disabled = true;
      return;
    }

    if (Number(inputPercent.value) < 0 || Number(inputPercent.value) > 100) {
      alert('Введите корректное значение в поле проценты');
      return;
    }


    this.budget = +salaryAmount.value;
    

    this.getExpInc();

    this.getExpensesMonth(); 
    this.getInfoDeposit();
    this.getBudget();

    this.getAddExpInc();

    this.showResult();
    disabledInputText();

    this.addStoCook();
  }

  removeStoCook() {

    const day = -1;

    this.setCookie('budgeMonthValue', budgeMonthValue.value, day);
    this.setCookie('budgetDayValue', budgetDayValue.value, day);
    this.setCookie('expensesMmonthValue', expensesMmonthValue.value, day);
    this.setCookie('additionalIncomeItems', additionalIncomeItems.value, day);
    this.setCookie('additionalIncomeValue', additionalIncomeValue.value, day);
    this.setCookie('additionalExpensesValue', additionalExpensesValue.value, day);
    this.setCookie('incomePeriodValue', incomePeriodValue.value, day);
    this.setCookie('targetMonthValue', targetMonthValue.value, day);
    this.setCookie('isLoad', 'true', day);

    localStorage.clear();
  }

  addStoCook() {

    this.setCookie('budgeMonthValue', budgeMonthValue.value);
    this.setCookie('budgetDayValue', budgetDayValue.value);
    this.setCookie('expensesMmonthValue', expensesMmonthValue.value);
    this.setCookie('additionalIncomeItems', additionalIncomeItems.value);
    this.setCookie('additionalIncomeValue', additionalIncomeValue.value);
    this.setCookie('additionalExpensesValue', additionalExpensesValue.value);
    this.setCookie('incomePeriodValue', incomePeriodValue.value);
    this.setCookie('targetMonthValue', targetMonthValue.value);
    this.setCookie('isLoad', 'true');

    localStorage.setItem('budgeMonthValue', budgeMonthValue.value);
    localStorage.setItem('budgetDayValue', budgetDayValue.value);
    localStorage.setItem('expensesMmonthValue', expensesMmonthValue.value);
    localStorage.setItem('additionalIncomeItems', additionalIncomeItems.value);
    localStorage.setItem('additionalIncomeValue', additionalIncomeValue.value);
    localStorage.setItem('additionalExpensesValue', additionalExpensesValue.value);
    localStorage.setItem('incomePeriodValue', incomePeriodValue.value);
    localStorage.setItem('targetMonthValue', targetMonthValue.value);
    localStorage.setItem('isLoad', true);
  }

  setCookie(cname, cvalue, exdays = 1) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  load() {
    const arr = document.cookie.split(';');
    const newCookie = {};
    arr.forEach(el => {
      let item = el.trim().split('=');
      newCookie[item[0]] =  item[1];  
      if (localStorage.getItem(item[0]) !== item[1]) {
        this.removeStoCook();
        return;
      }
    });

    if (localStorage.length !== 0) {
      budgeMonthValue.value = localStorage.getItem('budgeMonthValue');
      budgetDayValue.value = localStorage.getItem('budgetDayValue');
      expensesMmonthValue.value = localStorage.getItem('expensesMmonthValue');
      additionalIncomeItems.value = localStorage.getItem('additionalIncomeItems');
      additionalIncomeValue.value = localStorage.getItem('additionalIncomeValue');
      additionalExpensesValue.value = localStorage.getItem('additionalExpensesValue');
      incomePeriodValue.value = localStorage.getItem('incomePeriodValue');
      targetMonthValue.value = localStorage.getItem('targetMonthValue');
      disabledInputText();
    }

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
    const monthDeposit = +this.moneyDeposit + (+this.percentDeposit / 100);
    this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth + monthDeposit;
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

  calcPeriodMoney () {
    return (+this.budgetMonth) * +periodSelect.value;
  }

  changlePeriodSelect () {
    periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = this.calcPeriodMoney();
  }

  reset () {
    this.removeStoCook();

    let inputText = document.querySelectorAll('[type="text"]:not(.result-total)');
    let inputAll = document.querySelectorAll('input:not(.period-select)');
    startBtn.disabled = false;   

    
    inputAll.forEach(element => {
      element.value = '';    
    });

    inputText.forEach(element => {
      element.disabled = false;
    });
    depositPercent.style.display = 'none';
    Object.assign(this, new this.constructor());

    startBtn.style.display = 'block';
    cancelBtn.style.display = 'none';
    periodSelect.value = 1;
    periodAmount.textContent = periodSelect.value;

    incomeItems = document.querySelectorAll('.income-items');
    expensesItems = document.querySelectorAll('.expenses-items');
    
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

    depositCheck.checked = false;
    this.depositHandler();
    
  }

  getInfoDeposit () {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }
  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
      
    } else {
      depositPercent.value = valueSelect;
      depositPercent.style.display = 'none';
    }


  }
  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      this.deposit = false;
      depositPercent.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      depositPercent.value = '';
      depositBank.removeEventListener('change', this.changePercent);
    }
  }

  eventListeners (evt) {
    startBtn.addEventListener('click', this.start.bind(this));
    cancelBtn.addEventListener('click', this.reset.bind(this));

    btnPlusIncomeAdd.addEventListener('click', this.addExpIncBlock);
    btnPlusExpensesAdd.addEventListener('click', this.addExpIncBlock);

    depositCheck.addEventListener('change', this.depositHandler.bind(this));

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
appData.load();
