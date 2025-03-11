import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.resolve(__dirname, '../../data'); // Adjusted to point correctly to 'src/data'

const ensureFileExists = (filePath, defaultData = {}) => {
  const fullFilePath = path.resolve(baseDir, filePath); // Ensure absolute path
  console.log('Ensuring file exists at:', fullFilePath);

  const dir = path.dirname(fullFilePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(fullFilePath)) fs.writeFileSync(fullFilePath, JSON.stringify(defaultData, null, 2));
};

const getFullFilePath = (filePath) => {
  if (path.isAbsolute(filePath)) {
    return filePath; // Avoid double path concatenation if already absolute
  }
  return path.resolve(baseDir, filePath);
};

const readJSON = (filePath) => {
  const fullFilePath = getFullFilePath(filePath);
  ensureFileExists(fullFilePath, {});
  return JSON.parse(fs.readFileSync(fullFilePath, 'utf8'));
};

const writeJSON = (filePath, data) => {
  const fullFilePath = getFullFilePath(filePath);
  ensureFileExists(fullFilePath);
  fs.writeFileSync(fullFilePath, JSON.stringify(data, null, 2));
};

const getUserData = (filePath, userId, defaultTemplate) => {
  const data = readJSON(filePath);
  if (!data.users) data.users = {};
  if (!data.users[userId]) {
    data.users[userId] = { ...defaultTemplate };
    writeJSON(filePath, data);
  }
  return data.users[userId];
};

const updateUserData = (filePath, userId, updateCallback) => {
  const data = readJSON(filePath);
  if (!data.users) data.users = {};
  if (!data.users[userId]) return false;
  updateCallback(data.users[userId]);
  writeJSON(filePath, data);
  return true;
};

export { readJSON, writeJSON, getUserData, updateUserData };
