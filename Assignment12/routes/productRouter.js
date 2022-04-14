const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/product/add', function (req, res, next) {
    console.log(req.params, req.query);
    res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));    
});

router.use((req, res, next) => {
    const body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    });
    
    req.on('end', async ()=> {
        let obj = {};
        const parsedBody = Buffer.concat(body).toString();
        console.log(parsedBody);
        parsedBody.split("&").forEach(item => { //key = value
            console.log('****************');
            let each = item.split("=");
            obj[each[0]] = each[1];
        })
        req.body = obj;
    });
    next();
});

router.post('/product/save', (req, res, next) => {
    console.log(req.params, req.query);
    const postData = req.body;
    console.log(postData);
    res.send('Your product is saved !');
});


module.exports = router;

