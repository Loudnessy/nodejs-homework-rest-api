const {isValidObjectId} = require('mongoose')
const { httpError } = require('../helpers/httpError')
const isValidId = async (req, res, next) => {
    const {contactId} = req.params
    if (!isValidObjectId(contactId)) {
        return next(httpError(404, `${contactId} is not valid id`))
    }
    next()
}
module.exports = {
    isValidId
}