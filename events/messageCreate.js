
async function Execute(Bot, Message) {
    const { content, author, channel, guild } = Message;

    if (Message.author.bot) return;

    console.log(`${guild.name}#${channel.name} ${author.tag}: ${content}`);

    const Prefix = '>';
    const Args = content.trimLeft().split(' ');
    if (Args[0].startsWith(Prefix)) {
        Args[0] = Args[0].slice(Prefix.length);
        // console.log(Args[0])
        const Command = Bot.Lib.Handler.GetCommand(Bot.Cache.Path, Args[0]);
        // console.log(Command)
        if (Command !== null) return Command.Execute(Bot, Message);
    }
}

module.exports = Execute;
