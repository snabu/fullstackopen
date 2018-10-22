const config = require('./utils/config')
const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')


app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)


console.log(config.mongoUrl)
mongoose
    .connect(config.mongoUrl)
    .then( () => {
        console.log('connected to database', config.mongoUrl)
    })
    .catch( err => {
        console.log(err)
    })


const server = http.createServer(app)

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
    mongoose.connection.close()
})

module.exports = {
    app, server
}