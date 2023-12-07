const { httpError } = require('../../helpers/httpError');
const { User } = require('../../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const current = async (req, res, next) => {
    try {
        const {subscription, email} = req.user
        res.json({
            subscription,
            email
        })
    } catch (error) {
        next(error)
    }
}
module.exports = current