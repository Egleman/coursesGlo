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
        appData.title = appData.getUserAnswer("Введите название проекта", "калькулятор", appData.isString);

        for (let i = 0; i < 2; i++) {
            let name = appData.getUserAnswer('Какие типы экранов нужно разработать?', "сложные", appData.isString);
            let price = 0;
            do {
                price = +appData.getUserAnswer('Сколько будет стоить данная работа?', "15000", appData.isNumber);
            } while (isNaN(price));
            appData.screens.push({id: i, name: name, price: price});
        }

        for (let i = 0; i < 2; i++) {
            let price = 0;
            let name = appData.getUserAnswer('Какой дополнительный тип услуги нужен?', "Метрика", appData.isString);
            price = +appData.getUserAnswer('Сколько это будет стоить?', '1000', appData.isNumber); 
            appData.services[name + i] = price;
        }
    },
    isNumber: (x) => {
        return !isNaN(parseFloat(x)) && isFinite(x);
    },
    isString: (str) => {
        return isNaN(str) ? !!str.trim() : false;
    },
    getUserAnswer: (message, numb, check) => {
        let n;
    do {
        n = prompt(message, numb);
    } while(!check(n));
    return n;
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

appData.start();



