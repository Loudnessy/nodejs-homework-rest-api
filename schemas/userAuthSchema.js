const {Schema} = require('mongoose')
const Joi = require('joi')
const { handleSaveError, preUpdate } = require('./hooks')
const userAuthJoiRegisterSchema = Joi.object({
    password: Joi.string().required(),
      email: Joi.string().required(),
      subscription: Joi.string().valid("starter", "pro", "business").default("starter"),
})
const userAuthJoiLoginSchema = Joi.object({
    password: Joi.string().required(),
      email: Joi.string().required(),
      token: Joi.string()  
})

const userAuthMongooseSchema = new Schema({
        password: {
          type: String,
          required: [true, 'Set password for user'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: String  
}, {versionKey: false, timestamps: true})
userAuthMongooseSchema.post("save", handleSaveError)
userAuthMongooseSchema.pre("findOneAndUpdate", preUpdate)
userAuthMongooseSchema.post("findOneAndUpdate", handleSaveError)
  module.exports = {
    userAuthJoiRegisterSchema,
    userAuthJoiLoginSchema,
    userAuthMongooseSchema
  }
