
let startBtn = document.getElementById('start');
console.log(startBtn);

    budgetValue = document.getElementsByClassName('budget-value') [0];
    dayBudgetValue = document.getElementsByClassName('daybudget-value') [0];
    levelValue = document.getElementsByClassName('level-value') [0];
    expensesValue = document.getElementsByClassName('expenses-value') [0];
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value') [0];
    incomeValue = document.getElementsByClassName('income-value') [0];
    monthSavingsValue = document.getElementsByClassName('monthsavings-value') [0];
    yearSavingsValue = document.getElementsByClassName('yearsavings-value') [0];
  
  
    expensesItem = document.getElementsByClassName('expenses-item');
    console.log(expensesItem);

    expensesBtn = document.getElementsByTagName('button') [0];
    console.log(expensesBtn);
    optionalExpensesBtn = document.getElementsByTagName('button') [1];
    console.log(optionalExpensesBtn);
    countBtn = document.getElementsByTagName('button') [2] ;
    console.log(countBtn);

    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item');
    console.log(optionalExpensesItem);

    IncomeItem = document.querySelector('.choose-income');
    checkSavings = document.querySelector('#savings');
    sumValue = document.querySelector('#sum');
    percentValue = document.querySelector('#percent');
    console.log(percentValue);
    yearValue = document.querySelector('.year-value');
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

    let money,time;


startBtn.addEventListener('click',function() {
    time = prompt("Введите дату в формате YYYY-MM-DD");
    money = +prompt("Ваш бюджет на месяц?");

   while(isNaN(money) || money == "" || money == null) {
    money = +prompt("Ваш бюджет на месяц?"); // мы будем показывать это сообщение "ваш бюджет на месяц"  
                                             //пока будут выполняться условия в цикле
                                            // пользователь введет не число - aaa , отправит пустую строку, и кликнет отмена

   }
    appData.budget = money;   // Бюджет который указал пользователь ,зафиксировали в нашем объекте
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value =  new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});


expensesBtn.addEventListener('click',function(){
let sum = 0; // Собирает ценники которые ввёл пользователь

for (let i = 0; i < expensesItem.length; i++) {
    let a = expensesItem[i].value , // Наименование расхода
        b = expensesItem[++i].value ; // Цена

        if ( (typeof (a)) === 'string' && (a != '' && b != '' && a.length < 50)) {
            console.log("done");
            appData.expenses[a] = b;
            sum += +b; // Данные в виде числа
        } else {
          i--
        }
    }
    expensesValue.textContent = sum;
});




optionalExpensesBtn.addEventListener('click',function() {

    for (let i = 0; i < optionalExpensesItem.length; i++){
        let questionOptExpenses = optionalExpensesItem[i].value;
        appData.optionalexpenses[i] = questionOptExpenses;
        console.log(appData.optionalexpenses);
        optionalExpensesValue.textContent += appData.optionalexpenses[i] + ' ';
    }
});


countBtn.addEventListener('click',function() {
    appData.moneyPerDay = (appData.budget/30).toFixed();  // toFixed - метод,преобразовывает значение
    // следует запомнить что , toFixed меняет нашу переменную, возвращает строковое значение!!!
    
});







let appData = {
    budget: money,
    timeData: time,
    expenses: {},
   optionalexpenses : {},
   income:[],
   savings:true,
   chooseExpenses: function() {
    
    },
     detectDayBudget: function() {
 
    alert ("Бюджет на 1 день составляет: " + appData.moneyPerDay + " руб.");
   },
   detectLevel: function() {
    if (appData.moneyPerDay < 100) {
        console.log("Это минимальный уровень достатка");
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000 ) {
        console.log("Это средний уровень достатка");
    } else if (appData.moneyPerDay > 2000){
        console.log("Это высокий уровень достатка");
    } else {
        console.log("Произошла ошибка");
    }
   },
   checkSavings: function() {
    if (appData.savings == true) {
        let save = +prompt("Какова сумма накоплений?"),
        percent = +prompt("Под какой процент?");

        appData.mothIncome = save/100/12*percent; // рассчитываем прибыль за месяц
        alert("Доход в месяц с вашего депозита: " + appData.mothIncome);
    }
   },
   chooseOptExpenses: function() {
   },
   chooseIncome: function() {

    let items = prompt("Что принесет дополнительный доход? (Перечислите через запятую)", "");

    if (typeof(items) != "string" || items == "" || typeof(items) == null) {
        console.log("Вы ввели некорректные данные или не ввели их вовсе");
    } else {
        appData.income = items.split(", ");
        appData.income.push(prompt("Может что-то еще?"));
        appData.income.sort();
    }

    appData.income.forEach (function (itemmassive, i) {
        alert("Способы доп. заработка: " + (i+1) + " - " + itemmassive);
    });
   }
}


for (let key in appData){
 console.log("Наша программа включает в себя данные: " + key + " - " + appData[key]);
}

