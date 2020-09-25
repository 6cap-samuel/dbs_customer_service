const UsersController = require('./controllers/usersController')
const validate = require('./controllers/validate');

module.exports = (app) => {
    app.post('/login', UsersController.login)

    app.post("/validate", function(req, res) {
        validate.SendForm(req, res);
    });
    // app.get('/clear', RoomController.clearDB)
    // app.get('/question', QuestionsController.getRandomQuestion);
}