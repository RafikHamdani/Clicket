const express = require('express')
const router = express.Router()
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getUserOrder,
  getAllOrders,
  getMonthlyOrders
} = require('../controllers/orders')
const authUser = require('../middleware/authentication')

// api/orders
router.route('/').post(authUser, createOrder)

router.route('/:id').patch(authUser, updateOrder).delete(authUser, deleteOrder)

router.route('/find/order/:id').get(authUser, getOrder)

router.route('/find/:userId').get(authUser, getUserOrder)

router.route('/find').get(authUser, getAllOrders)

router.route('/monthly').get(authUser, getMonthlyOrders)

module.exports = router