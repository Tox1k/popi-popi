const client = require('../lib/client')
const pastebin = require('../lib/pastebin')

client.on('message', async message => {
  if (message.author === client.user) return
  if (message.system) return
  if (message.guild === null) return

  const { content, channel } = message
  if (content.startsWith('?popi paste')) {
    const args = content.slice('?popi paste'.length, message.content.length).trim().replace(/\s{2,}/g, ' ').split(' ')
    if (args.length !== 2) {
      wrongUsage(channel)
      return
    }

    const [type, pastebinId] = args
    if (type.toLocaleLowerCase() === 'embed') {
    //   console.log('embed')
      sendEmbed(channel, pastebinId)
      return
    }
    if (type.toLocaleLowerCase() === 'message') {
    //   console.log('message')
      sendMessage(channel, pastebinId)
      return
    }

    // wrongUsage(channel)

    // const result = re.exec(content)
    // if (result === null) {
    //   message.reply('Wrong usage!\n?popi permission user `user_id` `permission_level` ')
    //   return
    // }
    console.log(args)
  }
})

const sendEmbed = async (channel, pastebinId) => {
  await pastebin.getPaste(pastebinId)
    .then(data => {
      try {
        data = JSON.parse(data)
      } catch (error) {
        client.emit('error', `unable to parse embed with pastebin ID -> ${pastebinId}`)
        channel.send('invalid embed format!')
        return
      }
      channel.send({ embed: data })
    })
    .fail(msg => {
      channel.send('embed not found, check providen ID or document permissions!')
      client.emit('error', msg)
    })
}

const sendMessage = async (channel, pastebinId) => {
  await pastebin.getPaste(pastebinId)
    .then(data => channel.send(data))
    .fail(msg => {
      channel.send('message not found, check providen ID or document permissions!')
      client.emit('error', msg)
    })
}

const wrongUsage = (channel) => {
  channel.send('Wrong usage!\n?popi paste `embed | message` `pastebinId` ')
}
