export default (client) => {
    client.once('ready', () => { 
        const cache = client.guilds.cache;
        cache.forEach(guild => {
            console.log(guild)
        });
    });
};
