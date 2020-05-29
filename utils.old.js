/* eslint-disable space-before-function-paren */
const Discord = require('discord.js')
const client = require('./lib/client')
const pastebin = require('./lib/pastebin')

client.on('message', async message => {
  if (message.author === client.user) return
  let {
    content,
    channel,
    member
  } = message
  if (!member) return

  // START USER COMMANDS
  if (content.startsWith('!share ')) {
    let voiceChannelID = message.content.slice(7, message.content.length)
    channel.send(`https://discordapp.com/channels/525666789984829441/${voiceChannelID}`)
    return
  }
  // END USER COMMANDS

  // START VIP ONLY COMMANDS
  // TODO
  // implement vip functions
  // if (!member.hasPermission('ADMINISTRATOR')) return
  // END VIP ONLY COMMANDS

  // START ADMIN ONLY COMMANDS
  if (!member.hasPermission('ADMINISTRATOR')) return

  if (content.startsWith('!refresh ')) {
    const name = message.content.slice(9, message.content.length)
    console.log(`refreshing ${name}`)
    client.emit('refresh', name)
    return
  }

  if (content === '!test') {
    channel.send('test')
    return
  }

  if (content.startsWith('pulisci schiavo')) {
    // TODO amount of message to delete
    await clearMessages(channel)
      .then(() => channel.send('una monetina?')
        .then(msg => {
          msg.react('💰')
          msg.delete(5000)
        })
      )
    return
  }

  if (content.startsWith('!stats')) {
    const role = message.content.slice(6, message.content.length).trim()
    client.emit('stats', role)
    return
  }

  if (content.startsWith('!pastebin message')) {
    const id = message.content.slice(17, message.content.length).trim()
    await pastebin.getPaste(id)
      .then(data => channel.send(data))
      .fail(msg => console.log(msg))
    message.delete()
    return
  }
  if (content.startsWith('!pastebin embed')) {
    const id = message.content.slice(15, message.content.length).trim()
    await pastebin.getPaste(id)
      .then(data => {
        // console.log(data)
        data = JSON.parse(data)
        channel.send({embed: data})
      })
      .fail(msg => console.log(msg))
    message.delete()
    return
  }
  if (content.startsWith('!pastebin')) {
    channel.send('USAGE: !pastebin message/embed XXXXXXXX (pastebin id)')
      .fail(msg => console.log(msg))
    message.delete()
  }
  // END ADMIN ONLY COMMANDS

  // message contains bot mention
  // if (content.includes(`<@${client.id}>`)) {
  //   if (!member.hasPermission('ADMINISTRATOR')) {
  //     message.reply('come ti permetti!?')
  //     return
  //   }
  //   message.reply('hai ragione u.u')
  // }
})

// let clearMessages = async function(channel) {
//   let fetched = await channel.fetchMessages({
//     limit: 10
//   })

//   if (!fetched.size) return

//   let deleted = []

//   fetched.forEach(msg => {
//     deleted.push(msg.delete(50))
//   })

//   await Promise.all(deleted)
//   await clearMessages(channel)
// }
let clearMessages = async function(channel) {
  await channel.fetchMessages({
    limit: 16
  })
    .then(async list => {
      await channel.bulkDelete(list)
    })
}
let getGuild = async function() {
  let guild = await client.guilds.find(guild => guild.id === '525666789984829441') // Extraterrestrial Intelligence
  return guild
}
let getChannelByName = async function(name) {
  let guild = await getGuild()
  let channel = await guild.channels.find(ch => ch.name === name)
  return channel
}
let getChannelById = async function(id) {
  let guild = await getGuild()
  let channel = await guild.channels.find(ch => ch.id === id)
  return channel
}
let getRoleByName = async function(name) {
  let guild = await getGuild()
  let role = await guild.roles.find(role => role.name === name)
  return role
}
let getRoleById = async function(id) {
  let guild = await getGuild()
  let role = await guild.roles.find(role => role.id === id)
  return role
}
let getMemberByName = async function(user) {
  let guild = await getGuild()
  let member = await guild.members.find(member => member.user === user)
  return member
}
let getMemberById = async function(id) {
  let guild = await getGuild()
  let member = await guild.members.find(member => member.id === id)
  return member
}
let createEmbed = function(data) {
  return new Discord.RichEmbed(data)
}

module.exports = {
  clearMessages,
  getChannelByName,
  getChannelById,
  getGuild,
  getRoleById,
  getRoleByName,
  getMemberByName,
  getMemberById,
  createEmbed
}
