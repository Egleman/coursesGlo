let title = prompt("Введите название проекта");
let screens = prompt('Какие типы экранов нужно разработать?');
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let rollback = 7;
let fullPrice = 100;
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');

let servicePercentPrice = getServicePercentPrices();

const getAllServicePrices = (serPri1, serPri2) => {
    return serPri1 + serPri2;
};

let allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);

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

title = getTitle(title);
fullPrice = getFullPrice(screenPrice, allServicePrices);





showTypeOff(title);
showTypeOff(fullPrice);
showTypeOff(adaptive);
showTypeOff(servicePercentPrice);
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrices());
console.log(screens.toLowerCase().split(' '));
console.log(screens);

