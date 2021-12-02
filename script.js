let title;
let screens;
let screenPrice;
let rollback = 7;
let fullPrice = 100;
let adaptive;
let service1;
let service2;
let allServicePrices;
let servicePercentPrice;

const isNumber = (x) => {
    return !isNaN(parseFloat(x)) && isFinite(x);
};
function isString(str) {
    return str ? !!str.trim() : false;
}

function getUserAnswer(message, numb, check) {
    let n;
    do {
        n = prompt(message, numb);
    } while(!check(n));
    return n;
}



const asking = () => {
    title = getUserAnswer("Введите название проекта", "калькулятор", isString);
    screens = getUserAnswer('Какие типы экранов нужно разработать?', "сложные", isString);
    do {
        screenPrice = +getUserAnswer('Сколько будет стоить данная работа?', "15000", isNumber);
    } while (isNaN(screenPrice));
    adaptive = confirm('Нужен ли адаптив на сайте?');
};

const getAllServicePrices = () => {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = getUserAnswer('Какой дополнительный тип услуги нужен?', "Метрика", isString);
        } else if (i === 1) {
            service2 = getUserAnswer('Какой дополнительный тип услуги нужен?', "Таймер", isString);
        }
        sum += +getUserAnswer('Сколько это будет стоить?', '1000', isNumber);
    }
    
    return sum;
};




function getFullPrice(srcPri, allSrcPri) {
    return srcPri + allSrcPri;
}


function getTitle(txt) {
        let text = txt.trim();
        let resText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        return resText;
}

function getServicePercentPrices() {
     return Math.ceil(fullPrice - (fullPrice * (rollback/100)));
}

const showTypeOff = (variable) => {
    console.log(variable, typeof(variable));
};

const getRollbackMessage = (price) => {
    if (price > 30000) {
        return "Даем скидку в 10%";
    } else if (price >= 15000 && price <= 30000) {
        return 'Даем скидку 5%';
    } else if (price >= 0 && price <= 15000) {
        return "Скидка не предусмотрена";
    } else {
        return 'Что то пошло не так';
    }
};

asking();
title = getTitle(title);
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices();


/*


showTypeOff(title);
showTypeOff(fullPrice);
showTypeOff(adaptive);
showTypeOff(servicePercentPrice);
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrices());
console.log(screens.toLowerCase().split(' '));
console.log(screens);

*/
// Проверка, чтобы всё считалось грамотно и правильно записывалось
showTypeOff(title);
showTypeOff(screen);
showTypeOff(screenPrice);
showTypeOff(fullPrice);
showTypeOff(adaptive);
showTypeOff(service1);
showTypeOff(service2);
showTypeOff(allServicePrices);
showTypeOff(servicePercentPrice);
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrices());
