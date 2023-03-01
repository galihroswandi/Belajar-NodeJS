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

const loadContact = () => {
    const file = fs.readFileSync('./data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find(contact => contact.nama.toLowerCase() === nama.toLowerCase());
    return contact;
}

// function untuk menyimpan / menimpa data
const saveContacts = (contacts) => {
    fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
}

// manambahkan data contact baru
const addContact = (contact) => {
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts);
}

// cek duplikat
const cekDuplikat = (nama) => {
    const contacts = loadContact();
    return contacts.find(contact => contact === nama);
}

// hapus contact
const deleteContact = (contactParam) => {
    const contacts = loadContact();
    const filteredContacts = contacts.filter((contact) => contact.nama != contactParam.nama);
    saveContacts(filteredContacts);
}

// update contact
const updateContact = (contactBaru) => {
    const contacts = loadContact();

    // hilangkan contact yang sama dengan oldContact
    const filteredContacts = contacts.filter(contact => contact.nama !== contactBaru.oldNama);
    
    // hapus properti oldNama
    delete contactBaru.oldNama;
    
    // tambahkan ke filtered contact  
    filteredContacts.push(contactBaru);
    
    // timpa contact baru
    saveContacts(filteredContacts);

}

module.exports = { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContact };