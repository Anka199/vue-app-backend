const {
    create,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductByCategory
} = require("./prduct.service");
const { response } = require("../../helper/helper")
const redis = require('redis')
const client = redis.createClient(6379);


module.exports = {
    createProduct: (req, res) => {
        console.log(req.file);
        const { item, category, price } = req.body
        const data = {
            item,
            category,
            date: new Date(),
            price,
            image: `http://localhost:3000/uploads/${req.file.filename}`
        }
        create(data).then((result) => {
            console.log(result)
            res.json(result)
        }).catch((err) => {
            console.log(err)
        })
    },
    getProductById: (req, res) => {
        const id = req.params.id;
        getProductById(id).then((result) => {
            response(res, result, 200, null)
        }).catch((err) => {
            console.log(err)
        })
    },
    getProductByCategory: (req, res) => {
        const name = req.params.name;
        getProductByCategory(name).then((result) => {
            response(res, result, 200, null)
        }).catch((err) => {
            console.log(err)
        })
    },
    getProducts: (req, res) => {
        const sortdata = req.query.sort || 'id';
        const typeSort = req.query.typesort || 'ASC'
        const search = req.query.search
        const limit = req.query.limit || 9
        const offset = ((req.query.page || 1) - 1) * limit
        getProducts({ sortdata, typeSort, search, limit, offset })
            .then((result) => {
                client.setex('getproducts', 60 * 60 * 24, JSON.stringify(result))
                response(res, result, 200, null, req.pagination)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    updateProduct: (req, res) => {
        const id = req.params.id
        const { item, category, price } = req.body
        const data = {
            item,
            category,
            date: new Date(),
            price,
            image: `http://localhost:3000/uploads/${req.file.filename}`
        }
        updateProduct(id, data).then((result) => {
            res.json({
                message: "data successfully updated",
                data: result
            })
        }).catch((err) => {
            console.log(err)
        });
    },
    deleteProduct: (req, res) => {
        const id = req.params.id
        deleteProduct(id).then((result) => {
            res.json({
                message: "data successfully deleted",
                data: result
            })
        }).catch((err) => {
            console.log(err)
        })
    }
}