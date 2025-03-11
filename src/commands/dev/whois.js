import { PermissionsBitField, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('whois')
    .setDescription('Get information about a user')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('Select a user')
        .setRequired(false)
    ).setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels)
    ,
  async execute(interaction) {
    const user = interaction.options.getUser('target') || interaction.user;
    const member = await interaction.guild.members.fetch(user.id);

    await interaction.reply({
      embeds: [{
        color: 0x0099ff,
        title: `User Info: ${user.tag}`,
        thumbnail: { url: user.displayAvatarURL({ dynamic: true }) },
        fields: [
          { name: 'Username', value: user.username, inline: true },
          { name: 'ID', value: user.id, inline: true },
          { name: 'Created At', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: false },
          { name: 'Joined Server', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`, inline: false },
          { name: 'Roles', value: member.roles.cache.map(role => role.toString()).join(', ') || 'None', inline: false }
        ],
        footer: { text: `Requested by ${interaction.user.tag}` }
      }]
    });
  },
};
