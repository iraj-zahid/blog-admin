const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
   title:String,
   metaTitle:String,
   metaDescription:String,
   description:String,
   imgName:String
},{collection: 'AllBlogs', dbName: 'AdminPanel' })

const Blog = mongoose.model('AllBlogs', blogSchema)

module.exports = Blog
