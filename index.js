/* eslint-disable quotes */
/* eslint-disable camelcase */
require('./config/config')
const client = require('./lib/client')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
  // console.log('Client ready!')
  client.user.setStatus('Online')
  client.user.setPresence({
    game: {
      name: 'breaking free from quarantine'
      // type: 'STREAMING',
      // url: 'https://www.twitch.tv/user'
    }
  })
})

// Emit an event on message
// client.on('message', async message => {
//   let {
//     channel,
//     author
//   } = message
//   let {
// id,
//     name
//   } = channel
//   if (author === client.user) return
// switch (id) {
//   case '582615297077411859':
//     name = 'verifica'
//     break
//   case '616664589962313731':
//     name = 'ruoli'
//     break
// }
// try {
//   client.emit(name, message)
// } catch (e) {
//   console.log(e)
// }
// console.log(`#${channel.name}: ${author.username} -> ${content}`)
// })

client.on('messageReactionAdd', async (reaction, user) => {
  if (user === client.user) return

  let {
    message
  } = reaction
  let {
    channel
  } = message
  let {
    id,
    name
  } = channel
  switch (id) {
    case '582615297077411859':
      name = 'verifica'
      break
    case '616664589962313731':
      name = 'ruoli'
      break
  }
  if (typeof message.embeds !== 'undefined' && message.embeds.length > 0) {
    try {
      client.emit(`embed react ${name}`, message.embeds[0], reaction, user)
    } catch (e) {
      console.log(e)
    }
    return
  }

  try {
    client.emit(`react ${name}`, message, reaction, user)
  } catch (e) {
    console.log(e)
  }
  // console.log(`#${channel.name}: ${author.username} reacted with ${reaction.emoji.name}`)
})

// client.on('debug', console.log)
client.on('error', console.log)
client.on('ready', () => console.log('ready'))

client.on("messageDelete", message => {
  // console.log(`The message : "${message.content}" by ${message.author.tag} was deleted.`)
})

require('./channels/verifica')
require('./channels/videogiochi')
require('./channels/stats')

// require('./utils')
