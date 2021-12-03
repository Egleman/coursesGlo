const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    rollback: 7,
    fullPrice: 0,
    adaptive: true,
    service1: '',
    service2: '',
    allServicePrices: 0,
    servicePercentPrice: 0,
    asking: () => {
        appData.title = appData.getUserAnswer("Введите название проекта", "калькулятор", appData.isString);
        appData.screens = appData.getUserAnswer('Какие типы экранов нужно разработать?', "сложные", appData.isString);
        do {
            appData.screenPrice = +appData.getUserAnswer('Сколько будет стоить данная работа?', "15000", appData.isNumber);
        } while (isNaN(appData.screenPrice));
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    isNumber: (x) => {
        return !isNaN(parseFloat(x)) && isFinite(x);
    },
    isString: (str) => {
        return str ? !!str.trim() : false;
    },
    getUserAnswer: (message, numb, check) => {
        let n;
    do {
        n = prompt(message, numb);
    } while(!check(n));
    return n;
    },
    getAllServicePrices: () => {
        let sum = 0;
    
        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                appData.service1 = appData.getUserAnswer('Какой дополнительный тип услуги нужен?', "Метрика", appData.isString);
            } else if (i === 1) {
                appData.service2 = appData.getUserAnswer('Какой дополнительный тип услуги нужен?', "Таймер", appData.isString);
            }
            sum += +appData.getUserAnswer('Сколько это будет стоить?', '1000', appData.isNumber);
        }
        
        return sum;
    },
    getFullPrice: (srcPri, allSrcPri) => {
        return srcPri + allSrcPri;
    },
    getTitle: (txt) => {
        let text = txt.trim();
        let resText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        return resText;
    },
    getServicePercentPrices: () => {
        return Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback/100)));
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
        appData.title = appData.getTitle(appData.title);
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
        appData.servicePercentPrice = appData.getServicePercentPrices();
        appData.logger();
    },
    logger: () => {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        for(let i in appData){
            console.log('appData[' + i + '] = ' + appData[i]);
        }
    
    }
};
/*
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

const getAllServicePrices = () => {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            appData.service1 = getUserAnswer('Какой дополнительный тип услуги нужен?', "Метрика", isString);
        } else if (i === 1) {
            appData.service2 = getUserAnswer('Какой дополнительный тип услуги нужен?', "Таймер", isString);
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
     return Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback/100)));
}



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

*/
appData.start();
//appData.title = getTitle(appData.title);
//appData.allServicePrices = getAllServicePrices();
//appData.fullPrice = getFullPrice(appData.screenPrice, appData.allServicePrices);
//appData.servicePercentPrice = getServicePercentPrices();

//console.log(appData.fullPrice);
//console.log(appData.servicePercentPrice);

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


