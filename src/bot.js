import { Client, GatewayIntentBits, Collection, REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { loadHandlers } from './handlers/handlerLoader.js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers],
});

client.commands = new Collection();
const commands = [];
const commandsPath = path.join(__dirname, 'commands');

for (const category of readdirSync(commandsPath)) {
  const categoryPath = path.join(commandsPath, category);

  for (const file of readdirSync(categoryPath).filter((f) => ['.js', '.ts'].some(ext => f.endsWith(ext)))) {
    const filePath = pathToFileURL(path.join(categoryPath, file)).href;
    
    const command = await import(filePath); 

    if (command.default?.data && command.default?.execute) {
      client.commands.set(command.default.data.name, command.default);
      commands.push(command.default.data.toJSON());
    }
  }
}
const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
  } catch (error) {
    console.error('Failed to register commands:', error);
  }
})();

client.on('ready', () => console.log(`${client.user.tag} is online.`));

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing command ${interaction.commandName}:`, error);
    await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
  }
});

await loadHandlers(client)
client.login(process.env.BOT_TOKEN);
