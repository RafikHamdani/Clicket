// const User = require('../models/User')
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    // console.log(authHeader)

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication is invalid' })
    }

    const token = authHeader.split(' ')[1]

    // will be added later
    const isCustomAuth = token.length < 500

    let decodedData
    if (token) {
      const payload = jwt.verify(token, process.env.JWT_SECRET)
      req.user = { userId: payload.userId, name: payload.name, isAdmin: payload.isAdmin }
      console.log(req.user)
    } else if (!token && isCustomAuth) {
      // to be added
      decodedData = jwt.decode(token)
      req.user = { userId: decodedData.jiti, name: decodedData.name }
    }
    next()
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

module.exports = auth