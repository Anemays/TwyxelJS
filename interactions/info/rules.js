const { MessageButton, MessageEmbed, MessageActionRow } = require("discord.js");

const Rules = [
    "One",
    "Two",
    "Three"
]

async function Execute(Bot, Interaction, Args) {
    const BTN_Previous = new MessageButton()
        .setLabel('Previous')
        .setStyle('PRIMARY');
    const BTN_Next = new MessageButton()
        .setLabel('Next')
        .setStyle('PRIMARY');
    const Embed = new MessageEmbed()
        .setColor('GREEN');
    

    const RuleNumber = Args.length > 1 ? parseInt(Args[1]) : 1;
    BTN_Previous.setCustomId(`Rules ${RuleNumber - 1}`);
    BTN_Next.setCustomId(`Rules ${RuleNumber + 1}`);
    switch (RuleNumber) {
        case 1:
            BTN_Previous.setDisabled(true);
        break;
        case Rules.length:
            BTN_Next.setDisabled(true);
            // BTN_Next.setCustomId(`Rules ${RuleNumber + 1} DEL`)
        break;
        default:
            if (RuleNumber < 1 || RuleNumber > Rules.length)
                return false;
        break;
    }
    Embed.setDescription(Rules[RuleNumber - 1])
        .setTitle(`Rule #${RuleNumber}`);

    const Row = new MessageActionRow()
        .addComponents(
            BTN_Previous,
            BTN_Next,
        );

    const IsRaw = Args.length > 2 ? Args[2] === 'RAW' : false;
    const IsDelete = Args.length > 2 ? Args[2] === 'DEL' : false;
    if (IsRaw) {
        Interaction.reply({ fetchReply: true, ephemeral: true, embeds: [Embed], components: [Row] });
    } else if (IsDelete) {
        Interaction.deleteReply();
    } else {
        Interaction.update({ fetchReply: true, ephemeral: true, embeds: [Embed], components: [Row] });
    }
}

module.exports = {
    Execute,
    name: 'Rules',
    aliases: ['Rule']
}
