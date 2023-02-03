const validator = require('validator');
const chalk = require('chalk');

// console.log(validator.isEmail('galihroswandi25@gmail.com'));
// console.log(validator.isMobilePhone('0812345689', 'id-ID'));
// console.log(validator.isNumeric('32452164'));

// console.log(chalk.cyan.bgYellow.strikethrough("Hello World"));
const nama = 'Ucup Markucup';
const pesan = chalk`Lorem ipsum dolor {bgCyan.red sit amet} consectetur adipisicing elit. {strikethrough.yellow Quibusdam}, molestiae?, nama saya : {bgBlue.red.strikethrough ${nama}}`;
console.log(pesan);

// chalk 4.1.0
// nodemon 2.0.7