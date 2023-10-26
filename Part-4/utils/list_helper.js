const _ = require("lodash")


const dummy = (blogs) => {
  return 1
}


const totalLikes = (blog) => {
  let likes = 0

  blog.forEach(blog => {
    likes += blog.likes
  })

  return likes
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } 

  let mostLikedBlog = blogs[0]

  blogs.forEach(blog => {
    if(blog.likes > mostLikedBlog.likes) {
      mostLikedBlog = blog
    }
  })

  const result = {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes
  }
  return result
}


//returns the author who has the most blogs and the number of blogs
const mostBlogs = (blogs) => {
  const result = _(blogs)
  .countBy('author')
  .toPairs()
  .maxBy(_.last)


  if (result) {
    const [author, count] = result
    return { author, blogs: count }
  } else {
    return null
  }
}


//returns the author whose blog posts have the most likes
//take a look at Lodash again and learn what these are doing!
const mostLikes = (blogs) => {
  const authorLikes = _.groupBy(blogs, 'author')
  
  const authorTotalLikes = _.map(authorLikes, (authorBlogs, author) => ({
    author,
    likes: _.sumBy(authorBlogs, 'likes'),
  }))
  
  const maxAuthor = _.maxBy(authorTotalLikes, 'likes')
  
  return maxAuthor
}

module.exports = {
  dummy, 
  totalLikes, 
  favoriteBlog, 
  mostBlogs, 
  mostLikes
}