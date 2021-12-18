const Cart = require('../models/Cart')

const createCart = async (req, res) => {
  try {
    const cart = await Cart.create({ ...req.body })
    res.status(201).json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateCart = async (req, res) => {
  try {
    const { id } = req.params

    const cart = await Cart.findByIdAndUpdate(id, { ...req.body }, { new: true })
    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const deleteCart = async (req, res) => {
  try {
    const { id } = req.params
    const cart = await Cart.findByIdAndDalete(id)
    res.status(200).json({ message: `Cart was deleted` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getUserCart = async (req, res) => {
  try {
    // /find/:userId 
    const { userId } = req.params

    const cart = await Cart.findOne(userId)
    res.json(200).json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAllCarts = async (req, res) => {
  try {
    // find
    const carts = await Cart.find()
    res.status(200).json(carts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllCarts
}