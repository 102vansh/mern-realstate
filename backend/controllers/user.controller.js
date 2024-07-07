const User = require('../models/user.model')
const {ErrorHandler} = require('../middleware/error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.createUser = async (req, res,next) => {
    try {
        const{username, email, password} = req.body
        if(!username || !email || !password){
            return next(new ErrorHandler('Please Enter All Fields', 400))
        }
        let user = await User.findOne({email})
        if(user){
            return next(new ErrorHandler('User Already Exists', 400))
        }
        user = await User.create({
            username, email, password
        })
        res.status(201).json({
            success: true,
            message: 'User Registered Successfully',
            user
        })
    }catch (error) {
        return next(error)
    }
}
exports.login = async (req, res,next) => {
    try {
        const {email, password} = req.body
        if(!email || !password){
            return next(new ErrorHandler('Please Enter All Fields', 400))
        }
        let user = await User.findOne({email}).select('+password')
        if(!user){
            return next(new ErrorHandler('Invalid Email or Password', 401))
        }
        const isPasswordMatched = await user.comparePassword(password)
        if(!isPasswordMatched){
            return next(new ErrorHandler('Invalid Email or Password', 401))
        }
        const token = await user.generateToken()
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.status(201).cookie('token',token,options).json({
            success: true,
            message: 'User Logged In Successfully',
            user,
            token
        })
    }catch (error) {
        return next(error)
    }
}
// exports.authgoogle = async(req, res,next) => {
// try{
// const user = await User.findOne({email:req.user.email})
// if(user){
//     const token = await user.generateToken()
//     res.status(201).cookie('token',token,{expires:new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),httpOnly:true}).json({
//         success: true,
//         message: 'User Logged In Successfully',
//         user
//     })
// }
// }catch(error){ 
//     const gneratepassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
//     const hashspassword = bcrypt.hashSync(gneratepassword, 10)
    
//     const user = await User.create({
//         username: req.body.name.split(' ').join('').toLowerCase() ,
//         email: req.body.email,
//         password: hashspassword
//     })
//     const token = await user.generateToken()
//     res.status(201).cookie('token',token,{expires:new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),httpOnly:true}).json({
//         success: true,
//         message: 'User Logged In Successfully',
//         user
//     })

// }

// }


exports.authgoogle = async (req, res, next) => {
  try {
    const user = await User.findOne({ email:req.body.email });
    if (user) {
      const token = await user.generateToken();
      return res.status(201).cookie('token', token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }).json({
        success: true,
        message: 'User Logged In Successfully',
        user,
      });
    } else {
      // Handle the case where the user is not found and needs to be created
      const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatePassword, 10);
      
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        avatar:req.body.photo
      });
      
      const token = await newUser.generateToken();
      return res.status(201).cookie('token', token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }).json({
        success: true,
        message: 'User Logged In Successfully',
        user: newUser,
      });
    }
  } catch (error) {
    console.error('Error during Google authentication:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
exports.deleteuser = async (req, res, next) => {
    try {
        if(req.user.id !== req.params.id){
            return next(new ErrorHandler('You are not allowed to delete this user', 403))
        }
        const user = await User.findById(req.params.id)
        if(!user){
            return next(new ErrorHandler('User Not Found', 404))
        }
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: 'User Deleted Successfully'
        })
    } catch (error) {
        return next(error)
    }
}
exports.logout = async (req, res, next) => {
    try {
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            message: 'User Logged Out Successfully'
        })
    } catch (error) {
        return next(error)
    }
}

exports.updareuser = async (req, res, next) => {

    try {
        if(req.user.id !== req.params.id){
            console.log(req.params.id)
            console.log(req.user.id)
            return next(new ErrorHandler('You are not allowed to update this user', 403))
        }
        const user = await User.findById(req.params.id)
        if(!user){
            return next(new ErrorHandler('User Not Found', 404))
        }
        req.body.password && user.password !== req.body.password && (await user.comparePassword(req.body.password))
        const updateuser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
            password: req.body.password,
            username: req.body.username,
            email: req.body.email,
            avatar: req.body.avatar
            }
        },{new:true})
        res.status(200).json({
            success: true,
            message: 'User Updated Successfully',
            updateuser
        })
    
        
        
}catch(error){
    return next(error)
}
}

exports.getuser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return next(new ErrorHandler('User Not Found', 404))
        }
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return next(error)
    }
}