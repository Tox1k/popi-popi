const mongoose = require('mongoose')

const { Schema } = mongoose
const { ObjectId } = mongoose.Schema.Types


const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  uri: {
    type: String,
    required: true,
  },
  matchmaking: {
    type: Boolean,
    required: true,
    default: false
  }
})

GameSchema.statics.findGame = async function (name) {
  const game = await Game.findOne({name})
  return game
}

const Game = mongoose.model('Game', GameSchema)

module.exports = {
  Game
}