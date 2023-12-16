const { httpError } = require("../../helpers/httpError")
const { User } = require("../../models/User")

const verify = async (req, res, next) => {
    try {
        const {verificationToken} = req.params
        const user = await User.findOne({verificationToken})
        const {_id} = user
        if (!user) {
            throw httpError(404, "User not found")
        }
        const updateUser = await User.findByIdAndUpdate(_id, {verify: true})
        res.status(200).json({
            message: 'verification successful'
        })
    } catch (error) {
        next(error)
    }
}
module.exports = verify