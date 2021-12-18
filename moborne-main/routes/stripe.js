const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_KEY)

// api/checkout
router.post('/payment', (req, res) => {
  // const { tokenId, amount } = req.body
  // console.log(tokenId)
  // console.log(amount)
  stripe.charges.create({
    // in the front end send the tokenId and the amount
    source: req.body.tokenId,
    amount: req.body.amount,
    currency: "usd"
  }, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).json(stripeErr)
    } else {
      res.status(200).json(stripeRes)
    }
  })
})

// router.get('/payment', (req, res) => {
//   res.send('<h1>it will work soon</h1>')
// })

module.exports = router