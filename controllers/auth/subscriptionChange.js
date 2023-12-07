const { httpError } = require('../../helpers/httpError');
const { User } = require('../../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const subscriptionChange = async (req, res, next) => {
    try {
        const {_id} = req.user
        const {subscription} = req.body
        if (req.user.subscription === subscription) {
            throw httpError(400, `user subscription is already ${subscription}`)
        }
        const user = await User.findByIdAndUpdate(_id, {subscription})
        res.json(user)
    } catch (error) {
        next(error)
    }
}
module.exports = subscriptionChange