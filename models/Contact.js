const {model} = require('mongoose')
const { mongooseContactSchema } = require('../schemas/contactsSchema')
const Contact = model("contact", mongooseContactSchema)
module.exports = {
    Contact
}