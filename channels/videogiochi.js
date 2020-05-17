const client = require('../lib/client')
const utils = require('../utils')
const pastebin = require('../lib/pastebin')

let games = [
  `League of Legends`,
  `Counter Strike: Global Offensive`,
  `Brawlhalla`,
  `Minecraft`,
  `Fortnite`,
  `osu!`,
  `Overwatch`,
  `Teamfight Tactics`,
  `Hearthstone`,
  `Black Desert Online`,
  `Rainbow Six Siege`,
  `Stardew Valley`,
  `Grand Theft Auto V`,
  `Dead by Daylight`
]

const baseUrl = 'https://cdn.discordapp.com/attachments/631109184175341590'

let icons = {
  'League of Legends': '/631109423879946241/league-of-legends.png',
  'Counter Strike: Global Offensive': '/631109635985899521/counter-strike.png',
  'Brawlhalla': '/631109802155835423/brawlhalla.png',
  'Minecraft': '/631109958808633394/minecraft-diamond.png',
  'osu!': '/631110038961782804/osu.png',
  'Overwatch': '/631110116560732160/overwatch.png',
  'Teamfight Tactics': '/631110354700730368/teamfighttactics.png',
  'Hearthstone': '/631110446169980933/hearthstone.png',
  'Fortnite': '/631110528999096320/fortnite.png',
  'Black Desert Online': '/631110626105884672/blackdesertonline.jpg',
  'Rainbow Six Siege': '/631110712055562243/r6.jpg',
  'Stardew Valley': '/631112345476923422/stardew.png',
  'Grand Theft Auto V': '/631112346483294247/gtav.png',
  'Dead by Daylight': '/631112340351221761/dbd.jpg'
}

let roles = {
  'League of Legends': '616654557468164106',
  'Counter Strike: Global Offensive': '616656930479538199',
  'Brawlhalla': '616656932853252116',
  'Minecraft': '616657094145343695',
  'osu!': '616657618513035345',
  'Overwatch': '616656927161843753',
  'Teamfight Tactics': '616660784482877443',
  'Hearthstone': '616665895795687438',
  'Fortnite': '616657098071343114',
  'Black Desert Online': '617297237252505603',
  'Rainbow Six Siege': '629666044205596682',
  'Stardew Valley': '629862221081608193',
  'Grand Theft Auto V': '629752139081711639',
  'Dead by Daylight': '629667567912615968'
}

client.on('ready', async () => {
  refresh()
})

client.on('refresh', async name => {
  if (name !== 'videogiochi') return
  refresh()
})

client.on('embed react ruoli', async (embed, reaction, user) => {
  let member = await utils.getMemberById(user.id)
  let content = embed.author.name
  if (!games.includes(content)) return
  switch (reaction.emoji.name) {
    case '✅':
      member.addRole(await utils.getRoleById('616688460635439138')) // --videogiochi--
      member.addRole(await utils.getRoleById(roles[content]))
      console.log(`[${member.displayName}] + ${content}\n`)
      break
    case '❌':
      member.removeRole(await utils.getRoleById(roles[content]))
      console.log(`[${member.displayName}] - ${content}\n`)
      break
    default:
      console.log('Uncaught reaction added in channel #ruoli-videogiochi')
  }
  reaction.remove(user)
})

let refresh = async () => {
  let channel = await utils.getChannelById('616664589962313731')
  await utils.clearMessages(channel)

  await pastebin.getPaste('jYMtZx7Y')
    .then(data => channel.send(data))
    .fail(msg => console.log(msg))

  games.forEach(game => {
    let embed = utils.createEmbed()
      .setColor('#0099ff')
      .setAuthor(game, baseUrl + icons[game])

    channel.send(embed)
      .then(async msg => {
        await msg.react('✅')
        await msg.react('❌')
        // console.log(embed)
      })
  })
}
