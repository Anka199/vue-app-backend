const { getHistory } = require("./history.service");
const { response } = require("../../helper/helper")

module.exports = {
    getHistory: (req, res) => {
        getHistory().then((result) => {
            response(res, result, 200, null)
        }).catch((err) => {
            console.log(err)
        })
    }
}