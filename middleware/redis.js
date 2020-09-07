const redis = require('redis')
const client = redis.createClient(6379)
const { response } = require("../helper/helper")
module.exports = {
    cacheGetProducts: (req, res, next) => {
        client.get('getProducts', (err, data) => {
            // console.log(data)
            if (err) throw err
            if (data !== null) {
                response(res, JSON.parse(data), 200)
            } else {
                next()
            }
        })
    },
    clearGetAllProducts: (req, res, next) => {
        client.del('getProducts')
        next()
    }
}