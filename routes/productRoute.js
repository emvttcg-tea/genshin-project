const express = require('express')
const router = express.Router()

// model
const productm = require('../modules/products/models/product')

// middleware

// products page
router.get('/products', (req, res) => {

  productm.find({}).then((result) => {
    //console.log(result)
    
    res.render('products', {title: 'Products - GenshinMaster', products: result})
  
  })

})

module.exports = router
