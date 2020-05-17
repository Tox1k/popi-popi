const mongoose = require('mongoose')

const { Schema } = mongoose
const { ObjectId } = mongoose.Schema.Types


const VerifyChannelSchema = new Schema({
  Id: {
    type: String,
    required: true
  },
  messageId: {
    type: String,
    required: true
  },
  guild: {
    type: ObjectId,
    required: true,
    ref: 'Guild'
  },
  reactions: [{
    emoji: {
        type: String
    },
    roleId: [{
        type:String
    }]
  }]
})

VerifyChannelSchema.statics.findChannel = async function (Id) {
    const channel = await VerifyChannel.findOne({
      Id
    })
    return channel
}

VerifyChannelSchema.statics.updateChannel = async function (Id, messageId, reactions) {
  const channel = await VerifyChannel.findOneAndUpdate(Id, {messageId, reactions})
  return channel
}

VerifyChannelSchema.statics.createChannel = async function (Id, messageId, reactions, guild) {
  const channel = await VerifyChannel.create({
    Id,
    messageId,
    guild,
    reactions
  })
  return channel
}
    
const VerifyChannel = mongoose.model('VerifyChannel', VerifyChannelSchema)

module.exports = {
    VerifyChannel
}