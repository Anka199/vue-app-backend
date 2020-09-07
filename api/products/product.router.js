const router = require("express").Router();
const { createProduct, getProductById, getProductByCategory, getProducts, updateProduct, deleteProduct } = require("./product.controller");
const { verifyAccess } = require("../../auth/token_validation")
const { cacheGetProducts, clearGetAllProducts } = require("../../middleware/redis.js")
const multer = require("../../middleware/multer")
const { pagination } = require("../../middleware/pagination")

router
    .post("/", verifyAccess, clearGetAllProducts, multer.upload.single('image'), createProduct)
    .get("/", verifyAccess, cacheGetProducts, pagination, getProducts)
    .get("/:id", verifyAccess, getProductById)
    .get("/category/:name", verifyAccess, getProductByCategory)
    .patch("/:id", verifyAccess, multer.upload.single('image'), updateProduct)
    .delete("/:id", verifyAccess, deleteProduct)


module.exports = router;