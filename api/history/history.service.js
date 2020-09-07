const pool = require('../../config/database');

module.exports = {
    getHistory: () => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM history',
                (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                }
            )
        })
    }
}