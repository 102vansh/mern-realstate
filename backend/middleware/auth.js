const User = require('../models/user.model')
const {ErrorHandler} = require('../middleware/error')
const jwt = require('jsonwebtoken')

exports.isAuthenticated = async (req, res, next) => {
    try{
    const { token } = req.cookies
    console.log(token)
    if (!token) {
        return next(new ErrorHandler('Please Login to access this resource', 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    req.user = await User.findById(decoded.id)
    console.log(req.user)
    next()
    }catch(error){
        return next(new ErrorHandler('Please Login to access this resource', 401))
    }
}