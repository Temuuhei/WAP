const http = require('http');
const fs = require('fs');
const server = http.createServer();

server.on('request', function (request, response) {
    response.writeHead(200, {
        'Content-Type' : 'text/html'
    });
    let indexHTML = fs.readFileSync('index.html', 'utf-8');
    // const src = fs.createReadStream('Temka.jpg');
    // console.log(typeof src);
    // src.pipe(response);
    indexHTML = indexHTML.replace('{message}', 
    '<img src="Temka.jpg" type = "images/jpg" width="1000px" style="left: 0px;"/>');
    response.end(indexHTML);
});

server.listen(3000, function () {
    console.log('server starts at 3000');
})

// another way to start server

// const http = require('http');
// http.createServer(function (req, res) {
//     res.end('This is shortcut version !');
// }).listen(4000, function () {
//     console.log('Listening on 4000');
// });
