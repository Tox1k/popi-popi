const client = require('./lib/client')
const { Guild } = require('./models/guild')

for await (const guild of Guild.find()) {
    initServer(guild)
}

const initServer = (guild) => {
    client.guilds
    for(const item of roleHandler){
        const {channelId, messageId, reactions} = item

    }
}

    // for server in guilds:
    //     for item in roleHandler:
    //         channelId, messageId, reactions[] = item
    //         currServer = getServer(server.id)
    //         currChannel = currServer.getChannel(channelId)
    //         currMessage = currChannel.getMessage(channelId)
            
    //         for reaction in reactions:
    //             emoji = reaction
    //             roles[] = reaction
    //             const collector = currMessage.createReactionCollector(filter(return reaction.emoji === emoji), {time: 0})
    //             collector.on('collect', (reaction) => {
    //                 for roleId in roles:
    //                     role = currServer.getRoleById(role)
    //                     reaction.user.addRole(role)
    //             })
