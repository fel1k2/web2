const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = db.user;

const signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        nickname: req.body.nickname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    user.save()
        .then(savedUser => {
            res.status(200).send({ message: "User successfully added" });
            console.log("User with name " + savedUser.username + " is added");
        })
        .catch(err => {
            res.status(500).send({ message: err });
        });
}

const signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User with " + req.body.email + " not found" });
            }

            return bcrypt.compare(req.body.password, user.password)
                .then(passwordIsValid => {
                    if (passwordIsValid) {
                        const token = jwt.sign({ id: user.id }, "some secret", { expiresIn: 1000 * 60 * 60 })
                        res.status(200).send({
                            message: "User is authenticated", user: {
                               username: user.username,
                               nickname: user.nickname,
                               token
                           }
                        });
                    } else {
                        res.status(404).send({ message: "Wrong email or password" });
                    }
                });
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        });
};

module.exports = {
    signup,
    signin
}