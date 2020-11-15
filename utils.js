const Discord = require('discord.js')
const client = require('./lib/client')
// const pastebin = require('./lib/pastebin')

const getGuild = function (id) {
  const guild = client.guilds.cache.get(id)
  return guild
}
const getChannelByName = function (guildId, name) {
  const guild = getGuild(guildId)
  const channel = guild.channels.find(ch => ch.name === name)
  return channel
}
const getChannelById = async function (id) {
  const channel = await client.channels.fetch(id)
  return channel
}
const getMessageById = async function (channel, id) {
  const message = await channel.messages.fetch(id)
  return message
}

const getMessageByIdAndChannelId = async function (channelId, messageId) {
  const channel = await getChannelById(channelId)
  const message = await channel.messages.fetch(messageId)
  return message
}

const getRoleByName = function (guildId, name) {
  const guild = getGuild(guildId)
  const role = guild.roles.find(role => role.name === name)
  return role
}
const getRoleById = async function (guildId, id) {
  const guild = getGuild(guildId)
  const role = await guild.roles.fetch(id)
  return role
}
const getMemberByName = function (guildId, user) {
  const guild = getGuild(guildId)
  const member = guild.members.find(member => member.user === user)
  return member
}
const getMemberById = async function (guildId, id) {
  const guild = getGuild(guildId)
  const member = await guild.members.fetch(id)
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
  createReactionCollector,
  getMessageByIdAndChannelId
}
