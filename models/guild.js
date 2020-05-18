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
    default: "?"
  },
  premium: {
    type: Boolean,
    required: true,
    default: false
  },
  users: [
    {
      id: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
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
      id: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
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
        required: true,
        unique: true,
        dropDups: true
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
  channels:[],
  roleHandler:[
    {
      channelId: {
        type: String,
        require: true
      },
      messageId: {
        type: String,
        require: true
      },
      reactions:[
        {
          emoji:{
            type: String,
            required: true
          },
          roles:[String]
        }
      ]
    }
  ],
  games:[String]
})

GuildSchema.statics.findGuild = async function (id) {
  
  const guild = await Guild.findOne({id})
  return guild
}

GuildSchema.statics.permissionUser = async function (guildId, id) {
  
  const guild = await Guild.findOne({
    id: guildId,
     users:{
       id
      }
  });
  return guild
}

GuildSchema.statics.updatePermissionUser = async function (guildId, user) {
  
  const guild = await Guild.updateOne({id: guildId}, {$addToSet: {users: user}});
  return guild
}

GuildSchema.statics.addPermissionUser = async function (guildId, user) {
  
  const guild = await Guild.updateOne({id: guildId}, {$addToSet: {users: user}})
  return guild
}

GuildSchema.statics.removePermissionUser = async function (guildId, id) {
  

  const guild = await Guild.updateOne({ id: guildId }, { $pull: { users: { id } }}, { safe: true})
  // const guild = await Guild.findOne({
  //   id
  // })
  return guild
}

GuildSchema.statics.updatePermissionRole = async function (id) {
  
  const guild = await Guild.findOne({
    id
  })
  return guild
}

GuildSchema.statics.removePermissionRole = async function (id) {
  
  const guild = await Guild.findOne({
    id
  })
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