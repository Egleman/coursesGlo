const title = document.getElementsByTagName('h1')[0];

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const buttonPlus = document.querySelector('.screen-btn');
const otherItemPercent = document.querySelectorAll('.other-items.percent');
const otherItemNumber = document.querySelectorAll('.other-items.number');

let priceLayout = document.getElementsByClassName('total-input')[0];
let numberOfScreens = document.getElementsByClassName('total-input')[1];
let priceAddService = document.getElementsByClassName('total-input')[2];
let fullPrice = document.getElementsByClassName('total-input')[3];
let rollbackPrice = document.getElementsByClassName('total-input')[4];

let controlsRange = document.querySelector('.main-controls__range > input');
let rangeValue = document.querySelector('.range-value');

let screensDisp = document.querySelectorAll('.screen');

let cmsOpen = document.querySelector('#cms-open');
let hiddenCms = document.querySelector('.hidden-cms-variants');
let mainControlsCms = hiddenCms.querySelector('.main-controls__input');
let cmsSelect = document.querySelector('.hidden-cms-variants > .main-controls__select > select');





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
    init: function() {    
        cmsSelect.addEventListener('change', () => {
            this.cmsSelect();
        });

        cmsOpen.addEventListener('change', () => {
            if (cmsOpen.checked) {
                hiddenCms.style.display = 'flex';
            } else {
                hiddenCms.style.display = 'none';
            }
        });

        startBtn.addEventListener('click', () => {
            this.start();
        });

        resetBtn.addEventListener('click', () => {
            this.reset();
        });

        this.addTitle();

        buttonPlus.addEventListener('click', ()=> {
        this.addScreenBlock();
        });

        controlsRange.addEventListener('input', () => {
            rangeValue.textContent = controlsRange.value + '%';
            
            if (cmsSelect.value == '50') {
                rollbackPrice.value =  Math.ceil(+fullPrice.value * 1.5 - (+fullPrice.value * 1.5 * (parseInt(rangeValue.textContent) / 100)));
            } else {
                rollbackPrice.value =  Math.ceil(+fullPrice.value - (+fullPrice.value * (parseInt(rangeValue.textContent) / 100)));
            }
            
        });
    },

    addTitle: function() {
        document.title = title.textContent;
    },
    
    addScreens: function() {   
        screensDisp = document.querySelectorAll('.screen');
        screensDisp.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            
            if(input.value !== "" && select.value !== "") {
                this.screens.push({id: index, name: selectName, price: +select.value * +input.value, count: +input.value});
            } else {
                this.screens.splice(0);
            }
        });
    
    },
    addScreenBlock: function() {
        screensDisp = document.querySelectorAll('.screen');
        const cloneScreen = screensDisp[0].cloneNode(true);
        cloneScreen.querySelector('input').value = '';
         screensDisp[screensDisp.length - 1].after(cloneScreen);
    },
    addServices: function() {
        otherItemPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
            
        });

        otherItemNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
            
        });
    },
    addPrices: function() {  
        let initialValue = 0;
        this.screenPrice = this.screens.reduce((a, b) => {
            return a + b.price;
        }, initialValue); 
        
        let initial = 0;
        this.count = this.screens.reduce((a, b) => {
            return a + b.count;
        }, initial); 
        
        for (let key in this.servicesNumber) {
            this.ServicePricesNumber += this.servicesNumber[key];
        }

        for (let key in this.servicesPercent) {
            this.ServicePricesPercent += (this.screenPrice * (this.servicesPercent[key] / 100));
        }

        this.fullPrice =  +this.screenPrice + this.ServicePricesPercent + this.ServicePricesNumber;

        this.servicePercentPrice =  Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback/100))); 
    },
    addRollback: function() {
        if (parseInt(rangeValue.textContent === 0) || parseInt(rangeValue.textContent === '0')) {
            this.rollback = parseInt(fullPrice.value);
            rollbackPrice.value = parseInt(fullPrice.value);
        } else {
            this.rollback = +fullPrice.value - (+fullPrice.value * (parseInt(rangeValue.textContent) / 100));
            rollbackPrice.value = +fullPrice.value - (+fullPrice.value * (parseInt(rangeValue.textContent) / 100));
        } 
    },
    cmsSelect: function() {
        if (cmsSelect.value == 'other') {
            mainControlsCms.style.display = 'flex';
        } else if (cmsSelect.value == '50') {
            this.rollback = fullPrice.value * 1.5;
            rollbackPrice.value = fullPrice.value * 1.5;
        }
    },
    showResult: function() {
        priceLayout.value = this.screenPrice;
        priceAddService.value = this.ServicePricesPercent + this.ServicePricesNumber;
        fullPrice.value = this.fullPrice;
        numberOfScreens.value = this.count;
    },
    getServicePercentPrices: () => {
        this.servicePercentPrice =  Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback/100)));
    },
    start: function() {
        let badOk = []; //Массив результатов проверки

        //Проверка всех select и input на пустоту
        screensDisp = document.querySelectorAll('.screen');
        screensDisp.forEach((screen) => {
        const select = screen.querySelector('select');
        const input = screen.querySelector('input');

        if (input.value.trim() !== '' && select.value !== '') {
            badOk.push('1');
        } else {
            badOk.push('0');
        }
        });

        //Если все элементы массива удовлетворяют условию, то едем дальше
        if (badOk.every(elem => elem == '1')) {
            this.addScreens();
            this.addServices();
            this.addPrices();
            this.showResult();
            this.addRollback();
            this.cmsSelect();

            startBtn.style.display = 'none';
            resetBtn.style.display = 'flex';

            //Отключаем инпуты и селекты
            screensDisp = document.querySelectorAll('.screen');
            screensDisp.forEach((screen) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            select.disabled = true;
            input.disabled = true;
            });
        } else {
            //Если все условия не удовлетворяют, то чистим массив для ещё одной проверки
            badOk.splice(0);
        }

            
    },
    reset: function() {
        //Чистим nodeList 
        screensDisp = document.querySelectorAll('.screen');
        for(let i = 1; i < screensDisp.length; i++) {
            if (i !== 0) {
                screensDisp[i].parentElement.removeChild(screensDisp[i]);
            } 
        }

        //Возвращаем всё обратно
        screensDisp.forEach((screen) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            select.disabled = false;
            input.disabled = false;
            select.value = '';
            input.value = '';
        });
        startBtn.style.display = 'flex';
        resetBtn.style.display = 'none';
        hiddenCms.style.display = 'none';
        cmsOpen.checked = false;

        cmsSelect.value = '';
        priceLayout.value = 0;
        numberOfScreens.value = 0;
        priceAddService.value = 0;
        fullPrice.value = 0;
        rollbackPrice.value = 0;
        controlsRange.value = 0;
        rangeValue.textContent = controlsRange.value + '%';
        this.screenPrice = 0;
        this.rollback = 0;
        this.fullPrice = 0;
        this.ServicePricesPercent = 0;
        this.ServicePricesNumber = 0;
        this.servicePercentPrice = 0;
        this.screens.splice(0);
        otherItemPercent.forEach((item) => {
            item.querySelector('input[type=checkbox]').checked = false;
            const label = item.querySelector('label');
            this.servicesPercent[label.textContent] = 0;
        });

        otherItemNumber.forEach((item) => {
            item.querySelector('input[type=checkbox]').checked = false;
            const label = item.querySelector('label');
             this.servicesNumber[label.textContent] = 0;
        });

    },
};
appData.init();
