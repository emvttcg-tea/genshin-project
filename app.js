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

// middlewares
const authRoutes = require('./routes/authRoutes')
const authMiddleware = require('./middleware/authMiddleware')
const flasherMiddleware = require('./middleware/flasherMiddleware')

// cookies 
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
require('./utils/passportCon')

app.use(express.static('public'))
app.use(logger('dev'))
app.use(passport.initialize())
app.use(passport.session())
app.use('/', authRoutes)
app.locals.message = {}
app.locals.formData = {}
app.locals.errors = {}

// home page render
app.get('/', flasherMiddleware, (req, res) => {
  console.log(req.user)

  return res.render('index')
})

// homepage
app.get('/homepage', /** authMiddleware,*/ (req, res) => {
  if(req.isAuthenticated()){
    console.log('isAuthenticated 2')
  } else {
    console.log('not authenticated 2')
  }
  req.user = req.session.user

  console.log(req.user)

  res.send(`welcome ${req.user.username}`)
})

// 404
app.use((req, res) => {
  return res.status(404).render('404')
})

app.listen(config.port, () => {
  console.log(`listenning to ${config.port}...`)
})

module.exports = app
