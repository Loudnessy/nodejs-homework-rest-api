const express = require('express')
const { isEmptyBody } = require('../../middlewares/isEmptyBody')
const { validateBody } = require('../../middlewares/validateBody')
const { isValidId } = require('../../middlewares/isValidId')
const { userAuthJoiRegisterSchema, userAuthValidateSchema } = require('../../schemas/userAuthSchema')
const { authenticate } = require('../../middlewares/authenticate')
const { register, login, current, logout, subscriptionChange, verify, verifyByEmail } = require('../../controllers/auth')
const { upload } = require('../../middlewares/upload')
const avatars = require('../../controllers/auth/avatars')



const authRouter = express.Router()
authRouter.post('/register', upload.single("avatar"), isEmptyBody, validateBody(userAuthJoiRegisterSchema), register)
authRouter.post('/login', isEmptyBody, validateBody(userAuthJoiRegisterSchema), login)
authRouter.get('/current', authenticate, current)
authRouter.post('/logout', authenticate, logout)
authRouter.patch('/', authenticate, subscriptionChange)
authRouter.patch('/avatars', authenticate, upload.single("avatar"), avatars)
authRouter.get('/verify/:verificationToken', verify)
authRouter.post('/verify', isEmptyBody, validateBody(userAuthValidateSchema), verifyByEmail)
module.exports = authRouter