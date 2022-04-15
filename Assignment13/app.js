const { application } = require('express');
const express = require('express');
const bookRouter = require('./routes/bookRouter');

const app = express();

app.use(express.json());
app.use('/book', bookRouter);

app.use((req, res, next) => {
    res.status(404).json({error:req.url + ' API not supported !'});
})

app.use((err, req, res, next) => {
    if(err.message === 'NOT found') {
        res.status(404).json({error: err.message}); 
    }
    else {
        res.status(500).json({error: 'Something is wrong! '});
    }
})

app.listen(8080, () => {
    console.log('listening 8080-------');
});
// app.listen(process.env.PORT, () => {
//     console.log('Listening to port %s', process.env.PORT);
// })