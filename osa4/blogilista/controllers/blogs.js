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
    if (!request.body.title)
        return response.status(400).json({error : 'title missing'})
    if (!request.body.url)
        return response.status(400).json({error : 'url missing'})
    let entry = request.body
    const blog = new Blog(entry)
    try {
        const result = await blog.save()
        response.status(201).json(formatBlog(blog))
    } catch (exception) {
        console.log(exception)
        response.status(500).send({ error: 'error' })
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)

        response.status(204).end()
    } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'malformatted id' })
    }
})

module.exports = blogsRouter
