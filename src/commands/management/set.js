import { SlashCommandBuilder } from 'discord.js';
import { writeJSON, readJSON } from '../../utility/helpers/file.js';

export default {
  data: new SlashCommandBuilder()
    .setName('set')
    .setDescription('set group')
    .addSubcommand(command => 
      command
        .setName('welcome')
        .setDescription('Set the welcome channel')
        .addChannelOption(option => option.setName('channel').setDescription('The channel to set as the welcome channel').setRequired(true))
    ),
    
  async execute(interaction) {
    const data = readJSON('servers.json');
    console.log(data);
    const subcommand = interaction.options.getSubcommand();
    if (subcommand === 'welcome') {
      const channel = interaction.options.getChannel('channel');
      const guildId = interaction.guild.id;

      data[guildId] = { set: { welcome: { channel: channel.id } } };
      writeJSON('servers.json', data);

      console.log(guildId);
      await interaction.reply(`Welcome channel set to ${channel}`);
      return;
    }

    await interaction.reply('test');
  },
};
