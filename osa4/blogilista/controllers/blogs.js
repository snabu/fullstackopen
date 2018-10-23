const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


const formatBlog = (blog) => {
    return {
        id: blog._id,
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes
    }
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(formatBlog))
})

blogsRouter.post('/', async (request, response) => {
    let entry = request.body
    const blog = new Blog(entry)
    const result = await blog.save()
    response.status(201).json(result)
})

module.exports = blogsRouter
