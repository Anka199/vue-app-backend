const express = require('express');
const productRouter = require("./products/product.router");
const userRouter = require("./user/user.router")
const historyRouter = require("./history/history.router")
const router = express.Router();

router
    .use("/products", productRouter)
    .use("/user", userRouter)
    .use("/history", historyRouter)
module.exports = router;