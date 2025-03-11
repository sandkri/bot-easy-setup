import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

class CommandBuilder extends SlashCommandBuilder {
  constructor() {
    super();
    this._permissions = this.#initializePermissions();
  }

  #initializePermissions() {
    return { roles: [], users: [], discordPerms: [] };
  }

  setRoles(roles = []) {
    this._permissions.roles = roles;
    return this;
  }

  setUsers(users = []) {
    this._permissions.users = users;
    return this;
  }

  setDiscordPermissions(permissions = []) {
    this._permissions.discordPerms = permissions;
    return this;
  }

  hasAccess(interaction) {
    return this.#checkAccess(interaction);
  }

  #checkAccess(interaction) {
    const { roles, users, discordPerms } = this._permissions;

    // If the command has specific users allowed, only they should be able to use it.
    if (users.length > 0 && !users.includes(interaction.user.id)) return false;

    // If there are required Discord permissions, check them.
    if (discordPerms.length > 0 && !interaction.member.permissions.has(discordPerms)) return false;

    // If roles are required, check if the user has at least one of them.
    if (roles.length > 0 && interaction.member.roles.cache.some(role => roles.includes(role.id))) return true;

    // Allow if no restrictions are set (default behavior)
    return users.length === 0 && roles.length === 0 && discordPerms.length === 0;
}

}

const PERMISSIONS = {
  ADMIN: [PermissionFlagsBits.Administrator],
  MOD: [PermissionFlagsBits.ManageMessages, PermissionFlagsBits.BanMembers],
  EVERYONE: [],
};

export { CommandBuilder, PERMISSIONS };