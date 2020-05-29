const Discord = require('discord.js')
const client = require('./lib/client')
const pastebin = require('./lib/pastebin')

const getGuild = function (id) {
  const guild = client.guilds.get(id)
  return guild
}
const getChannelByName = function (guildId, name) {
  const guild = getGuild(guildId)
  const channel = guild.channels.find(ch => ch.name === name)
  return channel
}
const getChannelById = function (guildId, id) {
  const guild = getGuild(guildId)
  const channel = guild.channels.get(id)
  return channel
}
const getMessageById = function (channel, id) {
  const message = channel.messages.find(message => message.id === id)
  return message
}
const getRoleByName = function (guildId, name) {
  const guild = getGuild(guildId)
  const role = guild.roles.find(role => role.name === name)
  return role
}
const getRoleById = function (guildId, id) {
  const guild = getGuild(guildId)
  const role = guild.roles.find(role => role.id === id)
  return role
}
const getMemberByName = function (guildId, user) {
  const guild = getGuild(guildId)
  const member = guild.members.find(member => member.user === user)
  return member
}
const getMemberById = function (guildId, id) {
  const guild = getGuild(guildId)
  const member = guild.members.find(member => member.id === id)
  return member
}
const createEmbed = function (data) {
  return new Discord.RichEmbed(data)
}

const createReactionCollector = function (message, filter, options) {
  return new Discord.ReactionCollector(message, filter, options)
}

module.exports = {
  getChannelByName,
  getChannelById,
  getMessageById,
  getGuild,
  getRoleById,
  getRoleByName,
  getMemberByName,
  getMemberById,
  createEmbed,
  createReactionCollector
}
