const express = require('express')
const router = express.Router()

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
router.post()

module.exports = router
