const express = require('express');
const path = require('path');
const router = express.Router();

router.use('/user/:uid/posts/:pid', (req,res) => {
    console.log('params', req.params);
    console.log('query string', req.query);
    res.send('something here');
});

router.use((req, res, next) => {
    console.log('inside 1st middleware 1');
    // res.send('Hi, You can See me now !!');//res.end same
    next();
})


router.get('/user/add', (req, res, next) => {
    // res.send('inside post/user');
    res.sendFile(path.join(__dirname, '..', 'views', 'add-user.html')); 
});

// router.get('/user/get', (req, res, next) => {
//     res.send('inside get/user');
// });

router.post('/user/save', (req, res, next) => {
    console.log(req.params, req.query);
    const postData = req.body;
    console.log(postData);
    res.send('Your User is saved !');
});

// router.all('/user/*', (req, res) =>{
//     res.send('inside ALL user');
// });

// router.use('/user', (req, res, next) => {
//     console.log('inside /user middleware 2 ......');
//     res.send(
//         '/user being called'
//     );
// });

module.exports = router;

