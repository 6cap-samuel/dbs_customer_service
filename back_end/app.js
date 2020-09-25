const express = require('express');
const http = require('http');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');

const PORT = 3000;
const app = express();
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

app.use(cors())

// Log requests to the console.
app.use(logger('dev'));

// extract the body of an incoming request and parse into Json object
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
}));


//Routes for application
require('./routes.js')(app);

module.exports = app;