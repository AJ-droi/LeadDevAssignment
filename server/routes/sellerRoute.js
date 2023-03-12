const express = require('express')
const {
  sellerLogin,
  orderItems,
  deleteOrder,
  updateSeller,
  getSeller
} = require('../controller/sellerController')
const { auth } = require('../middleware/sellerAuth')

const router = express.Router()

router.post('/login', sellerLogin)
router.get('/order_items', auth, orderItems)
router.delete('/order_items/:id', auth, deleteOrder)
router.put('/account', auth, updateSeller)
router.get('/seller', auth, getSeller)

module.exports = router
