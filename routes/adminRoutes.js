const express = require('express')
const router = express.Router()

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
    console.log(req.body)

    product = await addProduct(req.body)

    console.log(`Product is:    ${product}`)

    res.send('Hallo!')

  } catch (e) {

  }
})

// router.post('/auth/register', guestMiddleware, async (req, res) => {
//   try {
    
//     await addUser(req.body)
//     req.session.flashData = {
//       message: {
//         type: 'success',
//         body: 'Registration success'
//       }
//     }
    
//   } catch (e) {
//     console.log(e)
//     req.session.flashData = {
//       message: {
//         type: 'error',
//         body: 'Validation Errors'
//       },
//       errors: mongooseErrorFormatter(e),
//       formData: req.body
//     }
//     return res.redirect('/auth/register')
//   }
// })

module.exports = router
