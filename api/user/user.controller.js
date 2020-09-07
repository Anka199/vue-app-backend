const bcrypt = require("bcryptjs");
const {
    register,
    getUserByEmail
} = require("./user.service")
const jwt = require('jsonwebtoken');
const { response } = require("../../helper/helper");

module.exports = {
    register: (req, res) => {
        const { email, password, firstName, lastName } = req.body
        const data = {
            email,
            password,
            firstName,
            lastName,
            roleId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(data.password, salt, function(err, hash) {
                data.password = hash
                register(data).then((result) => {
                        response(res, result, 201, null)
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(500).json({
                            success: 0,
                            message: "database connection error"
                        })
                    })
            })
        });
    },
    login: (req, res) => {
        const { email, password } = req.body
        getUserByEmail(email)
            .then((result) => {
                if (result.length < 1) return response(res, { message: "email not found" }, 403, null)

                const user = result[0]
                const hash = user.password
                bcrypt.compare(password, hash).then((resCompare) => {
                    if (!resCompare) return response(res, { message: "invalid password" }, 403, null)
                    const payload = {
                        id: user.id,
                        email: user.email,
                        roleId: user.roleId
                    }
                    jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 }, (err, token) => {
                        user.token = token
                        delete user.password
                        delete user.createdAt
                        delete user.updatedAt
                        response(res, user, 200)
                    });

                });
            })
            .catch((err) => {
                console.log(err)
            })
    }
}