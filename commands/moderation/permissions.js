const { Guild } = require('../../models/guild')

module.exports = {
  name: 'permissions',
  aliases: ['permissions-update', 'update-permissions'],
  category: 'moderation',
  defaultPermission: 4,
  description: 'change permission level for a user or a role',
  usage: '`@mention` `level`',
  run: async (client, message, args) => {
    if (args.length < 2 || !Array.isArray(args)) {
      return message.channel.send('invalid arguments!')
    }
    if (message.mentions.everyone) {
      return message.channel.send('Error, use `@@everyone` instead of the regular everyone mention!')
    }
    const { mentions } = message

    let permissionLevel = 0
    try {
      permissionLevel = parseInt(args.shift())
    } catch (err) {
      client.emit('error', err)
      return message.channel.send('Invalid permission level')
    }

    if (permissionLevel < 0 || permissionLevel > 4) {
      return message.channel.send('Error, permissionLevel must be a value between 1 and 4')
    }
    const toSend = []
    for (const user of message.mentions.users.values()) {
      // console.log(user.id)
      await Guild.permissionUser(message.guild.id, user.id, permissionLevel)
      toSend.push(`<@!${user.id}> new permission level: \`${permissionLevel}\``)
    }

    for (const role of message.mentions.roles.values()) {
      // console.log(role.id)
      await Guild.permissionRole(message.guild.id, role.id, permissionLevel)
      toSend.push(`<@&${role.id}> new permission level: \`${permissionLevel}\``)
    }
    return message.channel.send(toSend.join('\n'))
    // console.log(mentions)
    // console.log(args)
  }

}

const permissionUpdateUser = function (message) {
  const { guild, content, author, channel } = message
  const args = content.slice('?popi permission user'.length)
  // console.log(args.trim())

  const re = /<@[&]?([0-9]{18})>/g
  const result = re.exec(args)
  if (result === null) {
    message.reply('Wrong usage!\n?popi permission user `user_id` `permission_level` ')
    return
  }
  const [_, id, level] = result
  // const user = { id: id, permissionLevel: Number(level) }
  const userId = id
  const permissionLevel = level

  channel.send(`Setting <@!${id}> permission level to \`${level}\`, are you sure?`)
    .then(async msg => {
      // message.delete({ timeout: 15000 })
      await msg.react('✔')
      await msg.react('❌')
      const filter = (reaction, user) => {
        return (reaction.emoji.name === '✔' || reaction.emoji.name === '❌') && user.id === author.id
      }

      const collector = msg.createReactionCollector(filter, { time: 15000 })

      collector.on('collect', async (reaction, reactionCollector) => {
        msg.delete({ timeout: 3000 })
        if (reaction.emoji.name === '✔') {
          await Guild.permissionUser(guild.id, userId, permissionLevel)
          channel.send(`<@!${id}> new permission level: \`${level}\``)
        } else {
          channel.send('`Aborted`')
            .then(msg => msg.delete({ timeout: 4000 }))
        }
      })
    })
    .catch(err => console.log(err))
}
