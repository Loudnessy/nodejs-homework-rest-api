const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require('path');
const { User } = require("../../models/User");
const avatars = async (req, res, next) => {
    try {
        const {_id} = req.user
        const pathToAvatars = path.resolve("public", "avatars")
        const newPath = path.join(pathToAvatars, req.file.filename)
        const image = await Jimp.read(req.file.path);
        await image.resize(250, 250).write(req.file.path);
        await fs.rename(req.file.path, newPath)
        const avatarPath = path.join(pathToAvatars, req.file.filename)
        const avatarURL = `/${avatarPath.slice(avatarPath.indexOf("\avatars")).replace(/\\/, "/")}`
         const user = await User.findByIdAndUpdate(_id, {avatarURL})
        
        res.status(200).json({
            user
        })
    } catch (error) {
        next(error)
    }
}
module.exports = avatars