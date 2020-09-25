const express = require('express');
const http = require('http');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');

const PORT = 3000;
const app = express();
const server = http.createServer(app);

const redis = require("redis");
let port = 6379
let host = "127.0.0.1"
const client = redis.createClient(port, host);

client.on('connect', function () {
    console.error('Redis client connected');
});

client.on('error', function (err) {
    console.error('Something went wrong ' + err);
});

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