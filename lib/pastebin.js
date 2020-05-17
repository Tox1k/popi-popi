const PastebinApi = require('pastebin-js')
const key = process.env.Pastebin

const pastebin = new PastebinApi(key)

module.exports = pastebin
