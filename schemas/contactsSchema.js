const Joi = require('joi');
const {Schema} = require('mongoose')
const emailRegexp = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
const addContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string(),
    phone: Joi.number(),
    favorite: Joi.boolean().default(false)
  })
  const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.number(),
    favorite: Joi.boolean().default(false)
  })
  const updateFavoriteContactSchema = Joi.object({
    favorite: Joi.boolean().required()
  })
  const mongooseContactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
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
    mongooseContactSchema,
    updateFavoriteContactSchema
  }