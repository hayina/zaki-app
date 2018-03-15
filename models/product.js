const mongoose = require('mongoose')
const Image = require('./image')



const productSchema = mongoose.Schema({

    description: { type: String },
    prix: { type: Number },
    isPromotion: { type: Boolean, default: false },
    prixPromotion: { type: Number },
    images: [Image.schema]

})

module.exports = mongoose.model('product', productSchema)

