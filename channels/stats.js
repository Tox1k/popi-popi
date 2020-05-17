const client = require('../lib/client')
const utils = require('../utils')

let factions = [
  '577349472976371712', // Verificato
  '525733764215603221' // Straniero
]

let hierarchy = [
  // name: '⭐ Ammiraglio'
  '526896641739849759',

  // name: '👾 Generale'
  '525730942397055016',

  // name: '🌌 Comandante'
  '525732498454478848',

  // name: '💎 Prestigio'
  '628780910384381973',

  // name: '🛸 Tenente'
  '525757970047565825',

  // name: '🦑 Avanguardia'
  '616678091497930866',

  // name: '👽 Recluta'
  '525733764215603221'
]
let games = [
  // 'League of Legends':
  '616654557468164106',

  // 'Counter Strike: Global Offensive':
  '616656930479538199',

  // 'Brawlhalla':
  '616656932853252116',

  // 'Minecraft':
  '616657094145343695',

  // 'osu!':
  '616657618513035345',

  // 'Overwatch':
  '616656927161843753',

  // 'Teamfight Tactics':
  '616660784482877443',

  // 'Hearthstone':
  '616665895795687438',

  // 'Fortnite':
  '616657098071343114',

  // 'Black Desert Online':
  '617297237252505603',

  // 'Rainbow Six Siege':
  '629666044205596682',

  // 'Stardew Valley':
  '629862221081608193',

  // 'Grand Theft Auto V':
  '629752139081711639',

  // 'Dead by Daylight':
  '629667567912615968',
]

const objectLength = obj => {
  let count = 0
  obj.forEach(() => count++)
  return count
}

const membersForRole = async roleId => {
  const guild = await utils.getGuild()
  const channel = await utils.getChannelById('631121499335426058') // #stats
  const role = await utils.getRoleById(roleId)

  const members = await guild.members.filter(member => member.roles.find(role => role.id === roleId))

  channel.send(`${role.name} : **${objectLength(members)}**`)
}

const membersForRoleArray = async roleArray => {
  await roleArray.forEach(async role => membersForRole(role))
}

client.on('stats', async role => {
  const re = /[<][@][&][\d*]{18}[>]/

  if (re.test(role)) {
    role = role.replace(/[<@&>]/g, '')
    await membersForRole(role)
    return
  }

  if (role === 'giochi') {
    await membersForRoleArray(games)
    return
  }

  if (role === 'fazioni') {
    await membersForRoleArray(factions)
    return
  }

  if (role === 'gerarchia') {
    await membersForRoleArray(hierarchy)
    return
  }

  if (role === 'tutto') {
    await membersForRoleArray(games)
    await membersForRoleArray(factions)
    await membersForRoleArray(hierarchy)
  }
})
