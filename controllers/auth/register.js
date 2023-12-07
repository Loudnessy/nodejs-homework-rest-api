const { httpError } = require('../../helpers/httpError');
const { User } = require('../../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const register = async (req, res, next) => {
try {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (user) {
       throw httpError(409, "user with this email is already exist, try another")
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({...req.body, password: hashPassword})
    const payload = {
        id: newUser._id
     }
     const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"})
     await User.findByIdAndUpdate(newUser._id, {token})
    
    res.json({
        newUser,
        token
    })
} catch (error) {
  next(error)
}
}
module.exports = register