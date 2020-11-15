
module.exports = {
  name: 'emoji',
  aliases: ['emoji'],
  category: 'moderation',
  defaultPermission: 3,
  description: 'get emoji information',
  usage: '`emoji`',
  run: async (client, message, args) => {
    if (args.length !== 1 || !Array.isArray(args)) {
      return message.channel.send('invalid arguments!')
    }

    const [emoji_name] = args

    console.log(emoji_name)

    console.log(client.emojis.cache.get(emoji_name))
    console.log(message.content)

    return message.channel.send('test')
  }
}
