const pool = require("../config/database")

module.exports = {
    response: (res, result, status, err, pagination) => {
        const resultPrint = {}
        if (pagination) {
            resultPrint.pagination = pagination
        }
        resultPrint.status = 'success'
        resultPrint.status_code = status
        resultPrint.result = result
        resultPrint.err = err || "data not found"
        return res.status(resultPrint.status_code).json(resultPrint)
    },
    actionQuery: (...arg) => {
        console.log(arg)
        return new Promise((resolve, reject) => {
            pool.query(...arg, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    actionQuery: (...arg) => {
        console.log(arg)
        return new Promise((resolve, reject) => {
            pool.query(...arg, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}