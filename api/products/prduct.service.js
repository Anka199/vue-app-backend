const pool = require('../../config/database');
const { actionQuery } = require("../../helper/helper")

module.exports = {
    create: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO produk SET ?`, data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getProducts: ({...arg }) => {
        console.log(arg)
        return actionQuery(`SELECT * FROM produk ${arg.search ? 'WHERE item LIKE ?' : ''} ORDER BY ?? ${arg.typeSort} LIMIT ${arg.limit} OFFSET ${arg.offset}`, arg.search ? [`%${arg.search}%`, arg.sortdata] : arg.sortdata)
    },
    countProduct: () => {
        return actionQuery(`SELECT count(*) AS totalData FROM produk`)
    },
    getProductById: (id) => {
        return actionQuery('SELECT * FROM produk WHERE id= ?', id)
    },
    getProductByCategory: (name) => {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM produk WHERE category Like '%${name}%'`,
                (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                }
            )
        })
    },
    searchProduct: (search) => {
        console.log(search)
        return actionQuery('SELECT * FROM produk WHERE item LIKE ?', `%${search}%`)
    },
    updateProduct: (id, data) => {
        return new Promise((resolve, reject) => {
            pool.query(` UPDATE produk SET ? WHERE id = ?`, [data, id],
                (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(new Error(err))
                    }
                }
            )
        })
    },
    deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            pool.query(`DELETE FROM produk WHERE id=?`, id,
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
};