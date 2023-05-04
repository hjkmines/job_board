const User = require('../models/User')
const crypto = require('crypto');

//for '/user' endpoint
//get all users 
const getUsers = async (req,res,next) => {
    //query filter+options
    //instantiate filter and options object
    const filter = {};
    const options = {};
    //destructure possible queries from user
    const {
        userName,
        limit,
        sortByUserName
    } = req.query
    //if these destructured queries exist add them to the filter or options respectively
    if (userName) filter.userName = true;
    
    if (limit) options.limit = limit;
    if (sortByUserName) options.sort = {
        userName: sortByUserName
    }

    try {
        const users = await User.find()

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(users)

    }catch(err) {
        next(err)
    }
}

//add user
const postUser = async (req,res,next) => {
    try {
        const user = await User.create(req.body)
        sendTokenResponse(user, 201, res)
    }catch(err) {
        next(err)
    }
}

//delete all users
const deleteUsers = async (req,res,next) => {
    try {
        const users = await User.deleteMany();
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(users)
    } 
    catch(err) {
        next(err)
    }
}

//for '/user/:userId' endpoint - single resource handling
//get single user object
const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId)
        res
        .status(200)
        .setHeader('Content-Type','application/json')
        .json(user)
    } catch (err) {
        next(err)
    }
}

//update / put user 
const putUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new:true})

        res
        .status(200)
        .setHeader('Content-Type','application/json')
        .json(user)
    } catch (err) {
        next(err)
    }
}

//delete single user
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId)
        res
        .status(200)
        .setHeader('Content-Type','application/json')
        .json(user)
    }
    catch (err) {
        next(err)
    }
}

//for '/login' endpoint
const login = async (req, res, next) => {
    //send email and password to login 
    //destructure from req.body
    const { email, password } = req.body;

    //if no email or password
    if (!email || !password) throw new Error('Please provide an email and password');

    const user = await User.findOne({ email}.select('+password'))
    
    if (!user) throw new Error('User does not exist!');

    const isMatch = await user.matchPassword(password)

    if (!isMatch) throw new Error('Invalid Credentials')

    sendTokenResponse(user, 200, res)
}

//for forgot password
const forgotPassword = async ( req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) throw new Error('User does not exist!')

    const resetToken = user.getResetPasswordToken

    try { 
        await user.save({ validateBeforeSave: false})
        res
        .status(200)
        .setHeader('Content-Type','application/json')
        .json({
            msg: `Password has been reset with token: ${resetToken}`
        })
    } catch (err) {
        // if error do not hash + salt password or change tokens. Invalidate tokens?
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false})
        throw new Error('Failed to reset password')
    }
}

//for '/resetpassword'
const resetPassword = async ( req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.query.resetToken).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) throw new Error('Invalid token from user!')

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save()
    sendTokenResponse(user, 200, res)
}

//for '/updatepassword' 
const updatePassword = async ( req, res, next ) => {
    const user = await User.findById(req.user.id).select('+password')

    const passwordMatches = await user.matchPassword(req.body.password)

    if (!passwordMatches) throw new Error('Password is incorrect');

    user.password = req.body.newPassword

    await user.save();

    sendTokenResponse(user, 200, res);
}

//for 'logout'
const logout = async ( req, res, next) => {
    res.cookie('token', 'none', {
        expires: newDate(Date.now() + 10 * 1000),
        httpOnly: true
    })

    res
    .status(200)
    .setHeader('Content-Type', 'application')
    .json({ msg: 'Successfully logged out!' })
}

//send jwt token response 
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }

    res
    .status(statusCode)
    .cookie('token', token, options)
    .json(token)
}

module.exports = {
    getUsers,
    postUser,
    deleteUsers,
    getUser,
    putUser,
    deleteUser,
    login,
    forgotPassword,
    resetPassword, 
    updatePassword,
    logout
}