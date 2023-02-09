const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.status(200);
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/product/:id', (req, res) => {
    res.send(`Product ID: ${req.params.id} <br> Categori Id: ${req.query.category}`);
})

app.use('/', (req, res) => {
    res.status(404);
    res.send('Error: file not found');
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
