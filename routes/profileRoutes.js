const express = require('express')
const router = express.Router()

// middleware
const guestMiddleware = require('../middleware/guestMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const flasherMiddleware = require('../middleware/flasherMiddleware')

// profile page
router.get('/', authMiddleware, (req, res) => {
  const user = req.user
  res.render('profile', {title: 'Profile - GenshinMaster', user: user})
})

module.exports = router
