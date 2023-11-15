const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "The Grinch Who Stole Christmas",
    "author": "Dr.Seuss",
    "url": "drseuss.com",
    "likes": 47
  },
  {
    "title": "HTML is easy",
    "author": "HTML",
    "url": "onlyhtml.com",
    "likes": 21
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}