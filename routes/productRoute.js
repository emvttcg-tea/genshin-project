const express = require('express')
const router = express.Router()

// model
const productm = require('../modules/products/models/product')

// middleware

productm.find({}).then((result) => {

  console.log(result)
  
  // products page
  router.get('/products', (req, res) => {
    res.render('products', {title: 'Products - GenshinMaster', products: result})
  })

})

module.exports = router
