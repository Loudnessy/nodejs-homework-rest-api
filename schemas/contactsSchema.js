const Joi = require('joi');
const {Schema} = require('mongoose')
const emailRegexp = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
const addContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    phone: Joi.number().required(),
  })
  const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().pattern(emailRegexp),
    phone: Joi.number(),
  })
  const mongooseContactSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      match: emailRegexp
    },
    phone: {
      type: Number,
      required: true
    }
}, {versionKey: false, timestamps: true})
mongooseContactSchema.post("save", (error, data, next) => {
  error.status = 400
  next()
})
mongooseContactSchema.pre("findOneAndUpdate", function(next) {
  this.options.new = true
  this.options.runValidators = true
  next()
})
mongooseContactSchema.post("findOneAndUpdate", (error, data, next) => {
  error.status = 400
  next()
})

  module.exports = {
    addContactSchema,
    updateContactSchema,
    mongooseContactSchema
  }