const express = require('express');
const app = express();
const port = 3000;

const loadFile = (path, res) => {
    res.sendFile(path, { root: __dirname }, (err) => {
        if (err) {
            console.log(err);
            return false;
        }
    });
}

app.get('/', (req, res) => {
    res.status(200);
    loadFile('./pages/index.html', res);
});

app.get('/about', (req, res) => {
    loadFile('./pages/about.html', res);
})

app.get('/contact', (req, res) => {
    loadFile('./pages/contact.html', res);
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

// const http = require('http');
// const fs = require('fs');
// const port = 3000;

// const loadFile = (path, res) => {
//     fs.readFile(path, (err, data) => {
//         if (err) {
//             res.writeHead(404);
//             res.write('Error: file not found...');
//         } else {
//             res.write(data);
//         }
//         res.end();
//     })
// }

// const server = http.createServer((req, res) => {
//     const url = req.url;
//     res.writeHead(200, { 'Content-Type': 'text/html' });

//     switch (url) {
//         case '/about':
//             loadFile('./about.html', res);
//             break;
//         case '/contact':
//             loadFile('./contact.html', res);
//             break;
//         default:
//             loadFile('./index.html', res);
//             break;
//     }
// });

// server.listen(port, () => {
//     console.log('Server is listening on port 3000...');
// });