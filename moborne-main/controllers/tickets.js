const Ticket = require('../models/Ticket')

const getAllTickets = async (req, res) => {
  try {
    const { page, search } = req.query
    console.log(req.query)
    // console.log(page)
    const LIMIT = 8
    const startIndex = (Number(page) - 1) * LIMIT

    let total = await Ticket.countDocuments({})
    // console.log(total)
    if (page && !search) {
      const tickets = await Ticket.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex)
      return res.status(200).json({ data: tickets, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) })
    } else if (page && search) {
      const searchTerm = new RegExp(search, "i")
      const tickets = await Ticket.find({ type: searchTerm }).sort({ _id: -1 }).limit(LIMIT).skip(startIndex)
      if (tickets) {
        // numberOfPages = Math.ceil(Tickets.length / LIMIT)
        return res.status(200).json({ data: tickets, currentPage: Number(page), numberOfPages: Math.ceil(tickets.length / LIMIT) })
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create({ ...req.body })
    res.status(201).json(ticket)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getTicket = async (req, res) => {
  try {
    const { id } = req.params
    const ticket = await Ticket.findById(id)
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket was not found' })
    }
    res.status(200).json(ticket)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateTicket = async (req, res) => {
  try {
    const { id } = req.params
    console.log(req.body)
    const ticket = await Ticket.findByIdAndUpdate(id, { ...req.body }, { new: true })
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket was not found' })
    }
    res.status(200).json(ticket)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params
    const ticket = await Ticket.findByIdAndDelete(id)
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket was not found' })
    }
    res.status(200).json(ticket)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAllTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket
}