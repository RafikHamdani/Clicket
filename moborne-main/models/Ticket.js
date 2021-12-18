const mongoose = require('mongoose')

const TicketSchema = new mongoose.Schema({
  // train or plane
  type: { type: String, required: true },
  duration: { type: Number, required: false },
  image: { type: String, required: false },
  // class 1 / class 2 / class 3
  class: { type: Number, required: true },
  price: { type: Number, required: true },
  // changes based on the number of tickets bought
  seats: { type: Number, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Ticket', TicketSchema)