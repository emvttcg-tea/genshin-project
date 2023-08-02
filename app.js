// config
require('dotenv').config()
const config = require('./utils/config')
require('./utils/db.config')

//express
const express = require('express')
const session = require('express-session')

// all others
const logger = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')

// routes
const authRoutes = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')
const adminRoutes = require('./routes/adminRoutes')
const productRoute = require('./routes/productRoute')

// middlewares
const authMiddleware = require('./middleware/authMiddleware')
const flasherMiddleware = require('./middleware/flasherMiddleware')
const guestMiddleware = require('./middleware/guestMiddleware')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

// sessions
app.use(session({
  secret: 'youngteaisawesome',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// strategies
require('./utils/authStrategies/localStrategy')

app.use(express.static('public'))
app.use(logger('dev'))
app.use(passport.initialize())
app.use(passport.session())

// access users to the views
app.use((req, res, next) => {
  res.locals.user = req.isAuthenticated() ? req.user : null
  next()
})

// routes
app.use('/', authRoutes)
app.use('/profile', profileRoutes)
app.use('/admin', adminRoutes)
app.use('/', productRoute)

app.locals.message = {}
app.locals.formData = {}
app.locals.errors = {}
app.locals.title = 'GenshinMaster'

// home page render
app.get('/', flasherMiddleware, (req, res) => {
  return res.render('index')
})

// no access
app.get('/no-access', (req, res) => {
  res.render('no-access')
})

// 404
app.use((req, res) => {
  return res.status(404).render('404')
})

app.listen(config.port, () => {
  console.log(`listenning to ${config.port}...`)
})

module.exports = app
