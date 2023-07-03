// config
require('dotenv').config()
const config = require('./utils/config')
require('./utils/db.config')

//express
const express = require('express')
const exsession = require('express-session')

// all others
const logger = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')

// strategies
require('./utils/authStrategies/localStrategy')
require('./utils/passportCon')


// middlewares
const authRoutes = require('./routes/authRoutes')
const authMiddleware = require('./middleware/authMiddleware')
const flasherMiddleware = require('./middleware/flasherMiddleware')

// cookies 
const cookieSession = require('cookie-session')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

// sessions
app.use(exsession({
  secret: 'youngteaisawesome',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))
app.use(logger('dev'))
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
app.get('/homepage', /*authMiddleware,*/ (req, res) => {
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
