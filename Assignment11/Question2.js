const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// 1 st Option used express
// const express = require('express');
// const app = express();

// const PORT = 3000;
// app.use(express.static('public')); 
// app.use('/images', express.static('images'));
// app.listen(PORT, () => {
//     console.log(`Running server on PORT ${PORT}...`);
//   })


// Option 2 http
http.createServer((req, res) => {

    // Parsing the URL
    var request = url.parse(req.url, true);

    // Extracting the path of file
    var action = request.pathname;

    console.log(action);

    // Path Refinements
    var filePath = path.join(__dirname,
        action).split("%20").join(" ");

    console.log(filePath);

    // Checking if the path exists
    fs.exists(filePath, function (exists) {

        if (!exists) {
            res.writeHead(404, {
                "Content-Type": "text/plain"
            });
            res.end("404 Not Found");
            return;
        }

        // Extracting file extension
        var ext = path.extname(action);

        // Setting default Content-Type
        var contentType = "text/plain";

        // Checking if the extension of
        // image is '.jpg'
        if (ext === ".jpg") {
            contentType = "image/jpg";
        }

        // Setting the headers
        res.writeHead(200, {
            "Content-Type": contentType
        });

        // Reading the file
        fs.readFile(filePath,
            function (err, content) {
                // Serving the image
                res.end(content);
            });
    });
})

    // Listening to the PORT: 3000
    .listen(3000, "127.0.0.1");