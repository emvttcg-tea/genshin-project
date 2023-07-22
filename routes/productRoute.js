const express = require('express')
const router = express.Router()

const productsData = require('../utils/products')

// middleware

// products page
router.get('/products', (req, res) => {
  res.render('products', {title: 'Products - GenshinMaster', products: productsData.products})
})

module.exports = router
