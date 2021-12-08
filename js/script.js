const title = document.getElementsByTagName('h1')[0];
const start = document.getElementsByClassName('handler_btn')[0];
const reset = document.getElementsByClassName('handler_btn')[1];
const screenBtn = document.querySelector('.screen-btn');
const controls = document.querySelectorAll('.other-items.percent');
const mainControls = document.querySelectorAll('.other-items.number');
const inputVal = document.querySelector('.rollback > .main-controls__range > input');
const spanVal = document.querySelector('.rollback > .main-controls__range > .range-value');
let totalInput1 = document.getElementsByClassName('total-input')[0];
let totalInput2 = document.getElementsByClassName('total-input')[1];
let totalInput3 = document.getElementsByClassName('total-input')[2];
let totalInput4 = document.getElementsByClassName('total-input')[3];
let totalInput5 = document.getElementsByClassName('total-input')[4];
let display = document.querySelectorAll('.screen');

//Функции хелперы
function isNumber(x) {
    return !isNaN(parseFloat(x)) && isFinite(x);
}

function isString(str) {
    return isNaN(str) ? !!str.trim() : false;
}
function getUserAnswer(message, numb, check) {
    let n;
do {
    n = prompt(message, numb);
} while(!check(n));
return n;
}
//Конец функций хелперов


console.log(title);
console.log(start);
console.log(reset);
console.log(screenBtn);
console.log(controls);
console.log(mainControls);
console.log(inputVal);
console.log(spanVal);
console.log(totalInput1);
console.log(totalInput2);
console.log(totalInput3);
console.log(totalInput4);
console.log(totalInput5);
console.log(display);


const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    rollback: 7,
    fullPrice: 0,
    adaptive: true,
    services: {},
    allServicePrices: 0,
    servicePercentPrice: 0,
    asking: () => {
        appData.title = getUserAnswer("Введите название проекта", "калькулятор", isString);

        for (let i = 0; i < 2; i++) {
            let name = getUserAnswer('Какие типы экранов нужно разработать?', "сложные", isString);
            let price = 0;
            do {
                price = +getUserAnswer('Сколько будет стоить данная работа?', '15000', isNumber);
            } while (isNaN(price));
            appData.screens.push({id: i, name: name, price: price});
        }

        for (let i = 0; i < 2; i++) {
            let price = 0;
            let name = getUserAnswer('Какой дополнительный тип услуги нужен?', "Метрика", isString);
            price = +getUserAnswer('Сколько это будет стоить?', '1000', isNumber); 
            appData.services[name + i] = price;
        }
    },
    addPrices: () => {
        let initialValue = 0;
        appData.screenPrice = appData.screens.reduce((a, b) => {
            return a + b.price;
        }, initialValue); 

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },
    getFullPrice: (srcPri, allSrcPri) => {
        appData.fullPrice =  srcPri + allSrcPri;
    },
    getTitle: (txt) => {
        let text = txt.trim();
        appData.title = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },
    getServicePercentPrices: () => {
        appData.servicePercentPrice =  Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback/100)));
    },
    getRollbackMessage: (price) => {
        if (price > 30000) {
            return "Даем скидку в 10%";
        } else if (price >= 15000 && price <= 30000) {
            return 'Даем скидку 5%';
        } else if (price >= 0 && price <= 15000) {
            return "Скидка не предусмотрена";
        } else {
            return 'Что то пошло не так';
        }
    },
    start: () => {
        appData.asking();
        appData.addPrices();
        appData.getTitle(appData.title);
        appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
        appData.getServicePercentPrices();
        appData.logger();
    },
    logger: () => {
        console.log(appData.title);
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
        
        for(let i in appData){
            console.log('appData[' + i + '] = ' + appData[i]);
        }
        
    
    }
};



//appData.start();



