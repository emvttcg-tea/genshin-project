const express = require('express')
const router = express.Router()

// model
const productm = require('../modules/products/models/product')

// middleware

// products page
router.get('/products', (req, res) => {

  productm.find({}).then((result) => {
    //console.log(result)
    
    res.render('products/products', {title: 'Products - GenshinMaster', products: result})
  
  })

})

// product page
router.get('/products/:id', (req, res) => {
  console.log(req.params.id)

  productm.findById(req.params.id).then((result) => {
    console.log(result)

    res.render('products/product-page', {title: `${result.itemname} - GenshinMaster`, product: result})
  })

})

module.exports = router
