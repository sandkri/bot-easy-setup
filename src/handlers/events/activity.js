import { ActivityType } from 'discord.js';

export default (client) => {
    client.once('ready', () => {
        client.user.setActivity(`${client.guilds.cache.size} servers`, { type: ActivityType.Watching });
    })
};
