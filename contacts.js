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

const loadContact = () => {
    const file = fs.readFileSync('./data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}


const simpanContact = (nama, email, noHp) => {
    const contact = { nama, email, noHp };
    const contacts = loadContact();

    // cek duplikat
    const duplikat = contacts.find(contact => contact.nama === nama);
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

    contacts.push(contact);

    fs.writeFile('./data/contacts.json', JSON.stringify(contacts), (e) => {
        if (e) {
            console.log(e);
        }
    })

    console.log('Terimakasih Sudah Memasukan Data 😉');
}


const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.bgBlue.inverse('Daftar Kontak : '));
    contacts.forEach((contact, index) => {
        console.log(`${index + 1}. ${contact.nama} - ${contact.noHp}`);
    });
}


const detailContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find(contact => contact.nama.toLowerCase() === nama.toLowerCase());
    if (!contact) {
        console.log(chalk.red.inverse.bgYellow(`${nama} tidak ditemukan !`));
        return false;
    }

    console.log(chalk.bgCyan.inverse.white(contact.nama));
    console.log(`${contact.noHp}`);
    if (contact.email) {
        console.log(`${contact.email}`);
    }
}


const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContact = contacts.filter(contact => contact.nama.toLowerCase() !== nama.toLowerCase());

    if (contacts.length === newContact.length) {
        console.log(chalk.bgRed.inverse.cyan(`${nama} tidak ditemukan !`));
        return false;
    }

    fs.writeFile('./data/contacts.json', JSON.stringify(newContact), 'utf-8', (e) => e);
    console.log(chalk.bgGreen.inverse.blackBright`${nama} berhasil dihapus ! ✔`);
}
module.exports = { simpanContact, listContact, detailContact, deleteContact };