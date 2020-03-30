let money = 100;
const income = 'фриланс';
let addExpenses = 'Интернет, Такси, Коммуналка';
let deposit = true;
const mission = 100000;
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

// lesson3

money = prompt('Ваш месячный доход', '10000');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Интернет, Такси, Коммуналка');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?', 'Интернет');
let amount1 =  prompt('Во сколько это обойдется?', '1000');
let expenses2 = prompt('Введите обязательную статью расходов?', 'Такси');
let amount2 = prompt('Во сколько это обойдется?', '2000');

let budgetMonth = parseInt(money - (parseInt(amount1) + parseInt(amount2)));
console.log('Бюджет на месяц: ', budgetMonth);

console.log('Цель будет достигната за: ' + Math.ceil(mission / budgetMonth) + ' месяца');

console.log('Бюджет на месяц: ' + budgetMonth);
budgetDay = Math.floor(budgetMonth / 30)
console.log('Бюджет на день: ' + budgetDay);

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay < 600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay <= 0) {
  console.log('Что то пошло не так');
}