const { Guild } = require('../models/guild')
const client = require('../lib/client')
const utils = require('../utils')

const load = async () => {
  for await (const guild of Guild.find()) {
    initServer(guild)
  }
}

const initServer = async (guild) => {
  const { roleHandler } = guild
  const guildId = guild.id

  for (const item of roleHandler) {
    const { channelId, messageId, reactions } = item
    const guild = utils.getGuild(guildId)
    const channel = await client.channels.fetch(channelId)
    const message = await channel.messages.fetch(messageId)

    for (const reaction of reactions) {
      const { emoji, roles } = reaction
      const filter = (reaction, user) => reaction.emoji.name === emoji && user.id !== client.user.id
      const junkFilter = (reaction, user) => reaction.emoji.name !== emoji
      message.react(emoji)

      const collector = message.createReactionCollector(filter, { time: 0 })
      const junkCollector = message.createReactionCollector(junkFilter, { time: 0 })

      junkCollector.on('collect', (reaction) => reaction.remove())

      collector.on('collect', async (reaction, user) => {
        const member = await guild.members.fetch(user)
        for (const role of roles) {
          const r = await utils.getRoleById(guildId, role)
          client.emit('info', `adding ${r} to ${member.displayName}`)
          member.roles.add(r)
        }
      })
    }
  }
}

module.exports = {
  load
}
