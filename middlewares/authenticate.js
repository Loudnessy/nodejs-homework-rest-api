const jwt = require('jsonwebtoken')
const { httpError } = require('../helpers/httpError')
const { User } = require('../models/User')
const {JWT_SECRET} = process.env
const authenticate = async (req, res, next) => {
    const {authorization} = req.headers
    if (!authorization) {
        return next(httpError(401, "Authorization header not found"))
    }
    const [bearer, token] = authorization.split(" ")
    if (bearer !== "Bearer") {
         next(httpError(401))
    }
    try {
        const {id} = jwt.verify(token, JWT_SECRET)
        const user = await User.findById(id)
        if (!user) {
            throw httpError(401, "user not found")
        }
        req.user = user
        next()
    } catch (error) {
        next(httpError(401, error.message))
    }
    
}
module.exports = {
    authenticate
}