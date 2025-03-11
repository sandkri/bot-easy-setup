import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('channelspam')
    .setDescription('Creates and deletes a channel X times instantly.')
    .addIntegerOption(option =>
      option.setName('count')
        .setDescription('Number of times to create and delete the channel')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels), // Only users with Manage Channels can run it

  async execute(interaction) {
    const count = interaction.options.getInteger('count');
    const guild = interaction.guild;

    // Check if count is reasonable
    if (count < 1 || count > 20) {
      return interaction.reply({ content: '⚠️ Please choose a number between 1 and 20 to avoid spam limits.', ephemeral: true });
    }

    await interaction.reply({ content: `⚡ Spamming a channel **${count}** times!`, ephemeral: true });

    for (let i = 0; i < count; i++) {
      try {
        // Create a temporary channel
        const channel = await guild.channels.create({
          name: `prank-${i + 1}`,
          type: 0, // 0 = Text Channel
        });

        console.log(`[SPAM] Created channel: ${channel.name}`);

        // Wait briefly then delete
        setTimeout(async () => {
          await channel.delete();
          console.log(`[SPAM] Deleted channel: ${channel.name}`);
        }, 1000); // Adjust delay if needed
      } catch (error) {
        console.error(`❌ Error at iteration ${i + 1}:`, error);
        break; // Stop if an error occurs
      }
    }
  },
};
