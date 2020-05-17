const mongoose = require('mongoose')

const { Schema } = mongoose
const { ObjectId } = mongoose.Schema.Types


const GuildSchema = new Schema({
  Id: {
    type: String,
    required: true
  },
  premium: {
    type: Boolean,
    required: true,
    default: false
  }
})

GuildSchema.statics.findGuild = async function (Id) {
  
  const guild = await Guild.findOne({
    Id
  })
  return guild
}

const Guild = mongoose.model('Guild', GuildSchema)

module.exports = {
    Guild
}