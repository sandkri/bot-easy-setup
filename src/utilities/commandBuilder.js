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
    return CommandBuilder.#checkAccess(interaction, this._permissions);
  }

  static #checkAccess(interaction, { roles, users, discordPerms }) {
    if (users.includes(interaction.user.id)) return true;
    if (discordPerms.some(p => !interaction.member.permissions.has(p))) return false;
    if (roles.some(r => interaction.member.roles.cache.has(r))) return true;
    return false;
  }
}

const PERMISSIONS = {
  ADMIN: [PermissionFlagsBits.Administrator],
  MOD: [PermissionFlagsBits.ManageMessages, PermissionFlagsBits.BanMembers],
  EVERYONE: [],
};

export { CommandBuilder, PERMISSIONS };