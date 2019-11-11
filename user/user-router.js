const express = require('express');
const bcrypt = require('bcryptjs');

const users = require('./user-model');
const Protected = require('../middleware/protected');

const router = express.Router();

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    users.add(user)
    .then(newUser => {
        res.status(201).json(newUser);
    }).catch(err => {
        res.status(500).json({ message: 'fail to create user' });
    });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    if (username && password) {
        users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compare(password, user.password)) {
                res.status(200).json({ message: `welcome ${user.username}` });
            } else {
                res.status(401).json({ message: 'authentication denied' });
            }
        }).catch(err => {
            res.status(500).json(err);
        });
    } else {
        res.status(400).json({ message: 'please provide login credentials' });
    }
});

router.get('/users', Protected, (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).send(err);
    });
});

module.exports = router;