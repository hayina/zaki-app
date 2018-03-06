const mongoose = require('mongoose')

const producSchema = mongoose.Schema({

    description: { type: String },
    prix: { type: Number },
    isPromotion: { type: Boolean },
    prixPromotion: { type: Number }

})

module.exports = mongoose.model('product', producSchema)


