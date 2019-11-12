const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('./user-model');
const Protected = require('../middleware/protected');

const router = express.Router();

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.add(user)
    .then(newUser => {
        // delete newUser.password // deletes the password key from the new user object if it existsts
        res.status(201).json(newUser);
    })
    .catch(err => {
        res.status(500).json({ message: 'fail to create user' });
    });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compare(password, user.password)) {
                req.session.username = user.username;
                res.status(200).json({ message: `Welcome ${user.username}` });
            } else {
                res.status(401).json({ message: 'auhentication denied' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            res.status(200).json({ message: 'you have logged out, bye!' });
        })
    } else {
        res.status(200).json({ message: 'alredy logged out' });
    }
});

module.exports = router;