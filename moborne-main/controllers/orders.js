const Order = require('../models/Order')

const createOrder = async (req, res) => {
  try {
    // console.log(req.body, req.user.userId)
    console.log(req.body)
    const order = await Order.create({ userId: req.user.userId, ...req.body })
    res.status(201).json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params
    console.log(req.body)
    const order = await Order.findByIdAndUpdate(id, { ...req.body }, { new: true })
    res.status(200).json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params
    const order = await Order.findByIdAndDelete(id)
    res.status(200).json({ message: `Order was deleted` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// /find/:userId
const getUserOrder = async (req, res) => {
  try {
    const { userId } = req.params
    const order = await Order.find({ userId })
    res.status(200).json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// /order/:id
const getOrder = async (req, res) => {
  try {
    let { id } = req.params
    // id = "6196c58f30040536a31abcbd"
    console.log(id)
    const order = await Order.findById(id)
    // always read the error in the request
    // console.log(order)
    res.status(200).json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// /find 
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getMonthlyOrders = async (req, res) => {
  const { pid } = req.query
  console.log(pid)
  const date = new Date()
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
  // const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1))
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(pid && {
            products: { $elemMatch: { pid } }
          })
        }
      },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: "$amount"
        }
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" }
        }
      }
    ])
    res.status(200).json(income)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getOrder,
  getAllOrders,
  getMonthlyOrders
}