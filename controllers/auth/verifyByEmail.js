const { httpError } = require("../../helpers/httpError")
const sendEmail = require("../../helpers/sendEmail")
const { User } = require("../../models/User")

const verifyByEmail = async (req, res, next) => {
    try {
        const {email} = req.body
        const user = await User.findOne({email})
        if (!user) {
           throw httpError(404, "not found") 
        }
        if (user.verify) {
            throw httpError(400, "Verification has already been passed")
        }

        const emailObj = {
            to: email,
            subject: "verify email",
            html: `<a href=http://localhost:3000/users/verify/${user.verificationToken}>verify email click here</a>`
        }
         sendEmail(emailObj)
         res.status(200).json({
            message: "Verification email sent"
         })
    } catch (error) {
       next(error) 
    }
}
module.exports = verifyByEmail