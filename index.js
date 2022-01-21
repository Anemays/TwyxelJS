const { Client, Intents } = require('discord.js');
const { config } = require('dotenv');
const Path = require('path').join(__dirname)//.split('\\').join('/');

config({
    path: __dirname + '/.env'
});

class Bot {
    Client;
    Lib;
    Cache;

    async HandleEvent(Event, Parameters = null) {
        await this.Lib.Handler.OnEvent(this, Event, Parameters);
    }

    Login() {
        const { Token } = this.Cache;
        const client = new Client({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES
            ]
        });
        client.login(Token);
        client.on('ready', async () => await this.HandleEvent('ready'));

        client.on('messageCreate', async (Message) => await this.HandleEvent('messageCreate', Message));

        client.on('interactionCreate', async (Interaction) => await this.HandleEvent('interactionCreate', Interaction));

        this.Client = client;
        this.Lib = {
            Handler: require('./lib/handler'),
        }
    }

    constructor(Token) {
        this.Cache = {
            Token,
            Path,
        }
        this.Login();
    }
}

function Start() {
    const bot = new Bot(process.env.TOKEN);
}

Start();
