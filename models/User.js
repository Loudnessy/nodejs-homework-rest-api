const {model} = require('mongoose')
const { userAuthMongooseSchema } = require('../schemas/userAuthSchema')
const User = model("user", userAuthMongooseSchema)
module.exports = {
    User
}