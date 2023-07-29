const express = require('express')
const router = express.Router()

// db
const mongoose = require('mongoose')
const db = mongoose.connection

// model
const productm = require('../modules/products/models/product')

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
    product = await addProduct(req.body)

    res.send('Hallo!')

  } catch (e) {
    console.log(e)
  }
})

// item list page
router.get('/item-list', authMiddleware, adminMiddleware, (req, res) => {


  req.user = req.session.user
  const messageClass = 'create-item-active'

  productm.find({}).then((result) => {
    console.log(result)
    
    res.render('admin/item-list', {title: 'Admin - products', message: messageClass, products: result})
  
  })

  


})

module.exports = router
