const http = require('http');
const fs = require('fs');
const port = 3000;

const loadFile = (path, res) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write('Error: file not found...');
        } else {
            res.write(data);
        }
        res.end();
    })
}

const server = http.createServer((req, res) => {
    const url = req.url;
    res.writeHead(200, { 'Content-Type': 'text/html' });

    switch (url) {
        case '/about':
            loadFile('./about.html', res);
            break;
        case '/contact':
            loadFile('./contact.html', res);
            break;
        default:
            loadFile('./index.html', res);
            break;
    }
});

server.listen(port, () => {
    console.log('Server is listening on port 3000...');
});