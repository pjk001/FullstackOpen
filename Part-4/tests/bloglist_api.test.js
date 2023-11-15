const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')



beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  /*
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
  */

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

  expect(response.body).toHaveLength(helper.initialBlogs.length)
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

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
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
  expect(allBlogs.body).toHaveLength(helper.initialBlogs.length + 1)
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
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})


//create a test_helper.js file just like part3-notes-backend and use the toJSON method we defined
//in order to get 'id' and not '_id'
test('deletion of a single blog', async() => {
  const blogsAtStart = await helper.blogsInDb() //we get the jsonified schema we defined in models.js
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)  

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})



test('updating a single blog', async() => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedLikes = {
    "likes": 100
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedLikes)
    .expect(200)

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length)

    const updatedBlog = response.body
    expect(updatedBlog.likes).toBe(100)
})


afterAll(async() => {
  await mongoose.connection.close()
})

