const client = require('../lib/client')
const mongoose = require('../lib/mongoose')

const { Guild } = require('../models/guild')

const { VerifyChannel } = require('../models/verify_channel')

client.on('message', async message => {
    if(message.system)return
    const {content} = message
    if (content === "popi setup") {
      setup(message)
      return
    }
    if (content.startsWith('popi setup help')) {
      help(message)
      return
    }
    if (content.startsWith('popi setup verifica json')) {
      verifica(message)
      return
    }
    if (content.startsWith('popi setup ruoli')) {
      help(message)
      return
    }

})

let setup = async function(message) {
  let { guild, channel } = message
    let temp = await Guild.findGuild(guild.id)

    if(temp === null){
      const tempGuild = new Guild({
        Id: guild.id,
        premium: false
      })
      temp = await tempGuild.save()
    }
    //TODO PASTEBIN INSTRUCTIONS
    help(message)
    //fetch guild from db

}

  let help = async function(message) {
    let { channel } = message
      //TODO PASTEBIN INSTRUCTIONS
      channel.send('PER IL SETUP FAI QUESTO')
      //fetch guild from db
  
}

let verifica = async function(message) {
  let { guild, content } = message
  const config = JSON.parse(content.slice("popi setup verifica json".length))
  console.log(config)
  let msg = ""
  config["roles"].forEach(el => {
    const {emoji, roles} = el
    tempString = "".concat(emoji, " -> [", roles.join("+"), "]", "\n")
    msg += tempString
  })
  message.channel.send(`
  <#${config["channel_id"]}> -> msg_id:${config["message_id"]}
  ${msg}
  confermi?
`)

}  
  // module.exports = {
  //   setup
  // }