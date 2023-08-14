const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/service/userService')
const { registerSchema } = require('../modules/users/validations/authValidation')
const { joiErrorFormatter, mongooseErrorFormatter } = require('../utils/validationFormatter')
const passport = require('passport')
const guestMiddleware = require('../middleware/guestMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const flasherMiddleware = require('../middleware/flasherMiddleware')
const pfps = require('../utils/fetchPfp.mjs')

/**
 * Shows page for user registration
 */
router.get('/auth/register', guestMiddleware, flasherMiddleware, (req, res) => {
  console.log(pfps)
  return res.render('auth/register', {
    title: 'Register - GenshinMaster'
  })
})

/**
 * Handles user registration
 */
router.post('/auth/register', guestMiddleware, async (req, res) => {
  try {
    const validationResult = registerSchema.validate(req.body, {
      abortEarly: false
    })
    if (validationResult.error) {
      console.log(validationResult.error)
      req.session.flashData = {
        message: {
          type: 'error',
          body: 'Validation Errors'
        },
        errors: joiErrorFormatter(validationResult.error),
        formData: req.body
      }
      return res.redirect('/auth/register')
    }
    await addUser(req.body)
    req.session.flashData = {
      message: {
        type: 'success',
        body: 'Registration success'
      }
    }
    return res.redirect('/auth/register')
  } catch (e) {
    console.log(e)
    req.session.flashData = {
      message: {
        type: 'error',
        body: 'Validation Errors'
      },
      errors: mongooseErrorFormatter(e),
      formData: req.body
    }
    return res.redirect('/auth/register')
  }
})

/**
 * Shows page for user login
 */
router.get('/auth/login', guestMiddleware, flasherMiddleware, (req, res) => {
  return res.render('auth/login', {
    title: 'Login - GenshinMaster'
  })
})

/**
 * Logs in a user
 */
router.post('/auth/login', guestMiddleware, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      req.session.flashData = {
        message: {
          type: 'error',
          body: 'Login failed'
        }
      }
      return res.redirect('auth/login')
    }

    if (!user) {
      req.session.flashData = {
        message: {
          type: 'error',
          body: info.error
        }
      }
      return res.redirect('auth/login')
    }

    req.logIn(user, (err) => {
      // req.user = req.session.user
      req.session.user = user
      
      if (err) {
        console.log(err)
        req.session.flashData = {
          message: {
            type: 'error',
            body: 'Login failed'
          }
        }
      }
      return res.redirect('/')
    })
  })(req, res, next)
})

/**
 * Logs out a user
 */
router.get('/auth/logout', authMiddleware, (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
  })
  req.session.flashData = {
    message: {
      type: 'success',
      body: 'Logout success'
    }
  }
  return res.redirect('/')
})

module.exports = router
