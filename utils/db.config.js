const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/genshin-master', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
  console.log('connected to db')
})
