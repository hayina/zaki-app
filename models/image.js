const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({

    name: { type: String },
    size: { type: Number },
    searchDefault: { type: Boolean, default: false },

})



module.exports = mongoose.model('image', imageSchema)


