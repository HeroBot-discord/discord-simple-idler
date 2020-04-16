import Discord from 'herobot-socket-handler'
import fetch from 'node-fetch'
const config = new Discord.DiscordConfig()

Object.assign(config, {
    token: process.env.TOKEN,
    reconnect: true,
    stateUpdateInterval: 5000,
    
})

const client = new Discord.DiscordSocket(config)

client.on('event', ({ type, data }) => {
    if(type === 'MESSAGE_CREATE') {
        if((data.content as string).startsWith('hb!') && data.guild_id && !data.author.bot) {
            fetch(`https://discordapp.com/api/v6/channels/${data.channel_id}/messages`, {
                method: 'POST',
                headers: {
                    Authorization: `Bot ${process.env.TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: `
                        Hey <@${data.author.id}>. __HeroBot is currently in a re-developing process__, we are making sure everything is of before delivering an awesome experiences. 
                        \r\n **We are looking for new developers**, if you are inerested in our work, please contact __\`Matthieu#2050\`__!
                        \r\n Thanks for using HeroBot!
                        \r\n \`Matthieu - Developer / Manager\`
                    `
                })

            })
        }
    }
})

client.on('log', console.log)

client.start()