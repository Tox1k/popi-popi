require('./config/config')
const mongoose = require('./lib/mongoose')
const client = require('./lib/client')

const { Guild } = require('./models/guild')

client.on("ready", function(){
  console.log(`the client becomes ready to start`)
  console.log(`I am ready! Logged in as ${client.user.tag}!`)
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)

  client.user.setActivity("popi-dev")
  client.user.setStatus('Online')

client.generateInvite(['ADMINISTRATOR'])
.then(link => {
  console.log(`Generated bot invite link: ${link}`)
  inviteLink = link
})
})

client.on("reconnecting", function(){
  console.log(`client tries to reconnect to the WebSocket`)
})

client.on("resume", function(replayed){
  console.log(`whenever a WebSocket resumes, ${replayed} replays`)
})

client.on("error", function(error){
  console.error(`client's WebSocket encountered a connection error: ${error}`)
})

client.on("disconnect", function(event){
  console.log(`The WebSocket has closed and will no longer attempt to reconnect`)
})

client.on("warn", function(info){
  console.log(`warn: ${info}`)
})

client.on("guildCreate", async function(guild){
  console.log(guild.id)
    let server = await Guild.findGuild(guild.id)

    if(server === null){
      const newGuild = new Guild({
        id: guild.id,
        premium: false
      })
      server = await newGuild.save()
    }

  console.log(`added guild with id: ${guild.id}`)
})

client.on("guildDelete",async function(guild){
  console.log(guild.id)
  const server = await Guild.findGuild(guild.id)
  if(server === null) return
  await server.remove()

  console.log(`removed guild with id: ${guild.id}`)
})


require('./commands/roles')
