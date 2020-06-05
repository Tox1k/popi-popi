const { Guild } = require('../models/guild')
const client = require('../lib/client')
const utils = require('../utils')

const load = async () => {
  // console.log(client.guilds)
  for await (const guild of Guild.find()) {
    initServer(guild)
  }
  // console.log(client.guilds)
}

const initServer = async (guildDoc) => {
  const { roleHandler, prefix } = guildDoc
  const guildId = guildDoc.id
  const guild = utils.getGuild(guildId)
  guild.prefix = prefix
  // client.guilds.cache.set(guildId, guild)

  for (const item of roleHandler) {
    const { channelId, messageId, reactions } = item
    const channel = await client.channels.fetch(channelId)
    const message = await channel.messages.fetch(messageId)
    const junkFilterWhitelist = []
    for (const reaction of reactions) {
      const { emoji, roles } = reaction
      junkFilterWhitelist.push(emoji)
      const filter = (reaction, user) => reaction.emoji.name === emoji && user.id !== client.user.id
      message.react(emoji)

      const collector = message.createReactionCollector(filter, { time: 0 })

      collector.on('collect', async (reaction, user) => {
        const member = await guild.members.fetch(user)
        for (const role of roles) {
          const r = await utils.getRoleById(guildId, role)
          client.emit('info', `adding ${r} to ${member.displayName}`)
          member.roles.add(r)
        }
      })
    }
    const junkFilter = (reaction, user) => !junkFilterWhitelist.includes(reaction.emoji.name)
    const junkCollector = message.createReactionCollector(junkFilter, { time: 0 })
    junkCollector.on('collect', (reaction) => reaction.remove())
  }
}

module.exports = {
  load
}
