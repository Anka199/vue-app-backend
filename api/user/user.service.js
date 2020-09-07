const pool = require("../../config/database");

module.exports = {
    register: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO user SET ?`, data,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(new Error(err))
                    }
                });
        })
    },
    getUserByEmail: (email) => {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM user WHERE email= ?`, email,
                (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                });
        })
    }
}