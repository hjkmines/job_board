const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/userController');
const protectedRoute = require('../middlewares/protectedRoute');
const adminValidator = require('../middlewares/utils/validator');

router.route('/')
    .get(protectedRoute, adminValidator, getUsers)
    .post(postUser)
    .delete(protectedRoute, adminValidator, deleteUsers)

router.route('/login')
    .post(login)

router.route('/forgotpassword')
    .post(forgotPassword)

router.route('/resetpassword')
    .put(resetPassword)

router.route('/updatepassword')
    .put(protectedRoute, updatePassword)

router.route('/logout')
    .get(protectedRoute, logout)

router.route('/:userId')
    .get(protectedRoute, getUser)
    .put(protectedRoute, putUser)
    .delete(protectedRoute, deleteUser)

module.exports = router;


