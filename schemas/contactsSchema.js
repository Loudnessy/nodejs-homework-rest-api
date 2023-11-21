const Joi = require('joi');
const addContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.number().required(),
  })
  const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.number(),
  })

  module.exports = {
    addContactSchema,
    updateContactSchema
  }