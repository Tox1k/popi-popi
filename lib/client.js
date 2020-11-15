const { Client, Collection } = require('discord.js')
const token = process.env.Discord

const client = new Client({ retryLimit: 10 })
client.login(token).catch(err => {
  client.emit('error', err)
})

client.commands = new Collection()
client.aliases = new Collection()

module.exports = client
