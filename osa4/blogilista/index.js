const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const mongoUrl = 'mongodb://' + process.env.FULLSTACKOPEN_MLAB_USER + ':' + process.env.FULLSTACKOPEN_MLAB_PWD + '@ds239309.mlab.com:39309/fullstackopen'


app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)


mongoose.connect(mongoUrl)

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})