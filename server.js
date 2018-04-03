const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

const app = express()



mongoose.connect('mongodb://localhost:27017/zaki')
// mongoose.Promise = global.Promise

// console.log(path.join(__dirname, 'public/gallery'))

// app.use('/gallery', express.static(path.join(__dirname, 'gallery')));



app.use(bodyParser.json())



app.use('/api', require('./routes/productRoute'))

// app.use((err, req, res, next) => {
//     console.log(err)
//     console.log("err => "+err.message)
//     res.status(500).send({ message: err.message })
// })

app.listen(4000, () => {
    console.log("Listning to requests on port 4000 ......")
})

