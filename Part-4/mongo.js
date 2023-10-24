const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = 
  `mongodb+srv://philipjwkim:${password}@cluster0.ha0jojo.mongodb.net/blogList?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: 'No good',
  author: 'Harry Potter',
  url: 'jupyterjoe.org',
  likes: 2
})

/* use this to to test that a blog gets correctly saved to MongoDB
blog.save().then(result => {
  console.log('blog saved!')
  mongoose.connection.close()
})
*/

//to restrict our searchQuery in the Blog database, we can do something like
//Blog.find({ likes: 2 }).then(result => {
  //...
//})


Blog.find({}).then(result => {
  result.forEach(blog => {
    console.log(blog)
  })
  mongoose.connection.close()
})