import { PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import { writeJSON, readJSON } from '../../utility/helpers/file.js';
import { CommandBuilder, PERMISSIONS } from '../../utility/commandBuilder.js';

export default {
  data: new CommandBuilder()
    .setName('set')
    .setDescription('set group')
    .addSubcommand(command => 
      command
        .setName('welcome')
        .setDescription('Set the welcome channel')
        .addChannelOption(option => option.setName('channel').setDescription('The channel to set as the welcome channel').setRequired(true))
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels),
    
    
  async execute(interaction) {
    const data = readJSON('servers.json');
    console.log(data);
    const subcommand = interaction.options.getSubcommand();
    if (subcommand === 'welcome') {
      try {
          // Get variables
      const channel = interaction.options.getChannel('channel');
      const guildId = interaction.guild.id;
                         
      // Set the welcome channel
      data[guildId] = { set: { welcome: { channel: channel.id } } };
      writeJSON('servers.json', data);

      await interaction.reply(`Welcome channel set to ${channel}`);
      return;
      } catch (error) {
        console.error(error);
        await interaction.reply('There was an error while executing this command.');
      }
    }

    await interaction.reply('test');
  },
};
