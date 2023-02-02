// const fs = require('fs'); // core module atau module bawaan nodejs
// const coba = require('./coba'); // local module atau module buatan local
// const moment = require('moment'); // third party module atau npm module


const coba = require('./coba');

console.log(coba.cetakNama('Galih Roswandi', 18), coba.PI, coba.siswa.cetakSiswa(), new coba.Motor());
