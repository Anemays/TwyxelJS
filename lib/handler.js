const { readdirSync, existsSync } = require('fs');

function GetCommandList() {

}

function GetCommand(Path, Text) {
    const P_Commands = `${Path}/commands`;
    let Result = null;

    readdirSync(P_Commands).forEach(Category => {
        const P_Category = `${P_Commands}/${Category}`;
        readdirSync(P_Category).forEach(File => {
            const [FileName, Extension] = File.split('.');
            const Command = require(`${P_Category}/${FileName}`);

            const NameLowerEquals = Command.name.toLowerCase() === Text.toLowerCase();
            const AliasesLowerEquals = Command.aliases.find(Alias => Alias.toLowerCase() === Text.toLowerCase());
            if (NameLowerEquals || AliasesLowerEquals) {
                Result = Command;
                return;
            }
        })
    })
    return Result;
}

function GetInteraction(Path, Text) {
    const P_Commands = `${Path}/interactions`;
    let Result = null;

    readdirSync(P_Commands).forEach(Category => {
        const P_Category = `${P_Commands}/${Category}`;
        readdirSync(P_Category).forEach(File => {
            const [FileName, Extension] = File.split('.');
            const Interaction = require(`${P_Category}/${FileName}`);

            const NameLowerEquals = Interaction.name.toLowerCase() === Text.toLowerCase();
            const AliasesLowerEquals = Interaction.aliases.find(Alias => Alias.toLowerCase() === Text.toLowerCase());
            if (NameLowerEquals || AliasesLowerEquals) {
                Result = Interaction;
                return;
            }
        })
    })
    return Result;
}

async function OnEvent(Bot, Event, Parameters) {
    // console.log(Event)
    const FilePath = `${Bot.Cache.Path}/events/${Event}`;
    if (existsSync(FilePath + '.js')) {
        const EventModule = require(FilePath);
        await EventModule(Bot, Parameters);
    } else {
        console.log(`Error.OnEvent: Could not find file ${FilePath}`);
    }
}

module.exports = {
    GetCommandList,
    GetCommand,
    GetInteraction,
    OnEvent,
}
