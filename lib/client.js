const Discord = require('discord.js')
const token = process.env.Discord

const client = new Discord.Client()
client.login(token)

module.exports = client
