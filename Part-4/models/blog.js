const mongoose = require('mongoose')


  const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    author: String,
    url: {
      type: String,
      require: true
    },
    likes: Number
  })

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString() //NOTE:  _id is an object so we changed it to string
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('Blog', blogSchema)