const mongoose = require('mongoose')

const { Schema } = mongoose
const { ObjectId } = mongoose.Schema.Types


const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  exp: {
    type: Number,
    required: true,
    default: 0
  },
  pictureUrl: {
    type: String
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  },
  name: {
    type: String,
  },
  money: {
    type: Number,
    required: true,
    default: 0
  },
  inventory: [
      {
          name:{
              type: String,
              required: true
          },
          rarity:{
              type: String,
              enum: ["common", "rare", "epic", "legendary"],
              default: "common",
              required: true
          }
      }
  ]
})

UserSchema.statics.findUser = async function (id) {
  const user = await User.findOne({id})
  return user
}

const User = mongoose.model('User', UserSchema)

module.exports = {
    User
}