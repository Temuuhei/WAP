const User = require('../models/user');


module.exports.authenticate = (req, res, next) => {
    const userAuth = new User(req.body.username, req.body.password);
    const result = userAuth.authenticateUser();
    console.log('Login', result);
    res.status(200).json(result);
}