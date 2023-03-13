const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/db_siswa')
  .then(() => console.log('Connected!'));


// // Menambahkan 1 data
// const contact1 = new Contact({
//     nama: "Galih Roswandi",
//     nohp: "0812345678",
//     email: "galihroswandi25@gmail.com"
// });


// // Simpan ke collection
// contact1.save().then(res => console.log(res));