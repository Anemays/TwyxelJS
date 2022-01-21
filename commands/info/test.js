const { MessageActionRow, MessageButton } = require('discord.js');

async function Execute(Bot, Message) {
    const Row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel('Pencet')
                .setStyle('PRIMARY')
                .setCustomId('Rules 1 RAW')
        );
    
    Message.channel.send({ content: 'Tes', components: [Row] })
}

module.exports = {
    Execute,
    name: 'Test',
    aliases: ['T']
}
