const express = require('express')
const router = express.Router()
// validators
const { joiErrorFormatter, mongooseErrorFormatter } = require('../utils/validationFormatter')
const { productSchema } = require('../modules/products/validations/createValidation')
// model
const productm = require('../modules/products/models/product')
// add product
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
router.get('/create-item', authMiddleware, adminMiddleware, flasherMiddleware, (req, res) => {
  req.user = req.session.user
  res.render('admin/create-item', {title: 'Admin - create item'})
})

// creating item
router.post('/create-item', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const validationResult = productSchema.validate(req.body, {
      abortEarly: false
    })
    if (validationResult.error) {
      console.log(validationResult.error)
      req.session.flashData = {
        message: {
          type: 'error',
          body: 'Error ocured, check if item with same name already exists'
        },
        errors: joiErrorFormatter(validationResult.error),
        formData: req.body
      }
      return res.redirect('/admin/create-item')
    }
    await addProduct(req.body)
    req.session.flashData = {
      message: {
        type: 'success',
        body: 'Product created succsessfuly'
      }
    }
    return res.redirect('/admin/creation-suc')
  } catch (e) {
    console.log(e)
    req.session.flashData = {
      message: {
        type: 'error',
        body: 'Error ocured, check if item with same name already exists'
      },
      errors: mongooseErrorFormatter(e),
      formData: req.body
    }
    return res.redirect('/admin/create-item')
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

// creation success
router.get('/creation-suc', authMiddleware, adminMiddleware, (req, res) => {
  res.render('admin/creation-suc', {title: 'Item created succsessfully'})
})

module.exports = router
