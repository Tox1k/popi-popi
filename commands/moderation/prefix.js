const { Guild } = require('../../models/guild')

module.exports = {
  name: 'prefix',
  aliases: [],
  category: 'moderation',
  defaultPermission: 4,
  description: 'change prefix for the server',
  usage: '`newPrefix`',
  run: async (client, message, args) => {
    if (args.length !== 1 || !Array.isArray(args)) {
      return message.channel.send('invalid arguments!')
    }

    const oldPrefix = message.guild.prefix
    const newPrefix = args[0]

    return message.channel.send(`change prefix from \`${oldPrefix}\` to \`${newPrefix}\`?`)
      .then(async msg => {
      // message.delete({ timeout: 15000 })
        await msg.react('✔')
        await msg.react('❌')
        const filter = (reaction, user) => {
          return (reaction.emoji.name === '✔' || reaction.emoji.name === '❌') && user.id === message.author.id
        }

        const collector = msg.createReactionCollector(filter, { time: 15000 })

        collector.on('collect', async (reaction, reactionCollector) => {
          msg.delete({ timeout: 3000 })
          if (reaction.emoji.name === '✔') {
            await Guild.changePrefix(message.guild.id, newPrefix)
            message.guild.prefix = newPrefix
            message.channel.send(`Prefix changed!\n\`${oldPrefix}\` => \`${newPrefix}\``)
          } else {
            message.channel.send('`Aborted`')
              .then(msg => msg.delete({ timeout: 4000 }))
          }
        })
      })
      .catch(err => console.log(err))
  }
}
