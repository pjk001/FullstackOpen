const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
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

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  /*
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  */
})

//write a test that makes an HTTP GET request to the /api/blogs URL. 
//Verify that the blog list application returns
// the correct amount of blog posts in the JSON format.

test('blogs are returned as json', async() => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('correct number of blogs returned', async() => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})


test('the unique identifiers of each blog is named id', async() => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('verify that POST works successfully', async() => {
  const newBlog = {
    "title": "All I Want for Christmas",
    "author": "Mariah Carey",
    "url": "mcarey.com",
    "likes": 210
  }

  //finish 4.10 right below
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain(
    'All I Want for Christmas'
  )
})


test('verify blogs without likes default to zero likes', async() => {
  const blogWithoutLikes = {
    "title": "To Be or Not to Be",
    "author": "Shakespeare",
    "url": "shakespeare.com",
  }

  const response = await api
    .post('/api/blogs')
    .send(blogWithoutLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const createdBlog = response.body
  expect(createdBlog.likes).toEqual(0)


  const allBlogs  = await api.get('/api/blogs')
  expect(allBlogs.body).toHaveLength(initialBlogs.length + 1)
})


test('status code 400 for title/url missing in req data', async() => {
  /*
  const blogWithoutTitle = {
    "author": "Shakespeare",
    "url": "shakespeare.com",
    "likes": 24
  }
  */

  const blogWithoutUrl = {
    "title": "To Be or Not to Be",
    "author": "Shakespeare",
    "likes": 24
  }


  await api
    .post('/api/blogs')
    .send(blogWithoutUrl)
    .expect(400)


  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})


afterAll(async() => {
  await mongoose.connection.close()
})

