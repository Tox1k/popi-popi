const pastebin = require('../../lib/pastebin')
const utils = require('../../utils')

module.exports = {
  name: 'pastebinupdate',
  aliases: ['pasteu', 'pbu'],
  category: 'moderation',
  defaultPermission: 3,
  description: 'Update an embed or a message from pastebin',
  usage: '`channel id` `message id` `embed | message` `pastebinId`',
  run: async (client, message, args) => {
    if (args.length !== 4 || !Array.isArray(args)) {
      return message.channel.send('invalid arguments!')
    }

    const [channelId, messageId, type, pastebinId] = args

    messageToEdit = await utils.getMessageByIdAndChannelId(channelId, messageId)
    if(!messageToEdit){
        return message.channel.send('message not found!')
    }

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
            return messageToEdit.edit({ content: data.content , embed: data.embed })
          })
          .fail(msg => {
            client.emit('error', msg)
            return message.channel.send('embed not found, check providen ID or document permissions!')
          })

      case 'message':
        return await pastebin.getPaste(pastebinId)
          .then(data => messageToEdit.edit(data))
          .fail(msg => {
            client.emit('error', msg)
            return message.channel.send('message not found, check providen ID or document permissions!')
          })
    }
    return message.channel.send('invalid type')
  }
}
