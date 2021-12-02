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

const asking = () => {
    title = prompt("Введите название проекта", "калькулятор");
    screens = prompt('Какие типы экранов нужно разработать?', "сложные");
    do {
        screenPrice = +prompt('Сколько будет стоить данная работа?', "15000");
    } while (isNaN(screenPrice));
    adaptive = confirm('Нужен ли адаптив на сайте?');
};

//Я случайно сделал сразу усложнённое задание на проверку, чтобы 
//число сохранялось, как число не зависимо от пробелов и кнопки отмены
/*
функция проверки

let testNum = '             25';
function test (y) {
    let sum = 0;
    sum = (()=> {
        let n;
            do {
                n = y;
            } while (!isNumber(n));
            return +n;
    })();
    return sum;
}
console.log(test(testNum), typeof(test(testNum)));
*/


const getAllServicePrices = () => {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?', "Метрика");
        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?', "Таймер");
        }
        sum += getUserAnswer('Сколько это будет стоить?', '1000', 'number');
        /*(() => {
            let n;
            do {
                n = prompt('Сколько это будет стоить?');
            } while (!isNumber(n));
            return +n;
        })(); */
        
    }
    
    return sum;
};


function getUserAnswer(message, numb, type) {
    let n;
    do {
        n = prompt(message, numb, type);
    } while(!isNumber(n));
    return +n;
}

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
