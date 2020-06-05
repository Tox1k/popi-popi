require('./config/config')
require('./lib/mongoose')
require('./lib/pastebin')
const client = require('./lib/client')

const { Guild } = require('./models/guild')

client.on('ready', async () => {
  try {
    await require('./loaders').load()
  } catch (err) {
    client.emit('error', err)
  }
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

client.on('message', async message => {
  if (message.author.bot) return
  if (!message.guild) return

  const { prefix } = message.guild
  if (message.content.trim() === `<@!${client.user.id}>`) {
    return message.channel.send(`prefix on server \`${prefix}\`\n \`${prefix}help\` for a list of commands`)
  }
  if (!message.content.startsWith(prefix)) return

  if (!message.member)message.member = await message.guild.members.fetch(message)

  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const cmd = args.shift().toLowerCase()

  if (cmd.length === 0) return

  let command = client.commands.get(cmd)
  if (!command) command = client.commands.get(client.aliases.get(cmd))

  try {
    if (command) command.run(client, message, args)
  } catch (err) {
    client.emit('error', err)
  }
})

require('./logs')

// client.on("guildDelete", async function(guild){
//   console.log(guild.id)
//   const server = await Guild.findGuild(guild.id)
//   if(server === null) return
//   await server.remove()

//   console.log(`removed guild with id: ${guild.id}`)
// })
// require('./commands/filter')
// require('./commands/roles')
// require('./commands/pastebin.js.bk')
