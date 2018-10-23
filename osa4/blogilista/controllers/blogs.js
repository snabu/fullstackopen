const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


const formatBlog = (blog) => {
    return {
        id: blog._id,
        author: blog.author,
        title: blog.title,
        url: blog.url
    }
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(formatBlog))
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogsRouter
