const yargs = require('yargs');
const { simpanContact } = require('./contacts');

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
})


yargs.parse();
