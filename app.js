const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(expressLayouts);

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

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'Express | About'
    });
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Express | Contact'
    });
})

app.get('/product/:id', (req, res) => {
    res.send(`Product ID: ${req.params.id} <br> Categori Id: ${req.query.category}`);
})

app.use('/', (req, res) => {
    res.status(404);
    res.send('Error: file not found');
})

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/`);
})
