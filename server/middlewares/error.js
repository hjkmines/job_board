const errorHandler = (err, req, res, next) => {
    res
    .status(err.statusCode || 500)
    .setHeader('Content-Type','application/json')
    .json({ message: err.message || 'Server Error'})
}

module.exports = errorHandler;