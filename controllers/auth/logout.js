const { httpError } = require('../../helpers/httpError');
const { User } = require('../../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const logout = async (req, res, next) => {
    try {
       const {_id} = req.user 
       const user = await User.findByIdAndUpdate(_id, {token: ""})
       res.json("logout success")
    } catch (error) {
        next(error)
    }
}
module.exports = logout