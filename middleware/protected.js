// const bcrypt = require('bcryptjs');

// const Users = require('../user/user-model');

// module.exports = function protected(req, res, next) {
//     let { username, password } = req.headers;
//     if(username && password) {
//         Users.findBy({ username })
//         .first()
//         .then(user => {
//             if (user && bcrypt.compareSync(password, user.password)) {
//                 next();
//             } else {
//                 res.status(401).json({ message: 'authentication denied' });
//             }
//         });
//     } else {
//         res.status(400).json({ message: 'please provide credentials' });
//     }
// };

module.exports = (req, res, next) => {
    if (req.session && req.session.username) {
        next();
    } else {
        res.status.json({ message: 'Authentication denied' });
    }
};