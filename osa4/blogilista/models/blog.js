const mongoose = require('mongoose')

const mongoUrl = 'mongodb://' + process.env.FULLSTACKOPEN_MLAB_USER + ':' + process.env.FULLSTACKOPEN_MLAB_PWD + '@ds239309.mlab.com:39309/fullstackopen'

mongoose.connect(mongoUrl)


const Blog = mongoose.model('Blog', {
    title: String,
    author: String,
    url: String,
    likes: Number
})

module.exports = Blog