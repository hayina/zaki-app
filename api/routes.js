const express = require('express')
const Product = require('../models/product')

const router = express.Router()

// search for all products
router.get('/products', (req, res, next) => {
    console.log("GET request ...")
    Product.find({}).then((products) => {
        res.send(products)
    })
    .catch(next)
})

// search for specific product
router.get('/products/:id', (req, res, next) => {
    Product.findOne({ _id: req.params.id }).then((product) => {
        res.send(product)
    })
    .catch(next)
})

// add new product
router.post('/products', (req, res, next) => {
    console.log("POST request ...", req.body)

    Product.create(req.body).then((_product) => {
        res.send(_product)
    })
    .catch(next)

})

// update product
router.put('/products/:id', (req, res, next) => {
    console.log("PUT request ...")
    Product.findByIdAndUpdate({ _id: req.params.id }, req.body).then((_product) => {
        res.send(true)
    })
    .catch(next)
})

// delete product
router.delete('/products/:id', (req, res, next) => {
    console.log("DELETE request ...")

    Product.findByIdAndRemove({ _id: req.params.id }).then((_product) => {
        res.send(true)
    })
    .catch(next)
})

module.exports = router
