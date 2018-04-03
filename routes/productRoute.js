const express = require('express')
const fs = require('fs')
const multer  = require('multer')
const path = require('path')

const Product = require('../models/product')
const Image = require('../models/image')

const router = express.Router()

/////////// search for all products

router.get('/products', (req, res, next) => {
    console.log("GET request ...")
    Product.find({}).then((products) => {
        res.send(products)
    })
    .catch(next)
})

/////////// search for specific product

router.get('/products/:id', (req, res, next) => {
    Product.findOne({ _id: req.params.id }).then((product) => {
        res.send(product)
    })
    .catch(next)
})

/////////// add new product

const storage = multer.diskStorage({
    destination: './client/src/gallery',
    filename(req, file, cb) {
      cb(null, new Date().getTime() + '' + path.extname(file.originalname));
    },
  });

const upload = multer({ storage });

router.post('/products', upload.array('images2'), async (req, res, next) => {

    const { description, prix, isPromotion, prixPromotion } = req.body;

    const product = new Product({
        description, prix, isPromotion, prixPromotion,
        createDate: Date.now(),
        images: req.files.map(file => (
            {
                name: file.filename,
                size: file.size,
            }
        ))
    })


    const savedProduct = await product.save();
    
    res.send(product._id)


})

/////////// update product

router.put('/products/:id', (req, res, next) => {
    console.log("PUT request ...")
    Product.findByIdAndUpdate({ _id: req.params.id }, req.body).then((_product) => {
        res.send(true)
    })

})

/////////// delete product

router.delete('/products/:id', (req, res, next) => {
    console.log("DELETE request ...")

    Product.findByIdAndRemove({ _id: req.params.id }).then((_product) => {
        res.send(true)
    })

})

module.exports = router
