const express = require('express');
const path = require('path');

const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');

const app = express();
app.use(express.urlencoded({extended : true}));
app.use('/something', express.static(path.join(__dirname,'public','assets',)))



app.use(userRouter);
app.use(productRouter);

app.get('/',(req, res, next) => {
    console.log(1);
    next('route');
}, (req, res, next) => {
    console.log(2);
    next();
});

app.get('/',(req, res, next) => {
    console.log(3);
    next();
}, (req, res, next) => {
    res.send(`
    MY FIRST WEB SERVER on EXPRESS is SUCCESSFULLY WORKING ... <br>
    TRY TO <br> /, product/add, user/add <br>
    1. Create a npm project and install Express.js (Nodemon if you want) <br>
    2. Change your Express.js app which serves HTML files (of your choice with your content) for “/”, “/users” and “/products”. <br>
    3. For “/users” and “/products”, provides GET and POST requests handling (of your choice with your content) in different routers. <br> 
    4. Add some static (.js or .css) files to your project that should be required by at least one of your HTML files. <br>
    5. Customize your 404 page <br>
    6. Provide your own error handling <br>`);
    
});
app.use((err, req, res, next) => {
    res.status(500).send('Broken ...');
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views','404.html'));
 });

app.listen(9999, () => {
    console.log('listening 9999-------');
});