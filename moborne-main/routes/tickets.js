const express = require('express')
const router = express.Router()

const {
  getAllTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket
} = require('../controllers/tickets')
const authUser = require('../middleware/authentication')

// /api/tickets
router.route('/').get(getAllTickets).post(createTicket)

// /api/tickets/:id
router.route('/:id').get(getTicket).patch(authUser, updateTicket).delete(deleteTicket)

module.exports = router