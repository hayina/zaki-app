const express = require('express')
const fs = require('fs')
const multer  = require('multer')
const path = require('path')

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

function createProduct(req, res, next) {

    Product.create(req.body)
        .then((product) => {
            req.product = product._id;
            next();
        })
        .catch(next)

}


const storage = multer.diskStorage({
    destination: './gallery',
    filename(req, file, cb) {
 
      cb(null, req.product + '_' + new Date().getTime() + '' + path.extname(file.originalname));
    },
  });

const upload = multer({ storage });

router.post('/products', createProduct, upload.array('images2'), (req, res, next) => {

    console.log("POST request ...", req.body)

    console.log("req.files ...", req.files)

    res.send(req.product)
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
