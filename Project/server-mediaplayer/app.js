const express = require('express');
const Songs = require('./router/songs');

const app = express();
app.use(express.json());
app.use('/songs', Songs);

app.use((req, res, next) => {
    res.status(404).json({error : req.url + 'API NOT FOUND !'});
});

app.use((err, req, res, next) => {
    if(err.message == 'NOT Found') {
        res.status(404).json({error : err.message});
    }
    else {
        res.status(500).json({error : 'Something is wrong only GOD KNOWS :)'});
    }
})

app.listen(3000, () => {
    console.log('3000 ... Listening !');
} )

