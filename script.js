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
