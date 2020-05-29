const { Guild } = require('../models/guild')
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
    const channel = guild.channels.get(channelId)
    const message = await channel.fetchMessage(messageId)
    console.log(message.content)

    for (const reaction of reactions) {
      const { emoji, roles } = reaction
      const filter = (reaction, user) => reaction.emoji.name === emoji
      const filter2 = (reaction, user) => true
      // const collector = message.createReactionCollector(filter2, { time: 0 })
      const collector = utils.createReactionCollector(message, filter2, { time: 0 })

      collector.on('collect', (reaction, user) => {
        console.log(user)
        const member = guild.member(user)
        // console.log(member)
        return
        for (const role of roles) {
          const r = utils.getRoleById(guildId, role)
          console.log(`adding ${r} to ${member.displayName}`)
          member.addRole(r)
        }
      })
    }
  }
}

module.exports = {
  load
}
