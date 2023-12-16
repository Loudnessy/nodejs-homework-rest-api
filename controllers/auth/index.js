const current = require("./current")
const login = require("./login")
const logout = require("./logout")
const register = require("./register")
const subscriptionChange = require("./subscriptionChange")
const verify = require("./verify")
const verifyByEmail = require("./verifyByEmail")
module.exports = {
    register,
    login,
    current,
    logout,
    subscriptionChange,
    verify,
    verifyByEmail
}