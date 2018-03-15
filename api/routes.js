const express = require('express')
const fs = require('fs')
const multer  = require('multer')
const path = require('path')

const Product = require('../models/product')
const Image = require('../models/image')

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

const storage = multer.diskStorage({
    destination: './client/public/gallery',
    filename(req, file, cb) {
      cb(null, new Date().getTime() + '' + path.extname(file.originalname));
    },
  });

const upload = multer({ storage });

router.post('/products', upload.array('images2'), (req, res, next) => {

    // console.log("POST request ...", req.body)

    // console.log("req.files ...", req.files)


    const product = new Product(req.body)

    req.files.forEach((file) => {
        product.images.push({
            name: file.filename,
            size: file.size,
        })
    })


    product.save().then((product) => {
        res.send(product._id)
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
