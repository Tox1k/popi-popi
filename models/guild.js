const mongoose = require('mongoose')

const { Schema } = mongoose
const { ObjectId } = mongoose.Schema.Types

const GuildSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  prefix: {
    type: String,
    required: true,
    default: '?'
  },
  premium: {
    type: Boolean,
    required: true,
    default: false
  },
  users: [
    {
      _id: false,
      userId: {
        type: String,
        required: true
      },
      permissionLevel: {
        type: Number,
        min: 1,
        max: 4,
        required: true,
        default: 1
      }
    }
  ],
  roles: [
    {
      _id: false,
      roleId: {
        type: String,
        required: true
      },
      permissionLevel: {
        type: Number,
        min: 1,
        max: 4,
        required: true,
        default: 1
      }
    }
  ],
  commands: [
    {
      name: {
        type: String,
        required: true
      },
      permissionRequired: {
        type: Number,
        min: 1,
        max: 4,
        required: true,
        default: 1
      }
    }
  ],
  channels: [],
  roleHandler: [
    {
      channelId: {
        type: String,
        require: true
      },
      messageId: {
        type: String,
        require: true
      },
      reactions: [
        {
          emoji: {
            type: String,
            required: true
          },
          roles: [String]
        }
      ]
    }
  ],
  games: [
    {
      name: { type: String },
      roleId: { type: String }
    }
  ]
})

GuildSchema.statics.findGuild = async (id) => {
  const guild = await Guild.findOne({ id })
  return guild
}

GuildSchema.statics.changePrefix = async (guildId, prefix) => {
  const guild = await Guild.findOne({ id: guildId })
  if (!guild) return
  guild.prefix = prefix
  return await guild.save()
}

GuildSchema.statics.permissionUser = async (id, userId, permissionLevel) => {
  const guild = await Guild.findOne({ id })
  if (!guild) return
  const index = guild.users.findIndex(user => user.userId === userId)
  if (index === -1) {
    guild.users.push({ userId, permissionLevel })
  } else {
    guild.users[index].permissionLevel = permissionLevel
  }
  await guild.save()

  return guild
}

GuildSchema.statics.updatePermissionUser = async function (guildId, user) {
  const guild = await Guild.updateOne({ guildId }, { $addToSet: { users: user } })
  return guild
}

GuildSchema.statics.addPermissionUser = async function (guildId, user) {
  const guild = await Guild.updateOne({ guildId }, { $addToSet: { users: user } })
  return guild
}

GuildSchema.statics.removePermissionUser = async function (guildId, id) {
  const guild = await Guild.updateOne({ guildId }, { $pull: { users: { id } } }, { safe: true })
  // const guild = await Guild.findOne({
  //   id
  // })
  return guild
}

GuildSchema.statics.permissionRole = async (id, roleId, permissionLevel) => {
  const guild = await Guild.findOne({ id })
  if (!guild) return
  const index = guild.roles.findIndex(role => role.roleId === roleId)
  if (index === -1) {
    guild.roles.push({ roleId, permissionLevel })
  } else {
    guild.roles[index].permissionLevel = permissionLevel
  }
  await guild.save()

  return guild
}

GuildSchema.statics.updatePermissionRole = async function (guildId, role) {
  const guild = await Guild.updateOne({ guildId }, { $addToSet: { roles: role } })
  return guild
}

GuildSchema.statics.addPermissionRole = async function (guildId, role) {
  const guild = await Guild.updateOne({ guildId }, { $addToSet: { roles: role } })
  return guild
}

GuildSchema.statics.removePermissionRole = async function (guildId, id) {
  const guild = await Guild.updateOne({ guildId }, { $pull: { roles: { id } } }, { safe: true })
  // const guild = await Guild.findOne({
  //   id
  // })
  return guild
}

GuildSchema.statics.updatePrefix = async function (id) {
  const guild = await Guild.findOne({
    id
  })
  return guild
}

GuildSchema.statics.updatePermissionCommand = async function (id) {
  const guild = await Guild.findOne({
    id
  })
  return guild
}

GuildSchema.statics.addGame = async function (id) {
  const guild = await Guild.findOne({
    id
  })
  return guild
}

GuildSchema.statics.removeGame = async function (id) {
  const guild = await Guild.findOne({
    id
  })
  return guild
}

GuildSchema.statics.addRoleHandler = async function (id) {
  const guild = await Guild.findOne({
    id
  })
  return guild
}

GuildSchema.statics.removeRoleHandler = async function (id) {
  const guild = await Guild.findOne({
    id
  })
  return guild
}

const Guild = mongoose.model('Guild', GuildSchema)

module.exports = {
  Guild
}
