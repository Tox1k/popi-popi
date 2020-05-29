const client = require('./lib/client')

client.on('ready', () => {
  console.log('the client becomes ready to start')
  console.log(`I am ready! Logged in as ${client.user.tag}!`)
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)

  client.user.setActivity('popi-dev')
  client.user.setStatus('Online')

  client.generateInvite(['ADMINISTRATOR'])
    .then(link => {
      console.log(`Generated bot invite link: ${link}`)
      inviteLink = link
    })
})

client.on('reconnecting', () => {
  console.log('client tries to reconnect to the WebSocket')
})

client.on('resume', (replayed) => {
  console.log(`whenever a WebSocket resumes, ${replayed} replays`)
})

client.on('error', (error) => {
  console.error(`[ERROR] - ${error}`)
})

client.on('disconnect', (event) => {
  console.log('The WebSocket has closed and will no longer attempt to reconnect')
})

client.on('warn', (info) => {
  console.log(`[WARN] - ${info}`)
})

client.on('info', (info) => {
  console.log(`[INFO] - ${info}`)
})

client.on('invalidated', (info) => {
  console.log(`[SESSION INVALIDATED] - ${info}`)
})
client.on('ratelimit', (info) => {
  console.log(`[REACHED RATE LIMIT] - ${info}`)
})
