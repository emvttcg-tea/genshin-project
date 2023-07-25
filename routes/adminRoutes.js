const express = require('express')
const router = express.Router()

// db
const mongoose = require('mongoose')
const db = mongoose.connection

const { addProduct } = require('../modules/products/service/productService')

// middleware
const flasherMiddleware = require('../middleware/flasherMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

// rendering the admin page
router.get('/dashboard', authMiddleware, adminMiddleware, (req, res) => {
  req.user = req.session.user
  const messageClass = 'side-link'
  res.render('admin/dashboard', {title: 'Admin', message: messageClass})
})

//create item page
router.get('/create-item', authMiddleware, adminMiddleware, (req, res) => {
  req.user = req.session.user
  const messageClass = 'create-item-active'
  res.render('admin/create-item', {title: 'Admin - create item', message: messageClass})
})

// creating item
router.post('/create-item', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    //console.log(req.body)

    product = await addProduct(req.body)

    // console.log(`Product is:    ${product}`)

    // const products = db.collection("products").find({}, { isDeleted: 0 })

    // console.log(products)

    res.send('Hallo!')

  } catch (e) {

  }
})

module.exports = router
