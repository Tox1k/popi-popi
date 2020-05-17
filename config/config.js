const fs = require('fs')
const path = require('path')

const json = fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8')
const config = JSON.parse(json)

for (let key in config) process.env[key] = config[key]
