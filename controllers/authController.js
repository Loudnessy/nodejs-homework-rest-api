const { httpError } = require('../helpers/httpError');
const { User } = require('../models/User');
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
const login = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            throw httpError(404, `user with this ${email} is not found`)
         }
         const passwordCompare = await bcrypt.compare(password, user.password)
         if (!passwordCompare) {
            throw httpError(401, "the password is not correct")
         }
         const payload = {
            id: user._id
         }
         const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"})
         await User.findByIdAndUpdate(user._id, {token})
         res.json({token})
    } catch (error) {
        next(error)
    }
}
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
const logout = async (req, res, next) => {
    try {
       const {_id} = req.user 
       const user = await User.findByIdAndUpdate(_id, {token: ""})
       res.json("logout success")
    } catch (error) {
        next(error)
    }
}
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
module.exports = {
    register,
    login,
    current,
    logout,
    subscriptionChange
}
