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

function saveUser(userObject) {
    client.set(userObject.username, JSON.stringify(userObject))
}

module.exports = {
    user: User,
    getUser: getUser,
    saveUser: saveUser,
}