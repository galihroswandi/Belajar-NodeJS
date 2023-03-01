const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { validationResult, body, check } = require('express-validator');
const { loadContact, findContact, addContact, deleteContact, updateContact } = require('./utils/contacts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Third-party middleware
app.use(expressLayouts);

// Built in middleware
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

app.get('/about', (req, res,) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'Express | About'
    });
})

app.get('/contact', (req, res) => {
    const contacts = loadContact();
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Express | Contact',
        contacts,
        msg: req.flash('msg'),
    });
});

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
    body('nama').custom(value => {
        const cek = findContact(value);
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
            // return res.status(400).json({ errors: errors.array() });
            res.render('add-contact', {
                title: "Express | Add-Contact",
                layout: "layouts/main-layout",
                errors: errors.array(),
            })
        } else {
            addContact(req.body);
            req.flash('msg', 'Data berhasil ditambahkan !');
            res.redirect('/contact');
        }
    })

    
// proses hapus contact
app.get('/contact/delete/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    if(!contact){
        res.status(404);
        res.send('<h1>404</h1>');
    }else{
        deleteContact(req.params.nama);
        req.flash('msg', 'Data berhasil dihapus !');
        res.redirect('/contact');
    }
})

// proses ubah contact
app.post(
    '/contact/update',
    body('nama').custom((value, {req}) => {
        const duplikat = findContact(value);
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
            // return res.status(400).json({ errors: errors.array() });
            res.render('edit-contact', {
                title: "Express | Edit-Contact",
                layout: "layouts/main-layout",
                errors: errors.array(),
                contact: req.body,
            })
        } else {
            updateContact(req.body);

            // kirimkan pesan ke halaman
            req.flash('msg', 'Data berhasil ditambahkan !');
            res.redirect('/contact');
        }
    })

// halaman detail contact
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    res.render('detail', {
        layout: 'layouts/main-layout',
        title: 'Express | Contact',
        contact,
    });
});

// halaman ubah contact
app.get('/contact/update/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    res.render('edit-contact',{
        layout: 'layouts/main-layout',
        title: 'Express | Ubah contact',
        contact,
    })
})

app.get('/product/:id', (req, res) => {
    res.send(`Product ID: ${req.params.id} <br> Categori Id: ${req.query.category}`);
})

app.use('/', (req, res) => {
    res.status(404);
    res.write('<h1>404</h1>');
    res.end();
})

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/`);
})
