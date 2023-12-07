const Joi = require('joi');
const {Schema} = require('mongoose');
const { handleSaveError, preUpdate } = require('./hooks');
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
  }, {versionKey: false, timestamps: true})
mongooseContactSchema.post("save", handleSaveError)
mongooseContactSchema.pre("findOneAndUpdate", preUpdate)
mongooseContactSchema.post("findOneAndUpdate", handleSaveError)

  module.exports = {
    addContactSchema,
    updateContactSchema,
    mongooseContactSchema,
    updateFavoriteContactSchema
  }