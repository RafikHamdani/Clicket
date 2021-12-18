require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const connectDB = require('./db/connect')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/users', require('./routes/users'))
app.use('/api/tickets', require('./routes/tickets'))
app.use('/api/carts', require('./routes/carts'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/checkout', require('./routes/stripe'))

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()