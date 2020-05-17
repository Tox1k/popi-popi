const client = require('./lib/client')

client.on('error', (err) => {
    console.log(err)
})