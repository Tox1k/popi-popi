const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/popi', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('connected to mongodb!'))

module.exports = mongoose
