const User = require('../models/User')

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide an eamil and a password' })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Something went wrong, try again later.' })
    }

    const token = user.createJWT()

    res.status(200).json({ userId: user._id, name: user.name, isAdmin: user.isAdmin, token })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const signup = async (req, res) => {
  try {
    const user = await User.create({ ...req.body })
    const token = user.createJWT()

    res.status(201).json({ userId: user._id, name: user.name, isAdmin: user.isAdmin, token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// admin related features

const getAllUsers = async (req, res) => {
  try {
    console.log(req.user)
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findOne({ id })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndDelete({ id })
    // we could filter that user out of state.users
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndUpdate(id, req.body, { new: true })
    // we could update that user out of state.users
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { login, signup, getAllUsers, getUser, deleteUser, updateUser }