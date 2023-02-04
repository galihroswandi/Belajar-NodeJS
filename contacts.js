const fs = require('fs');

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

// Readline
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, reject) => {
        rl.question(pertanyaan, (q1) => {
            resolve(q1);
        });
    })
}

const simpanContact = (nama, email, noHp) => {

    const contact = { nama, email, noHp };
    fs.readFile('./data/contacts.json', 'utf-8', (err, file) => {
        if (err) throw err;

        // cek nama dan no hp sudah ada / belum
        if (file.includes(contact.nama)) {
            if (file.includes(contact.email)) {
                console.log('nama dan no hp sudah ada !');
                rl.close();
            } else {
                console.log('Nama sudah ada !');
                rl.close();
            }
        } else if (file.includes(contact.email)) {
            console.log('No Hp sudah terdaftar !');
            rl.close();
        } else {
            const data = JSON.parse(file);
            data.push(contact);

            fs.writeFile('./data/contacts.json', JSON.stringify(data), (e) => {
                console.log(e);
            })

            console.log('Terimakasih Sudah Memasukan Data 😉');
        }
    })
    rl.close();
}

module.exports = { tulisPertanyaan, simpanContact };