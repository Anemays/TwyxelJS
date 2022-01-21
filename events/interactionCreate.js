
async function Execute(Bot, Interaction) {
    if (!Interaction.isButton()) return;
    // console.log(Interaction);
    const { customId, message } = Interaction;
    const { author, channel, guild } = message;

    const Args = customId.split(' ');
    console.log(`[INT]${guild.name}#${channel.name} ${author.tag}: ${customId}`);
    const Command = Bot.Lib.Handler.GetInteraction(Bot.Cache.Path, Args[0]);
    // console.log(Command)
    if (Command !== null) return Command.Execute(Bot, Interaction, Args);
}

module.exports = Execute;
