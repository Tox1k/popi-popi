const Discord = require('discord.js')
const token = process.env.Discord

const client = new Discord.Client()
client.login(token).catch(err => {
    console.log(err)
})

module.exports = client
