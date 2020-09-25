const UsersController = require('./controllers/usersController')
const validate = require('./controllers/validate');

module.exports = (app) => {
    app.post('/login', UsersController.login)

    app.post("/validate", function (jsonObj) {
        validate.SendForm(jsonObj);
    });

}