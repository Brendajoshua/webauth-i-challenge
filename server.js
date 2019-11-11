const express = require('express');
const helmet = require('helmet');

const userRouter = require('./user/user-router');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api', userRouter);

server.get('/', (req, res) => {
    res.send('<h1>Authentication Server!</h1>');
});

module.exports = server;