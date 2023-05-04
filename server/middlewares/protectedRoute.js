const User = require('../models/User');
const jwt = require('jsonwebtoken');

//protect endpoints so that only registered general users can access
const protectedRoute = async (req, res, next) => {
    //instate token to be updated if it exists in the headers
    let token; 
    //if token exists in header split off the prefix and update the instatiated token to be the jwt token ('bearer' prefix removed)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) 
        {
            token = req.headers.authroization.split(' ')[1]
        }
    //if there is no token then just the instatited token will remain undefined
    if (!token) throw new Error('Not authorized to access this route!')

    try {
        //verify token, retrieve user -> append to req object
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id)

        console.log(`authorized user ${req.user}`)
        next()
    } catch (err) {
        throw new Error('Error processing this jwt token')
    }
}

module.exports = protectedRoute;