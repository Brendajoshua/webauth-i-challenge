const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('../user/user-model');
const Protected = require('../middleware/protected');

const router = express.Router();

router.get('/users', Protected, (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).send(err);
    });
});

router.get('./users/:id', Protected, (req, res) => {
    Users.findById(req.params.id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).send(err);
    });
});

module.exports = router;