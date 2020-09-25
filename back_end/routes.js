const UsersController = require('./controllers/usersController')

module.exports = (app) => {
    app.post('/login', UsersController.login)
    // app.get('/clear', RoomController.clearDB)
    // app.get('/question', QuestionsController.getRandomQuestion);
}