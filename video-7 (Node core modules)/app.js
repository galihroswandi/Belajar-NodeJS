

const fs = require('fs');

// Menulis file secara (synchronous)
// try {
//     fs.writeFileSync('data/test.txt', 'Hello world secara synchrounous');
// } catch (e) {
//     console.log(e);
// }


// Menulis file secara (asynchronous)
// fs.writeFile('./data/test.txt', 'Hello World secara asynchronous', (e) => {
//     console.log(e);
// })


// membaca file secara (synchronous)
// const data = fs.readFileSync('./data/test.txt', 'utf-8');    // --> utf-8 berfungsi untuk merubah file buffer menjadi text biasa / string
// console.log(data);



// membaca file secara (asynchronous)
// fs.readFile('./data/test.txt', 'utf-8', (err, data) => {
//     if (err) throw err;

//     console.log(data);
// })




// Readline
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Masukan nama anda: ', (nama) => {
    rl.question('Masukan No Hp anda: ', (noHp) => {
        const contact = { nama, noHp };

        fs.readFile('./data/contacts.json', 'utf-8', (err, file) => {
            if (err) throw err;

            // cek nama dan no hp sudah ada / belum
            if (file.includes(contact.nama)) {
                if (file.includes(contact.noHp)) {
                    console.log('nama dan no hp sudah ada !');
                    rl.close();
                } else {
                    console.log('Nama sudah ada !');
                    rl.close();
                }
            } else {
                console.log('No Hp sudah terdaftar !');
                rl.close();
            }

            const data = JSON.parse(file);
            data.push(contact);


            fs.writeFile('./data/contacts.json', JSON.stringify(data), (e) => {
                console.log(e);
            })

            console.log('Terimakasih Sudah Memasukan Data 😉');
        })

        rl.close();
    })
})
