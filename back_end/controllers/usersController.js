const User = require('../models/user')

const url = "http://techtrek2020.ap-southeast-1.elasticbeanstalk.com"

class UsersController {



    static login(req, res) {
        const { username, password } = req.body
        console.log(username, password)
        res.status(400).json({ hello: "hello" })
    }
}

module.exports = UsersController