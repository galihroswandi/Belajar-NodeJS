const fs = require('fs');
const validator = require('validator');
const chalk = require('chalk');

// cek jika folder tidak ada
const dataPath = './data';
if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath);
}

// cek jika file tidak ada
const filePath = './data/contacts.json';
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
}


const simpanContact = (nama, email, noHp) => {
    const contact = { nama, email, noHp };
    fs.readFile('./data/contacts.json', 'utf-8', (err, file) => {
        if (err) throw err;
        const data = JSON.parse(file);

        // cek duplikat
        const duplikat = data.find(contact => contact.nama === nama);
        if (duplikat) {
            console.log(chalk.red.inverse.bold('Contact sudah terdaftar, gunakan nama lain!'));
            return false;
        }

        // cek email
        if (email) {
            if (!validator.isEmail(email)) {
                console.log(chalk.red.inverse.bold('Email tidak valid!'));
                return false;
            }
        }

        // cek noHP
        if (!validator.isMobilePhone(noHp, 'id-ID')) {
            console.log(chalk.inverse.red.bold('No Hp tidak valid!'));
            return false;
        }

        data.push(contact);

        fs.writeFile('./data/contacts.json', JSON.stringify(data), (e) => {
            if (e) {
                console.log(e);
            }
        })

        console.log('Terimakasih Sudah Memasukan Data 😉');
    })
}

module.exports = { simpanContact };