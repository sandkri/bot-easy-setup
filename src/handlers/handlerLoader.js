import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadHandlers = async (client, handlersDir = '../handlers') => {
  const handlersPath = path.join(__dirname, handlersDir);

  for (const folder of readdirSync(handlersPath)) {
    const folderPath = path.join(handlersPath, folder);

    if (!folderPath.endsWith('.js')) { // Ensure it's a folder, not a file
      for (const file of readdirSync(folderPath).filter((f) => f.endsWith('.js'))) {
        const filePath = pathToFileURL(path.join(folderPath, file)).href;
        const handler = await import(filePath);
        if (handler.default) {
          handler.default(client);
        }
      }
    }
  }
};
