const redis = require("redis");
let port = 6379
let host = "127.0.0.1"
const client = redis.createClient(port, host);

client.on('connect', function () {
    console.error('Redis client connected');
});

client.on('error', function (err) {
    console.error('Something went wrong ' + err);
});

class User {
    constructor(username, authorization_token) {
        this.username = username;
        this.authorization_token = authorization_token;
    }
}

function getUser(username) {
    return new Promise((res, rej) => {
        client.get(username, function (err, result) {
            if (error) {
                rej({ error: "Error in getUser" })
            } else {
                res(JSON.parse(result))
            }
        })
    })
}

function saveUser(username, authentication_token) {
    const userObject = new User(username, authentication_token)
    client.set(userObject.username, JSON.stringify(userObject))
}

module.exports = {
    user: User,
    getUser: getUser,
    saveUser: saveUser,
}