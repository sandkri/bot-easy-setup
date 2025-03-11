import { PermissionFlagsBits } from 'discord.js';

const PERMISSION_LEVELS = {
  ADMIN: [PermissionFlagsBits.Administrator],
  MOD: [PermissionFlagsBits.ManageMessages, PermissionFlagsBits.BanMembers],
  EVERYONE: [],
};

/**
 * Checks if a user has the required permissions.
 * @param {Interaction} interaction - The interaction object
 * @param {Object} requiredPermissions - Object containing roles, users, and discordPerms
 * @returns {boolean} - True if the user is authorized, false otherwise
 */
export function hasPermission(interaction, requiredPermissions) {
  const { roles, users, discordPerms } = requiredPermissions;

  // Check Discord permissions
  if (discordPerms.length > 0) {
    const hasDiscordPermission = discordPerms.every(perm => interaction.member.permissions.has(perm));
    if (!hasDiscordPermission) return false;
  }

  // Check if user has a required role
  if (roles.length > 0) {
    const hasRole = roles.some(roleId => interaction.member.roles.cache.has(roleId));
    if (!hasRole) return false;
  }

  // Check if user is specifically allowed
  if (users.length > 0) {
    if (!users.includes(interaction.user.id)) return false;
  }

  return true; // Passed all checks
}

export { PERMISSION_LEVELS };
