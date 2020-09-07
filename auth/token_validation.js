const jwt = require('jsonwebtoken')
const { response } = require("../helper/helper")
module.exports = {
    verifyAccess: (req, res, next) => {
        let token = req.headers.authorization
        token = token.split(" ")[1]
        jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
            if (err) return response(res, { message: 'token invalid' }, 403)
            next()
        });

    }
}