const UsersController = require('./controllers/usersController')
const Validate = require('./controllers/validate');

module.exports = (app) => {
    app.post('/login', UsersController.login)

    app.post("/validate", Validate.SendForm)

}