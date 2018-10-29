const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const mongoose = require('mongoose')




blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(Blog.format))
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
        response.status(201).json(Blog.format(result))
    } catch (exception) {
        console.log(exception)
        response.status(500).send({ error: 'error' })
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        console.log("id is: ", request.params.id)
        await Blog.findByIdAndRemove(request.params.id)

        response.status(204).end()
    } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'malformatted id' })
    }
})

blogsRouter.put('/:id', async (request, response) => {


    if (!request.body.title || !request.body.author ||!request.body.url || !request.body.likes) {
        return response.status(400).send({error : 'Missing parameters'})
    }

    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes : request.body.likes
    }

    await Blog
        .findByIdAndUpdate(request.params.id, blog, { new: true } )
        .then(updatedBlog => {
            response.json(Blog.format(updatedBlog))
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

module.exports = blogsRouter
