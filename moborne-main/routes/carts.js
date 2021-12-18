const express = require('express')
const router = express.Router()
const {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllCarts
} = require('../controllers/carts')
const authUser = require('../middleware/authentication')
// const authAdmin = require('../middleware/authAdmin')

// api/carts
router.route('/').post(authUser, createCart)
router.route('/:id').patch(authUser, updateCart).delete(authUser, deleteCart)
router.route('/find/:userId').get(authUser, getUserCart)
router.route('/find').get(authUser, getUserCart)

module.exports = router