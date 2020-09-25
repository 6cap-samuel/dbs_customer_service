const userModel = require('../models/user');
const axios = require('axios');
const { saveUser, getUser } = require('../models/user')

const url = "http://techtrek2020.ap-southeast-1.elasticbeanstalk.com";

class UsersController {

    static login(req, res) {
        const { username, password } = req.body;
        const params = { username: username, password: password }

        axios.post(url + '/login', params)
            .then(result => {
                const authorization_token = result.data
                userModel.saveUser(username, authorization_token)
                res.status(200).send({ login_status: true });
            })
            .catch(err => {
                console.log(err)
                res.status(200).send({ login_status: false })
            })
    }

    static async extendSession(req, res) {

        const { username } = req.body

        user = await getUser(username)


    }

}

module.exports = UsersController