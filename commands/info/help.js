

async function Execute(Bot, Message) {
    Message.channel.send('WIP')
}

module.exports = {
    Execute,
    name: 'Help',
    aliases: ['?', 'H']
}
