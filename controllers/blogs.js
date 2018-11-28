const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
    return {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
    }
}


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        if (body.title === undefined && body.url === undefined) {
            return response.status(400).json({ error: 'title AND url missing' })
        } 
        if (body.title === undefined) {
            return response.status(400).json({ error: 'title missing' })
        } 
        if (body.url === undefined) {
            return response.status(400).json({ error: 'url missing' })
        }

        const blog = new Blog ({
            title: body.title,
            author: body.author || 'Anonymous',
            url: body.url,
            likes: body.likes || 0
        })

        const savedBlog = await blog.save()
        response.json(formatBlog(savedBlog))

    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong' })
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

blogsRouter.put('/:id', (request, response) => {
    const body = request.body
  
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
  
    Blog
        .findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(formatBlog(updatedBlog))
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

module.exports = blogsRouter