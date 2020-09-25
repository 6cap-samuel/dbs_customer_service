const User = require('../models/user');
const axios = require('axios');
const { saveUser } = require('../models/user')

const url = "http://techtrek2020.ap-southeast-1.elasticbeanstalk.com";

class UsersController {



    static login(req, res) {
        const { username, password } = req.body;
        const params = { username: username, password: password }

        axios.post(url + '/login', params)
            .then((result) => {
                const authorization_token = result.data
                const user = new User(username, authorization_token)
                saveUser(user)
                res.status(400).send({ login_status: true });
            })
            .catch((err) => {
                console.log(err)
                res.status(404).send({ login_status: false })
            })
    }
}

module.exports = UsersController