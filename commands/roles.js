const client = require('../lib/client')
// const Discord = require('discord.js')
const mongoose = require('../lib/mongoose')

const { Guild } = require('../models/guild')

const { VerifyChannel } = require('../models/verify_channel')

client.on('message', async message => {
    if(message.author === client.user) return
    if(message.system) return
    if(message.guild === null) return

    const {content} = message
    if (content.startsWith('?popi permission update user')) {
      permissionUpdateUser(message)
      return
    }

})


let permissionUpdateUser = function(message) {
  let { guild, content, author,channel } = message
  const args = content.slice("?popi permission update user".length)
  // console.log(args.trim())

  let re = /[<@]?[&!]?([0-9]{18})>?[' ']+([1-4]{1})/g
  let [_, id, level] = re.exec(args)
  let user = {id: id, permissionLevel: Number(level)}

  message.reply(`Setting <@!${id}> permission level to \`${level}\`, are you sure?`)
  .then(async function (msg) {
    await message.delete()
    await msg.react('✔')
    await msg.react('❌')
    const filter = (reaction, discordUser) => {
      return (reaction.emoji.name === '✔' || reaction.emoji.name === '❌') && discordUser.id === author.id
    }

    const collector = msg.createReactionCollector(filter, { time: 15000 })

    collector.on('collect', async (reaction, reactionCollector) => {
      await msg.delete()
      if(reaction.emoji.name === '✔'){
        await Guild.updatePermissionUser(guild.id, user)
        channel.send(`<@!${id}> new permission level: \`${level}\``)
      }
    })
  })
}