const mongoose = require('mongoose')

const { Schema } = mongoose
const { ObjectId } = mongoose.Schema.Types


const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  uri: {
    type: String,
    required: true
  }
})

RoleSchema.statics.findRole = async function (name) {
  const asset = await Draw.findOne({name})
  return asset
}

const Role = mongoose.model('Role', RoleSchema)

module.exports = {
  Role
}