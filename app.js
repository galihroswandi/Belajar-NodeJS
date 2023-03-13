const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const { validationResult, body, check } = require('express-validator');
const methodOverride = require('method-override');

const app = express();
const port = 3000;

require('./utils/db');
const Contact = require('./models/contact');

// Setup Method Override
app.use(methodOverride('_method'));

// Setup EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

// Halaman Home
app.get('/', (req, res) => {
    res.status(200);

    const mahasiswa = [
        {
            nama: 'Galih Roswandi',
            email: 'galihroswandi12@gmail.com'
        },
        {
            nama: 'Otong Surotong',
            email: 'otong01@gmail.com'
        },
        {
            nama: 'Ucup Markucup',
            email: 'ucup11@gmail.com'
        },
    ]

    res.render('index', {
        layout: 'layouts/main-layout',
        nama: 'Galih Roswandi',
        title: 'Halaman Home',
        mahasiswa
    });
});


// Halaman About
app.get('/about', (req, res,) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'Express | About'
    });
})

// halaman tambah contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        layout: 'layouts/main-layout',
        title: 'Express | Add-Contact',
    });
});

// proses tambah contact
app.post(
    '/contact',
    body('nama').custom(async (value) => {
        const cek = await Contact.findOne({ nama: value });
        if (cek) {
            throw new Error("Nama sudah digunakan!");
        }
        return true;
    }),
    check('email', 'Email tidak valid!').isEmail(),
    check('nohp', 'No Hp Tidak valid!').isMobilePhone('id-ID'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('add-contact', {
                title: "Express | Add-Contact",
                layout: "layouts/main-layout",
                errors: errors.array(),
            })
        } else {
            Contact.insertMany(req.body).then(result => {
                req.flash('msg', 'Data berhasil ditambahkan !');
                res.redirect('/contact');
            })
        }
    })


// Halaman Contact
app.get('/contact', async (req, res) => {
    const contacts = await Contact.find();
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Express | Contact',
        contacts,
        msg: req.flash('msg'),
    });
});


// halaman detail contact
app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({ nama: req.params.nama });
    res.render('detail', {
        layout: 'layouts/main-layout',
        title: 'Express | Contact',
        contact,
    });
});

// Halaman Hapus contact
app.delete('/contact', (req, res) => {
    Contact.deleteOne({ _id: req.body.id }).then(() => {
        req.flash('msg', 'Data berhasil dihapus !');
        res.redirect('/contact');
    })
})

// halaman ubah contact
app.get('/contact/update/:nama', async (req, res) => {
    const contact = await Contact.findOne({ nama: req.params.nama });
    res.render('edit-contact', {
        layout: 'layouts/main-layout',
        title: 'Express | Ubah contact',
        contact,
    })
})

// proses ubah contact
app.put(
    '/contact',
    body('nama').custom(async (value, { req }) => {
        const duplikat = await Contact.findOne({ nama: value });
        if (value !== req.body.oldNama && duplikat) {
            throw new Error("Nama sudah digunakan!");
        }
        return true;
    }),
    check('email', 'Email tidak valid!').isEmail(),
    check('nohp', 'No Hp Tidak valid!').isMobilePhone('id-ID'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('edit-contact', {
                title: "Express | Edit-Contact",
                layout: "layouts/main-layout",
                errors: errors.array(),
                contact: req.body,
            })
        } else {
            Contact.updateOne(
                { _id: req.body._id },
                {
                    $set: {
                        nama: req.body.nama,
                        email: req.body.email,
                        nohp: req.body.nohp,
                    }
                }
            ).then(() => {
                // kirimkan pesan ke halaman
                req.flash('msg', 'Data berhasil diubah !');
                res.redirect('/contact');
            });
        }
    })

app.listen(port, () => {
    console.log(`Mongo Contact App | listening at http://localhost:${port}`);
})