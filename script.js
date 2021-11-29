let title = 'Первый проект';
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 53;
let rollback = 7;
let fullPrice = 100;
let adaptive = true;

console.log(typeof(title));
console.log(typeof(fullPrice));
console.log(typeof(adaptive));
console.log(screens.length);
console.log("Стоимость вёрстки экранов " + screenPrice +  " рубля");
console.log(screens.toLowerCase().split(', '));
console.log(fullPrice * (rollback/100));


title = prompt("Как называется ваш проект?");
screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
screenPrice = +prompt('Сколько будет стоить данная работа?');
adaptive = confirm('Нужен ли адаптив на сайте?');
console.log(title);
console.log(screens);
console.log(screenPrice);
console.log(adaptive);

let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');
console.log(service1);
console.log(servicePrice1);
console.log(service2);
console.log(servicePrice2);

fullPrice = screenPrice + servicePrice1 + servicePrice2;

let servicePercentPrice = Math.ceil(fullPrice - (fullPrice * (rollback/100)));
console.log(servicePercentPrice);

if (fullPrice > 30000) {
    console.log("Даем скидку в 10%");
} else if (fullPrice >= 15000 && fullPrice <= 30000) {
    console.log('ДАём скидку 5%');
} else if (fullPrice >= 0 && fullPrice <= 15000) {
    console.log("Скидка не предусмотрена");
} else {
    console.log('Что то пошло не так');
}
