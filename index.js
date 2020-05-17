require('./config/config')
const client = require('./lib/client')
const mongoose = require('./lib/mongoose')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
  // console.log('Client ready!')
  // console.log(client.user)
  client.user.setStatus('Online')
  client.user.setPresence({
    game: {
      name: 'breaking free from quarantine'
    }
  })
})

// client.on('debug', console.log)
client.on('error', console.log)
// require('./channels/verifica')
// require('./channels/videogiochi')
// require('./channels/stats')
require('./commands/setup')

// require('./utils')