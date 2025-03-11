export default (client) => {
    client.on('guildMemberAdd', async (member) => {
      console.log(member)
    });
  };
  