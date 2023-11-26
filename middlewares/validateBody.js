const { httpError } = require("../helpers/httpError")
const { addContactSchema, updateContactSchema } = require("../schemas/contactsSchema")

const validateBody = schema => {
  const func = async (req, res, next) => {
    const {error} = schema.validate(req.body)
    if (error) {
      return next(httpError(400, error.message))
    }
    next()
  }
  return func
}
module.exports = {
    validateBody
}