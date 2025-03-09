export default (client) => {
    client.on('messageCreate', async (message) => {
      if (message.mentions.has(client.user) && !message.author.bot) {
        await message.reply('Hi!');
      }
    });
  };
  