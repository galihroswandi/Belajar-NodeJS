const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000; 

require('./utils/db');
const Contact = require('./models/contact');

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
    const contact = await Contact.findOne({ nama: req.params.nama});
    res.render('detail', {
        layout: 'layouts/main-layout',
        title: 'Express | Contact',
        contact,
    });
});

app.listen(port, () => {
    console.log(`Mongo Contact App | listening at http://localhost:${port}`);
})