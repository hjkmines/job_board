const adminValidator = (req, res, next) => {
    // if user who made request is an admin, continue to the next middleware
    if (req.user.admin) {
        next()
    } else {
        res
        .status(401)
        .setHeader('Content-Type', 'application/json')
        .json({ msg: 'Unauthorized to access this resource!'})
    }
}

module.exports = adminValidator;