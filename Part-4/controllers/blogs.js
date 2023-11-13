const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  
  /*
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
  */
})

/*title": "All I Want for Christmas",
    "author": "Mariah Carey",
    "url": "mcarey.com",
    "likes"
    */

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  if(!blog.title || !blog.url) {
    response.status(400).end()
  } else {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }

  /*
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    */
})

module.exports = blogsRouter