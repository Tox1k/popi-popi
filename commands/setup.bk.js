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
    // if (content.startsWith === "?popi") {
    //   setup(message)
    //   return
    // }
    // if (content.startsWith('popi setup help')) {
    //   help(message)
    //   return
    // }
    // if (content.startsWith('popi setup verifica json')) {
    //   verifica(message)
    //   return
    // }
    // if (content.startsWith('popi setup ruoli')) {
    //   help(message)
    //   return
    // }
    if (content.startsWith('?popi permission update user')) {
      permissionUpdateUser(message)
      return
    }

})

// let setup = async function(message) {
//   let { guild, channel } = message
//     let temp = await Guild.findGuild(guild.id)

//     if(temp === null){
//       const tempGuild = new Guild({
//         Id: guild.id,
//         premium: false
//       })
//       temp = await tempGuild.save()
//     }
//     //TODO PASTEBIN INSTRUCTIONS
//     help(message)
//     //fetch guild from db

// }

// let help = async function(message) {
//   let { channel } = message
//     //TODO PASTEBIN INSTRUCTIONS
//     channel.send('PER IL SETUP FAI QUESTO')
//     //fetch guild from db
// }

// let verifica = async function(message) {
//   let { guild, content } = message
//   const config = JSON.parse(content.slice("popi setup verifica json".length))
//   console.log(config)
//   let msg = ""
//   config["roles"].forEach(el => {
//     const {emoji, roles} = el
//     tempString = "".concat(emoji, " -> [", roles.join("+"), "]", "\n")
//     msg += tempString
//   })
//   message.channel.send(`
//   <#${config["channel_id"]}> -> msg_id:${config["message_id"]}
//   ${msg}
//   confermi?
// `)

// } 

let permissionUpdateUser = async function(message) {
  let { guild, content, author } = message
  const args = content.slice("?popi permission update user".length)
  // console.log(args.trim())

  let re = /[<@]?[&!]?([0-9]{18})>?[' ']+([1-4]{1})/g
  let [_, id, level] = re.exec(args)

  message.reply(`Setting <@!${id}> permission level to \`${level}\`, are you sure?`)
  .then(async function (msg) {
    await msg.react('✔')
    await msg.react('❌')
    const filter = (reaction, user) => {
      // return (reaction.emoji.name === '✔' || reaction.emoji.name === '❌') && user.id === message.author.id
      return (reaction.emoji.name === '✔' || reaction.emoji.name === '❌') && user.id === author.id
    }

    const collector = msg.createReactionCollector(filter, { time: 15000 })

    collector.on('collect', (reaction, reactionCollector) => {
      console.log(reaction)
      if(reaction.name === '✔');
    })
})

  // const filter = (reaction, user) => {
  //   return (reaction.emoji.name === '✔' || reaction.emoji.name === '❌') && user.id === message.author.id;
  // }

  // const collector = reply.createReactionCollector(filter, { max: 1, time: 0 })
  // const collector = new Discord.ReactionCollector(reply, filter, {max: 1, time: 0})

  // collector.on('collect', (reaction, user) => {
  //   console.log(`Collected ${reaction.emoji.name} from ${user.tag}`)
  // });

  // collector.on('end', collected => {
  //   console.log(`Collected ${collected.size} items`);
  // });

  // console.log(id, level)

}  
  // module.exports = {
  //   setup
  // }