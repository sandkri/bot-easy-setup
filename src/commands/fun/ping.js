import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('ping pong'),
  async execute(interaction) {
    await interaction.reply('pong');
  },
};
