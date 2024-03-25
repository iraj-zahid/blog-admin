const mongoose = require('mongoose')

const signupSchema = new mongoose.Schema({
    email: String,
    password: String
})

const signupCheck = mongoose.model('loginDatas', signupSchema)

module.exports = signupCheck
