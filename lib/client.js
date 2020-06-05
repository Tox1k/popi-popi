const { Client, Collection } = require('discord.js')
const token = process.env.Discord

const client = new Client({ retryLimit: 10 })
client.login(token).catch(err => {
  console.log(err)
})

client.commands = new Collection()
client.aliases = new Collection()

const handlers = ['commands']
handlers.forEach(handler => {
  require(`../handler/${handler}`)(client)
})

module.exports = client
