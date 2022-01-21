

async function Execute(Bot, Interaction, Args) {
    Interaction.reply({ content: 'Pong!', fetchReply: true, ephemeral: true })
        .then((message) => console.log(`Reply sent with content ${message.content}`))
        .catch(console.error);
}

module.exports = {
    Execute,
    name: 'Help',
    aliases: ['?', 'H']
}
