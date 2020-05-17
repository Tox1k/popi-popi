const client = require('../lib/client')
const utils = require('../utils')
const pastebin = require('../lib/pastebin')
let verify

// let factions = [
//   {
//     emoji: '🥊',
//     id: '525733074810437642',
//     name: '🥊 Rivalsa'
//   }, {
//     emoji: '⚔',
//     id: '525732790348677171',
//     name: '⚔️ Resistenza'
//   }, {
//     emoji: '⚖',
//     id: '525733176744607751',
//     name: '⚖️ Equilibrio'
//   }, {
//     emoji: '🌪',
//     id: '628340086265610250',
//     name: '🌪️ Disordine'
//   }
// ]
let verificato = {
    emoji: '✅',
    id: '525733764215603221',
    name: '🔍 Verificato'
  }

let invasore = {
    emoji: '🌍',
    id: '577349472976371712',
    name: '🌍 Straniero'
}

client.on('refresh', async name => {
  if (name !== 'verifica') return
  refresh()
})

// Create an event listener for new guild members
client.on('guildMemberAdd', async member => {
  console.log(`${member.displayName} joined the server`)
  let channel = await utils.getChannelById('582615297077411859')

  channel.send(`${member.user}`)
    .then(msg => msg.delete())
})

// catch reactions on verify message
client.on('react verifica', async (message, reaction, user) => {
  let {name} = reaction.emoji
  if (message !== verify) return

  let member = await utils.getMemberById(user.id)

  // console.log(role_depressed_fuckers)
  //if english speaker
  if(name === '🌍'){
    let invasoreRole = await utils.getRoleById(invasore.id)
    member.addRole(invasoreRole)
    console.log(`[${member.displayName}] + ${invasore.name}\n`)
  }

  let cornicetta = await utils.getRoleById('616672773611323413')
  let verificatoRole = await utils.getRoleById('525733764215603221')
  // console.log(fazioneRole)
  member.addRole(verificatoRole) // verificato
  member.addRole(cornicetta) // verificato
  // reaction.remove(user)
  await utils.getChannelById('616664589962313731')// #ruoli-videogiochi
    .then(ch => ch.send(`${user}`))
    .then(msg => msg.delete())
  // console.log(`${user} -> ${name}`)
})

// send message in #verifica channel on bot start
client.on('ready', async () => {
  refresh()
})

let refresh = async () => {
  // console.log(`Logged in as ${client.user.username}!`)
  let verifica = await utils.getChannelById('582615297077411859')

  await utils.clearMessages(verifica)
  await pastebin.getPaste('MqJnEQnB')
    .then(function (data) {
    // data contains the raw paste
      verifica.send(data)
        .then(msg => {
          msg.react(verificato.emoji)
          msg.react(invasore.emoji)
          verify = msg
        })
    })
    .fail(msg => console.log(msg))
}
