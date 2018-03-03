const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://localhost:27017/zaki')
mongoose.Promise = global.Promise

app.use(bodyParser.json())
app.use('/api', require('./api/routes'))

app.use((err, req, res, next) => {
    console.log("err => "+err.message)
    res.status(500).send({ message: err.message })
})

app.listen(4000, () => {
    console.log("Listning to requests on port 4000 ......")
})

