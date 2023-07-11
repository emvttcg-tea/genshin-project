const express = require('express')
const router = express.Router()
const guestMiddleware = require('../middleware/guestMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const flasherMiddleware = require('../middleware/flasherMiddleware')

// rendering the admin page
router.get('/dashboard', authMiddleware, (req, res) => {
  req.user = req.session.user
  res.render('admin/dashboard')
})

//create item page
router.get('/create-item', authMiddleware, (req, res) => {
  req.user = req.session.user
  console.log(req.originalUrl)
  res.render('admin/create-item')
})

module.exports = router
