const title = document.getElementsByTagName('h1')[0];

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const buttonPlus = document.querySelector('.screen-btn');
const otherItemPercent = document.querySelectorAll('.other-items.percent');
const otherItemNumber = document.querySelectorAll('.other-items.number');
//const inputVal = document.querySelector('.rollback > .main-controls__range > input');
//const spanVal = document.querySelector('.rollback > .main-controls__range > .range-value');

let priceLayout = document.getElementsByClassName('total-input')[0];
let numberOfScreens = document.getElementsByClassName('total-input')[1];
let priceAddService = document.getElementsByClassName('total-input')[2];
let fullPrice = document.getElementsByClassName('total-input')[3];
let rollbackPrice = document.getElementsByClassName('total-input')[4];

let controlsRange = document.querySelector('.main-controls__range > input');
let rangeValue = document.querySelector('.range-value');

let screens = document.querySelectorAll('.screen');



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





const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    rollback: 0,
    fullPrice: 0,
    adaptive: true,
    servicesPercent: {},
    servicesNumber: {},
    ServicePricesPercent: 0,
    ServicePricesNumber: 0,
    servicePercentPrice: 0,
    count: 0,
    init: () => {
        appData.addTitle();
        startBtn.addEventListener('click', ()=> {
            appData.start();
        });
        buttonPlus.addEventListener('click', ()=> {
            appData.addScreenBlock();
        });

        controlsRange.addEventListener('input', () => {
            rangeValue.textContent = controlsRange.value + '%';
        });


    },
    checkValue: () => {
        screens = document.querySelectorAll('.screen');

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            if(input.value !== '' && select.value !== '') {
                appData.screens.push({id: index, name: selectName, price: +select.value * +input.value, count: +input.value});
            }
        });
    },
    addTitle: () => {
        document.title = title.textContent;
    },
    addScreens: () => {
        screens = document.querySelectorAll('.screen');
        appData.checkValue();
        /*
        screens.forEach((screen, index)=> {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({id: index, name: selectName, price: +select.value * +input.value});
            
        });
        */
        console.log(appData.screens);
    },
    addScreenBlock: () => {
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);
    },
    addServices: () => {
        otherItemPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
            
        });

        otherItemNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
            
        });
    },
    addPrices: () => {
        
        let initialValue = 0;
        appData.screenPrice = appData.screens.reduce((a, b) => {
            return a + b.price;
        }, initialValue); 
        
        let initial = 0;
        appData.count = appData.screens.reduce((a, b) => {
            return a + b.count;
        }, initial); 
        
        for (let key in appData.servicesNumber) {
            appData.ServicePricesNumber += appData.servicesNumber[key];
        }

        
        for (let key in appData.servicesPercent) {
            appData.ServicePricesPercent += (appData.screenPrice * (appData.servicesPercent[key] / 100));
        }

        appData.fullPrice =  +appData.screenPrice + appData.ServicePricesPercent + appData.ServicePricesNumber;

        if (appData.rollback === 0 || appData.rollback === '') {
            appData.servicePercentPrice =  appData.fullPrice;
        } else {
            appData.servicePercentPrice =  Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback/100)));
        }
        
    },
    addRollback: () => {
        appData.rollback = parseInt(rangeValue.textContent);
    },
    showResult: () => {
        priceLayout.value = appData.screenPrice;
        priceAddService.value = appData.ServicePricesPercent + appData.ServicePricesNumber;
        fullPrice.value = appData.fullPrice;
        rollbackPrice.value = appData.servicePercentPrice;
        numberOfScreens.value = appData.count;
    },
    getServicePercentPrices: () => {
        appData.servicePercentPrice =  Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback/100)));
    },
    start: () => {
        appData.addScreens();
        appData.addServices();
        appData.addRollback();
        appData.addPrices();
        appData.showResult();
        //appData.logger();
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


appData.init();



