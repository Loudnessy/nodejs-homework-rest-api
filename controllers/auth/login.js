const { httpError } = require('../../helpers/httpError');
const { User } = require('../../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const login = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            throw httpError(404, `user with this ${email} is not found`)
         }
         const passwordCompare = await bcrypt.compare(password, user.password)
         if (!passwordCompare) {
            throw httpError(401, "Email or password is wrong")
         }
         const payload = {
            id: user._id
         }
         const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"})
         const newUser = await User.findByIdAndUpdate(user._id, {token})
         
         res.status(200).json({
            email: newUser.email,
            subscription: newUser.subscription,
            token: newUser.token
         })
    } catch (error) {
        next(error)
    }
}
module.exports = login