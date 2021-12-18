const express = require('express')
const router = express.Router()
const authenticateUser = require('../middleware/authentication')

const { login, signup, getAllUsers, getUser, deleteUser, updateUser } = require('../controllers/users')

// users
router.route('/login').post(login)
router.route('/signup').post(signup)

// admin
router.route('/').get(authenticateUser, getAllUsers)
router.route('/:id').get(authenticateUser, getUser).delete(authenticateUser, deleteUser).patch(authenticateUser, updateUser)


module.exports = router