const client = require('../lib/client')

client.on('message', async message => {
  const { content, guild, system, author } = message
  const { prefix } = guild

  if (author === client.user) return
  if (system) return
  if (guild === null) return
  if (!content.startsWith(prefix)) return

  client.emit('command', message)
})
