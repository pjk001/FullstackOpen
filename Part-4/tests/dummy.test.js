const listHelper = require('../utils/list_helper')

/*
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
*/

/*
describe('total likes', () => {
    const listWithMultipleBlogs = [
      {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 21,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(26)
  })
})
*/


describe('most likes', () => {
  const listWithMultipleBlogs = [
    {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f1',
    title: 'Go To Statement Considered Harmful',
    author: 'Harry E. Jones',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 1,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Go To Statement Considered Harmful',
    author: 'Ornata Obi',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 30,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f0',
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f0',
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 100,
    __v: 0
  }
]

  test('when list has multiple blogs, author with most blogs', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    const mostLikes = {
      author: 'Edsger W. Dijkstra',
      likes: 117
    }
    expect(result).toEqual(mostLikes)
  })


/*
  test('when list has multiple blogs, most liked blog has total likes of', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    const expectedBlog = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 30
    }
    expect(result).toEqual(expectedBlog)
  })
  */
})



