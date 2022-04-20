const jwt = require('jsonwebtoken');
usersList = [{
    "id": 1,
    "username": "Temka",
    "password": "1"
},
{
    "id": 2,
    "username": "Undraa",
    "password": " "
}];

loginLog = [];

// let uid = 2;

module.exports = class User {
    constructor(username, password){
        console.log('Constructor 111');
        this.id = null;
        this.username = username;
        this.password = password;
    }

    static generatedString(username) {
        return ;
    }

    authenticateUser() {
        let isExistUser = usersList.findIndex(a => a.username === this.username);
        if (isExistUser > -1) {
            if (usersList[isExistUser].password === this.password) {
                let resultOfLogin = {"id" : usersList[isExistUser].id,  "username":this.username, "date" : new Date().toString()};
                const token = jwt.sign(resultOfLogin, 
                    'key', {expiresIn: 3600});
                    resultOfLogin.token = token;
                loginLog.push({id : usersList[isExistUser].id, username:this.username, date : new Date().toString()});
                console.log(loginLog);
                return resultOfLogin;
            }else {
                console.log('Wrong Password or Username');
            }

            throw new Error('Incorrect Username or Password.')

        }
    }
}