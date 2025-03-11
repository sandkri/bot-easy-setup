import { readJSON } from "../../utility/helpers/file.js";
import { reaxionEmbed } from "../../utility/helpers/embed.js";
import { Colors } from "discord.js";



export default (client) => {
    client.on('guildMemberAdd', async (member) => {

      const read = readJSON('servers.json');
      const guildId = member.guild.id;

      if (!read[guildId]) return;

      const channelId = read[guildId].set.welcome.channel;
      const channel = client.channels.cache.get(channelId);
      console.log(channel)

      if (!channel) return;

      const embed = reaxionEmbed()
      .setDescription(`Welcome to the server, ${member}!`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setColor(Colors.Green)
      .setTimestamp();
  

      channel.send({ embeds: [embed] });



    });
  };
  