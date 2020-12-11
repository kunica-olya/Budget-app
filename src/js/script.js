
let startBtn = document.getElementById('start');

budgetValue = document.getElementsByClassName('budget-value')[0];
dayBudgetValue = document.getElementsByClassName('daybudget-value')[0];
levelValue = document.getElementsByClassName('level-value')[0];
expensesValue = document.getElementsByClassName('expenses-value')[0];
optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0];
incomeValue = document.getElementsByClassName('income-value')[0];
monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0];
yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0];

expensesItem = document.getElementsByClassName('expenses-item');
expensesBtn = document.getElementsByTagName('button')[0];
optionalExpensesBtn = document.getElementsByTagName('button')[1];
countBtn = document.getElementsByTagName('button')[2];

optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item');
incomeItem = document.querySelector('.choose-income');
checkSavings = document.querySelector('#savings');
sumValue = document.querySelector('#sum');
percentValue = document.querySelector('#percent');
yearValue = document.querySelector('.year-value');
monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

expensesBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBtn.disabled = true;


startBtn.addEventListener('click', function () {
    time = prompt("Введите дату в формате YYYY-MM-DD");
    money = +prompt("Ваш бюджет на месяц?");

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?");
        // мы будем показывать это сообщение "ваш бюджет на месяц"  
        //пока будут выполняться условия в цикле
        // пользователь введет не число - aaa , отправит пустую строку, и кликнет отмена
    }
    appData.budget = money;
    // Бюджет который указал пользователь ,зафиксировали в нашем объекте

    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();

    expensesBtn.disabled = true;
    optionalExpensesBtn.disabled = true;
    countBtn.disabled = true;
});


expensesBtn.addEventListener('click', function () {
    let sum = 0; // Собирает ценники которые ввёл пользователь

    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value, // Наименование расхода
            b = expensesItem[++i].value; // Цена

        if ((typeof (a)) === 'string' && (a != '' && b != '' && a.length < 50)) {
            //console.log("done");
            appData.expenses[a] = b;
            sum += +b; // Данные в виде числа
        } else {
            i--
        }
    }
    expensesValue.textContent = sum;
});


optionalExpensesBtn.addEventListener('click', function () {

    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let questionOptExpenses = optionalExpensesItem[i].value;
        appData.optionalexpenses[i] = questionOptExpenses;
        console.log(appData.optionalexpenses);
        optionalExpensesValue.textContent += appData.optionalexpenses[i] + ' ';
    }
});


countBtn.addEventListener('click', function () { // Расчет дневного бюджета

    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
        // toFixed - метод,преобразовывает значение
        // следует запомнить что , toFixed меняет нашу переменную, возвращает строковое значение!!!

        dayBudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Минимальный уровень достатка";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Средний уровень достатка";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Высокий уровень достатка";
        } else {
            levelValue.textContent = "Произошла ошибка";
        }
    } else {
        dayBudgetValue.textContent = "Произошла ошибка";
    }
});


// input - cобытие ввода

incomeItem.addEventListener('input', function () {
    let items = incomeItem.value; // Получаем значения из incomeItem

    // В наш объект аppData записываем значения в виде массива через запятую
    appData.income = items.split(", ");

    // Записываем значения в поле дополнительный доход
    incomeValue.textContent = appData.income;
})


/*
// test input события change - событие изменения 
incomeItem.addEventListener('change', function () {
    let items = incomeItem.value; // Получаем значения из incomeItem

    // В наш объект аppData записываем полученные значения в виде массива через запятую
    appData.income = items.split(", ");

    // Записываем значения в поле дополнительный доход
    incomeValue.textContent = appData.income;
})
*/

checkSavings.addEventListener('click', function () { // Событие клика на чекбокс
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

// Только если есть накопления будем рассчитывать !
sumValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            // Записываем значение суммы из инпута 

            percent = +percentValue.value;
        // Записываем значение процента из инпута

        appData.mothIncome = sum / 100 / 12 * percent;
        // рассчитываем прибыль за месяц

        appData.yearIncome = sum / 100 * percent;

        monthSavingsValue.textContent = appData.mothIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});


percentValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            // Записываем значение суммы из инпута 

            percent = +percentValue.value;
        // Записываем значение процента из инпута

        appData.mothIncome = sum / 100 / 12 * percent;
        // рассчитываем прибыль за месяц

        appData.yearIncome = sum / 100 * percent;

        monthSavingsValue.textContent = appData.mothIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalexpenses: {},
    income: [],
    savings: false
};

