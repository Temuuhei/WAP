const http = require('http');
const fs = require('fs');
const server = http.createServer();

server.on('request', function (request, response) {
    response.writeHead(200, {
        'Content-Type' : 'text/html'
    });
    let indexHTML = fs.readFileSync('index.html', 'utf-8');
    const src = fs.createReadStream('Temka.jpg');
    // console.log(src);
    const temka = src.pipe(response);
    console.log(temka);
    indexHTML = indexHTML.replace('{message}', 
    temka);
    // response.pipe('./Temka.jpg');
    response.end(indexHTML);
});

server.listen(3000, function () {
    console.log('server starts at 3000');
})