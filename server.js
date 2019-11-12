const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session');
const KnexSessionStore = require('connect-session-knex')(sessions);

const userRouter = require('./user/user-router');
const restrictedRouter = require('./restricted/restricted-router');
const knexConfig = require('./data/db-config');

const server = express();

const sessionConfig = {
    name: 'cat',
    secret: 'Keep it safe',
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        secure: false,
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStore({
        knex: knexConfig,
        createtable: true,
        clearInterval: 1000 * 60 * 30,
    }),
};

server.use(sessions(sessionConfig));
server.use(cors())
server.use(helmet());
server.use(express.json());

server.use('/api', userRouter);
server.use('/api/restricted', restrictedRouter);

server.get('/', (req, res) => {
    res.send('<h1>Authentication Server!</h1>');
});

module.exports = server;