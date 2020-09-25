const User = require("./user")


class Users {
    constructor() {
        this.users = {}
    }

    addUser(username, authorization_token) {
        let user = new User(username, authorization_token)
        this.users[user.username] = user
    }
}

module.exports = Users