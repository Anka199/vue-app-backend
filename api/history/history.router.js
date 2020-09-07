const express = require('express')
const { getHistory } = require('./history.controller')
const { verifyAccess } = require("../../auth/token_validation")
const router = express.Router()

router
    .get('/', verifyAccess, getHistory)

module.exports = router