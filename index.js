require('./config/config')
require('./lib/mongoose')
const client = require('./lib/client')

const { Guild } = require('./models/guild')
require('./logs')

client.on('ready', async () => {
  await require('./loaders').load()
})

client.on('guildCreate', async (guild) => {
  let server = await Guild.findGuild(guild.id)

  if (server === null) {
    const newGuild = new Guild({
      id: guild.id,
      premium: false
    })
    server = await newGuild.save()
    client.emit('info', `added guild with id ${guild.id}`)
  } else {
    client.emit('info', `guild ${guild.id} already present in database!`)
  }
})

// client.on("guildDelete", async function(guild){
//   console.log(guild.id)
//   const server = await Guild.findGuild(guild.id)
//   if(server === null) return
//   await server.remove()

//   console.log(`removed guild with id: ${guild.id}`)
// })
require('./commands/roles')
