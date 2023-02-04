const contacts = require('./contacts');

const main = async () => {
    const nama = await contacts.tulisPertanyaan('Masukan nama anda : ');
    const email = await contacts.tulisPertanyaan('Masukan email anda : ');
    const noHp = await contacts.tulisPertanyaan('Masukan no hp anda : ');

    contacts.simpanContact(nama, email, noHp);
}

main();