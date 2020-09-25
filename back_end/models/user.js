class User {
    constructor(username, authorization_token) {
        this.username = username;
        this.authorization_token = authorization_token;
    }
}

module.exports = User