const pastebin = require('../../lib/pastebin')

module.exports = {
  name: 'pastebin',
  aliases: ['paste', 'pb'],
  category: 'moderation',
  defaultPermission: 3,
  description: 'Send and embed or a message from pastebin',
  usage: '`embed | message` `pastebinId`',
  run: async (client, message, args) => {
    if (args.length !== 2 || !Array.isArray(args)) {
      return message.channel.send('invalid arguments!')
    }

    const [type, pastebinId] = args

    switch (type.toLowerCase()) {
      case 'embed':
        return await pastebin.getPaste(pastebinId)
          .then(data => {
            try {
              data = JSON.parse(data)
            } catch (error) {
              client.emit('error', `unable to parse embed with pastebin ID -> ${pastebinId}`)
              return message.channel.send('invalid embed format!')
            }
            return message.channel.send({ embed: data })
          })
          .fail(msg => {
            client.emit('error', msg)
            return message.channel.send('embed not found, check providen ID or document permissions!')
          })

      case 'message':
        return await pastebin.getPaste(pastebinId)
          .then(data => message.channel.send(data))
          .fail(msg => {
            client.emit('error', msg)
            return message.channel.send('message not found, check providen ID or document permissions!')
          })
    }
    return message.channel.send('invalid type')
  }
}
