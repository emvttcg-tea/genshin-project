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

// add to cart
router.post('/cart', (req, res) => {
  // getting product id and assigning to variable
  const productID = req.body.productId

  // checking if array with items exsists, if yes pushes productId to it, if no, creates it and then pushes
  if(req.session.cartItems) {
    req.session.cartItems.push(productID)
  } else {
    req.session.cartItems = []
    req.session.cartItems.push(productID)
  }

  res.redirect('/cart')
})

router.get('/cart', (req, res) => {

  // getting array of items in cart
  const cartItems = req.session.cartItems

  // checking if there is items in cart, else sending no items
  if(cartItems) {

    //finding products from ids, then sending them
    productm.find().where("_id").in(cartItems).then((result) => {
      console.log(result)
      console.log('items!!!')
      res.render('products/cart', {title: 'Cart - GenshinMaster', cartItems: result})
    })

  } else {
    console.log('No items')
    res.render('products/cart', {title: 'Cart - GenshinMaster', cartItems: []})
  }
  
})

module.exports = router
