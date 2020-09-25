const Users = require("../models/users");

const Users = require('../models/users')

class UsersController {
    constructor() {
        this.users = new Users()
    }

    login(req, res) {

    }
}

module.exports = UsersController