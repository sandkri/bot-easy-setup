import { Colors } from "discord.js";
import { CommandBuilder } from "../../utility/commandBuilder.js";
import { reaxionEmbed } from "../../utility/helpers/embed.js";


export default {
  data: new CommandBuilder()
    .setName('ping')
    .setUsers(['1017158530928750642'])
    .setDescription('ping pong'),

  async execute(interaction) {
    if (!this.data.hasAccess(interaction)) {
      const embed = reaxionEmbed()
        .setTitle('Reaxion | Warning')
        .setDescription('You do not have permission to use this command.')
        .setColor(Colors.Yellow)
      return await interaction.reply({embeds: [embed] });
    }

    await interaction.reply('pong');
  },
};
