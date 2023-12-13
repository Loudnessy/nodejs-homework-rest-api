const { httpError } = require('../../helpers/httpError');
const { User } = require('../../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const gravatar = require('gravatar');
const register = async (req, res, next) => {
try {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (user) {
       throw httpError(409, "Email in use")
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const gravatarUrl = await gravatar.url(email, {s: '200', r: 'pg', d: '404'}).replace("//", '')
    const newUser = await User.create({...req.body, password: hashPassword, avatarURL: gravatarUrl})
    const payload = {
        id: newUser._id
     }
     const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"})
     await User.findByIdAndUpdate(newUser._id, {token})
    
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    })
} catch (error) {
  next(error)
}
}
module.exports = register


// const register = async (req, res, next) => {
//     try {
//         const pathToAvatars = path.resolve("public", "avatars")
//         console.log(req.file);
//         const newPath = path.join(pathToAvatars, req.file.filename)
//         await fs.rename(req.file.path, newPath)
//         const gravatarUrl = gravatar.url(email, {s: '200', r: 'pg', d: '404'})
//         const newUser = await User.create({...req.body, password: hashPassword, avatarURL: gravatarUrl})
//         const payload = {
//             id: newUser._id
//          }
//          const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"})
//          await User.findByIdAndUpdate(newUser._id, {token})
        
//         res.status(201).json({
//             email: newUser.email,
//             subscription: newUser.subscription,
//         })
//     } catch (error) {
//       next(error)
//     }
//     }
