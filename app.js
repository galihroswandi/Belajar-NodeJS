const yargs = require('yargs');
const { simpanContact, listContact, detailContact, deleteContact } = require('./contacts');

// yargs.command('add', 'Menambahkan contact baru', () => { }, (argv) => {
//     console.log(argv);
// })


yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string'
        },
        noHP: {
            describe: 'No Handphone',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        simpanContact(argv.nama, argv.email, argv.noHP);
    }
}).demandCommand();


// Menampilkan semua daftar kontak 
yargs.command({
    command: 'list',
    describe: 'Menampilkan daftar kontak',
    handler() {
        listContact();
    }
})


// Menampilkan daftar kontak berdasarkan nama
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail kontak berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        detailContact(argv.nama);
    }
})


// menghapus kontak berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus kontak berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        deleteContact(argv.nama);
    }
})

yargs.parse();
