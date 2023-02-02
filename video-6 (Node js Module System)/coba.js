const cetakNama = (nama, umur) => {
    return `Hallo, nama saya ${nama}, saya ${umur} tahun.`;
}

const PI = 3.14;

const siswa = {
    nama: 'Otong Surotong',
    umur: 20,
    cetakSiswa() {
        return `Hallo, Nama saya ${this.nama}, saya ${this.umur} tahun.`;
    }
}

class Motor {
    constructor() {
        console.log('Motor Kawasaki ninja h2r tercepat didunia 😁');
    }
}

// module.exports = cetakNama;

// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;

module.exports = { cetakNama, PI, siswa, Motor };