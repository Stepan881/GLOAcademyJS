const money = 100;
const income = 'фриланс';
const addExpenses = 'Интернет, Такси, Коммуналка';
const deposit = true;
const mission = 1000;
const period = 6;

console.log('money: ', typeof money);
console.log('income: ',typeof income);
console.log('deposit: ',typeof deposit);

console.log('addExpenses: ', addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay;

budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);