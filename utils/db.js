const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/siswa')
  .then(() => console.log('Connected!'));


// // Menambahkan 1 data
// const contact1 = new Contact({
//   nama: "Otong Surotong",
//   nohp: "08796582356",
//   email: "otong25@yahoo.com"
// });


// // Simpan ke collection
// contact1.save().then(res => console.log(res));