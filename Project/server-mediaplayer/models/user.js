users = [{
    "id": 1,
    "username": "Ka Mixtape-5",
    "password": "2022-04-17"
},
{
    "id": 2,
    "username": "Ka Mixtape-4",
    "password": "2022-04-17"
}];



module.exports = class User {
    constructor(id, username, password){
        this.id = id;
        this.username = username;
        this.password = password;
    }
}