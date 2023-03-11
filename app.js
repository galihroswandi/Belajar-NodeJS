const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'siswa';

const client = new MongoClient(uri);

client.connect().then(() => {

    // pilih database
    const db = client.db(dbName);


    // menambahkan 1 data mahasiswa
    // db.collection('siswa').insertOne(
    //     {
    //         nama: "Erika",
    //         email: "erika@gmail.com"
    //     }
    // ).then(res => {
    //     console.log(`Data ${res.insertedId} berhasil ditambahkan !`);
    // }).catch(err => {
    //     console.log('Data gagal ditambahkan !');
    // })


    // manambahkan lebih dari 1 data
    // db.collection('siswa').insertMany(
    //     [
    //         {
    //             nama: "Erik",
    //             email: "erik@yahoo.com"
    //         },
    //         {
    //             nama: "avip",
    //             email: "avip@gmail.com"
    //         }
    //     ]
    // ).then(res => {
    //     console.log(res);
    // }).catch(err => {
    //     console.log(err);
    // })


    // manampilkan semua data yang ada di collections siswa
    // db.collection('siswa')
    //     .find()
    //     .toArray()
    //     .then(res => {
    //         console.log(res);
    //     });


    // manampilkan data berdasarkan kriteria
    // db.collection('siswa').find({ _id: new ObjectId("640c11d567aa0818aa01e661") }).toArray().then(res => {
    //     console.log(res);
    // });


    // mengubah data berdasarkan id
    // db.collection('siswa').updateOne(
    //     {
    //         _id: new ObjectId("640c11d567aa0818aa01e660"),
    //     },
    //     {
    //         $set: {
    //             email: "erikPermana@gmail.com"
    //         }
    //     }
    // ).then(res => {
    //     console.log(res);
    // }).catch(error => {
    //     console.log(error);
    // })


    // mengubah data lebih dari satu berdasarkan id
    // db.collection('siswa').updateMany(
    //     {
    //         nama: "Erik"
    //     },
    //     {
    //         $set: {
    //             nama: "Erik Cuakss"
    //         }
    //     }
    // ).then(res => {
    //     console.log(res);
    // }).catch(err => {
    //     console.log(err);
    // })


    // menghapus 1 data
    // db.collection('siswa').deleteOne(
    //     {
    //         _id: new ObjectId("640c1cdf145138a69fbf6ff2")
    //     }
    // ).then(res => {
    //     console.log(res);
    // }).catch(err => {
    //     console.log(err);
    // })


    // menghapus lebih dari 1 data
    db.collection('siswa').deleteMany(
        {
            nama: "Erik Cuakss",
        }
    ).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
})
