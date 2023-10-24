require('dotenv').config() //this defines PORT and everything in index.js from .env file first

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}