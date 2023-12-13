const multer = require('multer')
const path = require('path')
const { httpError } = require('../helpers/httpError')
const destination = path.resolve("temp")
const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`
        const fileName = `${uniquePrefix}_${file.originalname}`
        cb(null, fileName)
    }
})
const limits = {
    fileSize: 5 * 1024 * 1024
}
const fileFilter = (req, file, cb) => {
    const extention = file.originalname.split(".").pop()
    if (extention === "exe" || extention === "rar" || extention === "zip") {
        return cb(httpError(400, "invalid file extention"))
    }
    cb(null, true)
}
const upload = multer({
    storage, 
    limits, 
    // fileFilter
})
module.exports = {
    upload
}