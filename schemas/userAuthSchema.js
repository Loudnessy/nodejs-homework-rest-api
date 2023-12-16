const {Schema} = require('mongoose')
const Joi = require('joi')
const { handleSaveError, preUpdate } = require('./hooks')
const userAuthJoiRegisterSchema = Joi.object({
    password: Joi.string().required(),
      email: Joi.string().required(),
      subscription: Joi.string().valid("starter", "pro", "business").default("starter"),
      avatarURL: Joi.string(),
      verify: Joi.boolean().default(false),
      verificationToken: Joi.string()
})
const userAuthJoiLoginSchema = Joi.object({
    password: Joi.string().required(),
      email: Joi.string().required(),
      token: Joi.string()  
})
const userAuthValidateSchema = Joi.object({
  email: Joi.string().required()
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
        avatarURL: String,
        token: String,
        verify: {
          type: Boolean,
          default: false,
        },
        verificationToken: {
          type: String,
          required: [true, 'Verify token is required'],
        },
}, {versionKey: false, timestamps: true})
userAuthMongooseSchema.post("save", handleSaveError)
userAuthMongooseSchema.pre("findOneAndUpdate", preUpdate)
userAuthMongooseSchema.post("findOneAndUpdate", handleSaveError)
  module.exports = {
    userAuthJoiRegisterSchema,
    userAuthJoiLoginSchema,
    userAuthMongooseSchema,
    userAuthValidateSchema
  }
