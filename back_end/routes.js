const UsersController = require('./controllers/usersController')

module.exports = (app) => {
    app.post('/login', UsersController.login)

}