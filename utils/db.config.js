const config = require('./config')
const mongoose = require('mongoose')
mongoose.connect(config.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
  console.log('connected to db')
})
