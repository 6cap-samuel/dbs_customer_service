class Users {
    constructor() {
        this.users = {}
    }

    addUser(user) {
        this.users[user.username] = user
    }
}

module.exports = Users